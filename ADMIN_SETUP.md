# Admin Authentication & Authorization System

## Overview

This document outlines the secure admin authentication and authorization system implemented in SmartDot.

## Features

✅ **Invitation-Based Admin Registration** - Only users with valid signup tokens can create admin accounts
✅ **Role-Based Access Control (RBAC)** - Admins have dedicated role in database
✅ **Protected Admin Routes** - All admin endpoints require authentication & ADMIN role
✅ **Admin Middleware** - Reusable middleware for securing admin API routes
✅ **Session Integration** - Uses NextAuth for session management
✅ **Token Validation** - Secure token verification for admin signup

---

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local`:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin Signup Tokens (comma-separated for multiple valid tokens)
ADMIN_SIGNUP_TOKENS=your-secure-token-1,your-secure-token-2
```

**Generating a secure token:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Database Schema

The User model already has the `role` field:

```prisma
model User {
  id            String    @id @default(cuid()) @map("_id")
  email         String?   @unique
  role          String?   @default("USER")  // ✅ Already present
  // ... other fields
}
```

Valid roles:
- `"USER"` - Regular customer (default)
- `"ADMIN"` - Admin user with full access

---

## Usage

### Creating Admin Accounts

#### Step 1: Generate Admin Signup Token

Generate a secure token and add it to your `.env.local`:

```bash
ADMIN_SIGNUP_TOKENS=abc123def456xyz789...
```

#### Step 2: Share Signup Link

Send the admin signup link to the person:

```
https://localhost:3000/admin/signup?token=abc123def456xyz789
```

#### Step 3: Admin Signup

They visit the link and:
1. The token is validated
2. They enter their email address
3. Account is created as ADMIN role
4. They're redirected to admin panel
5. They can log in with Google OAuth using their registered email

---

## API Endpoints

### Admin Signup Endpoint

**POST** `/api/admin/auth/signup`

Creates a new admin user (requires valid token).

#### Request
```json
{
  "email": "admin@example.com",
  "token": "your-signup-token"
}
```

#### Response (201)
```json
{
  "success": true,
  "message": "Admin account created successfully",
  "user": {
    "id": "user-id",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

#### Error Responses
- `400` - Invalid request/validation failed
- `401` - Invalid or expired token
- `409` - Email already registered
- `500` - Server error

### Token Validation Endpoint

**GET** `/api/admin/auth/signup?token=xyz`

Validates if a token is valid for signup.

#### Response (200)
```json
{
  "valid": true
}
```

---

## Protected Routes

### Admin Dashboard Layout

**Location:** `/app/admin/layout.tsx`

The layout automatically:
- Checks user authentication
- Verifies ADMIN role
- Redirects unauthorized users to home page

```tsx
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminLayout({ children }) {
  // This will redirect if not authenticated or not an admin
  const { session } = await getAdminSession();
  
  return <div>{children}</div>;
}
```

### Admin API Routes

All admin API routes have middleware protection:

```tsx
import { withAdminAuth } from "@/lib/admin-middleware";

export async function GET(request: NextRequest) {
  // Verify admin access first
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response;

  // Your route logic here
  const user = auth.user; // Access authenticated admin user
}
```

---

## Protected Admin Endpoints

These endpoints require admin authentication:

- `GET/POST` `/api/admin/products` - Manage products
- `GET/PUT/DELETE` `/api/admin/products/[id]` - Product CRUD
- `GET/POST` `/api/admin/categories` - Manage categories

---

## Security Best Practices

### 1. Token Management

⚠️ **In Production:**
- Don't expose tokens in frontend code
- Store tokens securely in environment variables
- Rotate tokens regularly
- Use database for token management with expiration

```typescript
// Better approach for production:
export async function validateAdminSignupToken(token: string) {
  const tokenRecord = await prisma.adminToken.findUnique({
    where: { token },
  });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return false;
  }

  return true;
}
```

### 2. Email Verification

Consider adding email verification:

```typescript
// Send verification email before creating admin
await sendVerificationEmail(email, token);

// Only create user after email verification
```

### 3. Admin Promotion

Only promote existing users to admin:

```typescript
// Instead of creating new user, promote existing user
const user = await prisma.user.update({
  where: { email },
  data: { role: "ADMIN" },
});
```

### 4. Audit Logging

Log admin actions for security:

```typescript
// Add to admin routes
await prisma.auditLog.create({
  data: {
    action: "CREATE_PRODUCT",
    adminId: auth.user.id,
    details: { productId: newProduct.id },
    timestamp: new Date(),
  },
});
```

### 5. Rate Limiting

Add rate limiting to prevent brute force:

```bash
npm install @upstash/ratelimit @upstash/redis
```

---

## File Structure

```
lib/
├── admin-auth.ts          # Admin auth utilities (getAdminSession, validateToken)
├── admin-middleware.ts    # withAdminAuth middleware for API routes
└── auth.ts                # NextAuth configuration

app/
├── admin/
│   ├── layout.tsx         # Protected admin layout
│   ├── signup/
│   │   └── page.tsx       # Admin signup form
│   ├── page.tsx           # Admin dashboard
│   ├── products/
│   ├── orders/
│   └── ...
└── api/
    └── admin/
        ├── auth/
        │   └── signup/
        │       └── route.ts  # Admin signup endpoint
        ├── products/
        │   ├── route.ts      # Protected with middleware
        │   └── [id]/
        │       └── route.ts  # Protected with middleware
        └── categories/
            └── route.ts      # Protected with middleware
```

---

## Testing Admin Signup

### 1. Generate Test Token

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Output: abc123def456xyz789...
```

### 2. Add to .env.local

```bash
ADMIN_SIGNUP_TOKENS=abc123def456xyz789
```

### 3. Access Signup Page

```
http://localhost:3000/admin/signup?token=abc123def456xyz789
```

### 4. Complete Signup

- Enter email: `admin@test.com`
- Click "Create Admin Account"
- You'll be redirected to admin panel
- Sign in with Google OAuth using the same email

### 5. Test Protected Routes

```bash
# Test admin API (should work with admin account)
curl -H "Authorization: Bearer token" http://localhost:3000/api/admin/products

# Test without admin (should return 403)
curl http://localhost:3000/api/admin/products
```

---

## Promoting Existing Users to Admin

```bash
# Using Prisma CLI
npx prisma studio

# Or with a script:
```

```typescript
// scripts/promote-admin.ts
import prisma from "@/app/lib/prisma";

async function promoteAdmin() {
  const user = await prisma.user.update({
    where: { email: "user@example.com" },
    data: { role: "ADMIN" },
  });

  console.log("Promoted user to admin:", user.email);
}

promoteAdmin().catch(console.error).finally(() => process.exit());
```

---

## Troubleshooting

### Issue: Token validation fails

**Solution:** 
- Check token in `.env.local` is exact match
- Ensure no trailing spaces in token
- Verify `ADMIN_SIGNUP_TOKENS` is set

### Issue: Admin can't access dashboard

**Solution:**
- Verify user's role is "ADMIN" in database
- Check session is properly created
- Try signing out and in again

### Issue: API returns 403 Forbidden

**Solution:**
- Verify you're signed in with admin account
- Check database that your user role is "ADMIN"
- Ensure request includes auth session

---

## Next Steps

1. ✅ Implement token management in database
2. ✅ Add email verification for admin signup
3. ✅ Implement audit logging for admin actions
4. ✅ Add rate limiting to signup endpoint
5. ✅ Add 2FA for admin accounts
6. ✅ Implement admin permission levels (Super Admin, Moderator, etc.)

---

## Support

For issues or questions, contact your development team.
