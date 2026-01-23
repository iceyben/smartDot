# Admin Setup Guide - Email & Password Authentication

## 🚀 Quick Start

### 1. Initialize First Admin Account

Run the interactive setup script:

```bash
npx ts-node scripts/setup-admin.ts
```

You'll be prompted for:
- Full Name: `Bruce`
- Email: `admin.smartdot@gmail.com`
- Password: `Bruce@12345`

### 2. Access Admin Login

Go to: **http://localhost:3000/login**

**Choose "Email & Password" tab and login with:**
- Email: `admin.smartdot@gmail.com`
- Password: `Bruce@12345`

### 3. Access Admin Panel

After login, you'll be redirected to: **http://localhost:3000/admin**

---

## 📋 Admin Features

### Dashboard
- View statistics (products, orders, revenue, users)
- Monitor pending orders

### Products
- Create, read, update, delete products
- Manage product categories
- Upload product images

### Orders
- View all orders
- Track order status

### Admin Users (NEW!)
- View all admin accounts
- Create new admin accounts with email and password
- Only admins can add new admins

---

## 👥 Adding New Admins

### From Admin Panel

1. Go to **Admin Panel** → **Admin Users**
2. Click **"+ Add New Admin"**
3. Fill in:
   - Full Name
   - Email Address
   - Password (min 8 characters)
4. Click **"Create Admin Account"**

The new admin can login immediately with their credentials.

### From Command Line (Alternative)

```bash
# Promote existing user to admin
npx ts-node scripts/promote-to-admin.ts user-email@example.com
```

---

## 🔐 Authentication Methods

### Email & Password
- For admin accounts
- Direct login at `/login` page
- Credentials stored securely with bcrypt hashing

### Google OAuth
- Still supported for regular users
- Can be used as fallback login method

---

## 📝 Environment Variables

Ensure your `.env.local` has:

```bash
# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Database
MONGODB_URI=your-mongodb-connection-string
```

---

## 🛡️ Security Features

✅ **Passwords hashed with bcrypt** (12 rounds)  
✅ **Admin-only routes protected** with middleware  
✅ **Role-based access control** (ADMIN vs USER)  
✅ **Session-based authentication** via NextAuth  
✅ **Admin creation requires existing admin** (prevents unauthorized access)  

---

## 🔄 Login Flow

```
User visits /login
    ↓
Choose authentication method
    ├── Email & Password → Credentials Provider
    └── Google → Google OAuth
    ↓
Success → Redirect to /admin or /dashboard
    ↓
Failure → Show error message
```

---

## 📚 API Endpoints

### Create Admin
```bash
POST /api/admin/admins
Authorization: Required (admin only)

Body:
{
  "email": "new-admin@example.com",
  "password": "SecurePassword123",
  "name": "Admin Name"
}
```

### Get All Admins
```bash
GET /api/admin/admins
Authorization: Required (admin only)
```

---

## 🐛 Troubleshooting

### "Invalid email or password"
- Check email is exactly correct
- Ensure password matches what you set
- Try again - there may be a session issue

### "This email is already registered"
- That email already has an account
- Use a different email address

### "This account uses a different sign-in method"
- Account was created via Google OAuth
- Promote the user with: `npx ts-node scripts/promote-to-admin.ts email@example.com`
- Then set their password through the admin panel

### Can't access admin panel
- Ensure you're logged in as admin
- Check that your user role is "ADMIN" in database
- Try clearing browser cookies and logging back in

---

## 📊 Database Schema

The User model now includes:

```prisma
model User {
  id       String    @id @default(cuid())
  email    String    @unique
  password String?   // New field - optional for OAuth users
  role     String    @default("USER")
  // ... other fields
}
```

Valid roles:
- `"USER"` - Regular customer
- `"ADMIN"` - Administrator

---

## 🚨 Important Notes

⚠️ **Never share admin passwords**  
⚠️ **Change initial password after first login**  
⚠️ **Use strong passwords (min 8 characters)**  
⚠️ **Keep credentials confidential**  

---

## 📞 Support

For issues:
1. Check the troubleshooting section above
2. Verify database connection is working
3. Check browser console for error messages
4. Review server logs for API errors

---

## Files Changed

- `prisma/schema.prisma` - Added password field
- `app/lib/auth.ts` - Added Credentials provider
- `app/login/page.tsx` - Updated with email/password login
- `app/api/admin/admins/route.ts` - New admin CRUD endpoint
- `app/admin/admins/page.tsx` - New admin management UI
- `scripts/setup-admin.ts` - Interactive admin setup
