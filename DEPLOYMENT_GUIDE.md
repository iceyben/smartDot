# SmartDot Production Deployment Guide

## ✅ Production Ready Checklist

### Core Features Implemented
- ✅ Email/Password Admin Authentication
- ✅ Google OAuth Support (with network timeout issues - can be disabled)
- ✅ Role-Based Access Control (ADMIN vs USER)
- ✅ Secure Admin Panel
- ✅ Admin Management (create new admins)
- ✅ Product Management (CRUD)
- ✅ Order Management
- ✅ Category Management
- ✅ Protected API Routes with Middleware
- ✅ JWT Token Strategy
- ✅ Proper Error Handling
- ✅ Database Integration (MongoDB)

### Security Features
- ✅ Bcrypt password hashing (12 rounds)
- ✅ NextAuth secret configured
- ✅ Admin middleware on all admin routes
- ✅ Session-based authentication
- ✅ JWT tokens for API
- ✅ Admin-only creation requires existing admin
- ✅ Proper authorization checks

---

## 🚀 Deployment Instructions

### 1. Pre-Deployment Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests (optional)
npm run test
```

### 2. Environment Variables

Create a `.env.production` file (or set in deployment platform):

```bash
# NextAuth
NEXTAUTH_SECRET=<your-secure-secret>
NEXTAUTH_URL=https://yourdomain.com

# Database
MONGODB_URI=<your-mongodb-connection-string>

# Google OAuth (optional - can be disabled if network issues)
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>

# Other services
CLOUDINARY_CLOUD_NAME=<your-name>
CLOUDINARY_API_KEY=<your-key>
CLOUDINARY_API_SECRET=<your-secret>

# Email service (Resend - optional)
RESEND_API_KEY=<your-resend-key>

# Inngest (optional)
INNGEST_SIGNING_KEY=<your-key>
INNGEST_EVENT_KEY=<your-key>
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Seed initial data (if needed)
npx tsx scripts/seed-categories.ts
```

### 4. Create Initial Admin Account

Before deploying, create the admin account:

```bash
npx tsx scripts/quick-setup.ts
```

This will create:
- Email: `admin.smartdot@gmail.com`
- Password: `Bruce@12345` (CHANGE THIS IMMEDIATELY AFTER LOGIN!)

### 5. Production Build & Start

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📋 Features & Access

### Admin Panel
- **URL:** `https://yourdomain.com/admin`
- **Login:** Email & Password (or Google OAuth if enabled)
- **Features:**
  - Dashboard with statistics
  - Product management
  - Order tracking
  - Admin user management

### User Dashboard
- **URL:** `https://yourdomain.com/dashboard`
- **Login:** Google OAuth or custom signup
- **Features:**
  - View orders
  - Manage profile

### Customer Site
- **URL:** `https://yourdomain.com`
- **Features:**
  - Browse products
  - Shopping cart
  - Checkout

---

## 🔑 Key Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### Admin APIs
- `GET /api/admin/products` - List products (admin only)
- `POST /api/admin/products` - Create product (admin only)
- `GET /api/admin/admins` - List admins (admin only)
- `POST /api/admin/admins` - Create admin (admin only)
- `GET /api/admin/orders` - List orders (admin only)

### Public APIs
- `GET /api/products` - List products
- `GET /api/categories` - List categories
- `GET /api/orders/latest` - Get latest orders

---

## ⚙️ Configuration

### NextAuth Options
- **Strategy:** JWT
- **Session Duration:** 30 days
- **Providers:** Credentials, Google OAuth
- **Database:** MongoDB with Prisma

### Authentication Flow

```
User Login Page
    ↓
[Email & Password] ← Credentials Provider ↔ Database
[Google OAuth]     ← Google Provider ↔ Google
    ↓
JWT Token Created
    ↓
Session Established
    ↓
Role Check (ADMIN vs USER)
    ↓
Redirect to /admin or /dashboard
```

---

## 🐛 Troubleshooting

### Google OAuth Connection Issues
If Google OAuth fails with network errors:
1. Check internet connectivity
2. Verify credentials are correct in `.env`
3. Falls back to Email & Password auth (more reliable)

### Database Connection
If MongoDB connection fails:
```bash
# Test connection
npx ts-node -e "import prisma from '@/app/lib/prisma'; await prisma.\$queryRaw\`SELECT 1\`"
```

### Admin Access Denied
If admin can't access `/admin`:
1. Verify role is "ADMIN" in database
2. Check JWT token in browser cookies
3. Try clearing cookies and logging back in

---

## 📊 Monitoring

### Logs to Monitor
- Authentication failures
- Admin access attempts
- Product creation/updates
- Order status changes
- API errors

### Performance Considerations
- Image optimization: Using Next.js `Image` component
- Database: Connection pooling recommended
- API: Rate limiting recommended for production
- CDN: Consider Cloudflare for static assets

---

## 🔒 Security Recommendations for Production

1. **Change Admin Password Immediately**
   - Login and change from default `Bruce@12345`

2. **Enable Rate Limiting**
   ```bash
   npm install @upstash/ratelimit @upstash/redis
   ```

3. **Add CORS Headers**
   - Restrict to your domain only

4. **Enable HTTPS**
   - Use SSL/TLS certificate
   - Redirect HTTP to HTTPS

5. **Database Security**
   - Enable MongoDB authentication
   - Use connection string with credentials
   - Regular backups

6. **Environment Variables**
   - Never commit `.env` to git
   - Use deployment platform's secret management

7. **API Security**
   - Add request validation
   - Implement audit logging
   - Monitor suspicious activity

---

## 📞 Support

For deployment issues:
1. Check the error logs
2. Verify all environment variables
3. Test database connection
4. Verify NextAuth configuration

---

## 🎯 Next Steps

1. ✅ Deploy application
2. ✅ Change admin password
3. ✅ Create additional admin accounts via admin panel
4. ✅ Test authentication flow
5. ✅ Monitor logs
6. ✅ Set up backup strategy
7. ✅ Configure CI/CD pipeline

---

## Deployment Platforms

### Recommended: Vercel (Next.js Creator)
```bash
# Push to git
git push

# Vercel auto-deploys
# Set environment variables in Vercel dashboard
```

### Alternative: Railway, Render, AWS EC2, DigitalOcean
- Requires Node.js 18+
- MongoDB for database
- Environment variable configuration

---

**Last Updated:** January 22, 2026
**Version:** 1.0.0 (Production Ready)
