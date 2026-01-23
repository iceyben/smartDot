# 🚀 How to Access the Admin Panel

## Step 1: Create an Account (if you don't have one)

1. Go to: `http://localhost:3000/signup`
2. Sign up with your email and password
3. Complete email verification (if enabled)

## Step 2: Set Your User as Admin

You need to set your user's role to `"admin"` in the database.

### Option A: Using the Script (Recommended)

Run this command in your terminal (replace `your-email@example.com` with your actual email):

```bash
npx tsx scripts/set-admin.ts your-email@example.com
```

Example:
```bash
npx tsx scripts/set-admin.ts admin@smartdot.com
```

### Option B: Using Prisma Studio

1. Open Prisma Studio:
   ```bash
   npx prisma studio
   ```

2. Navigate to the `user` table
3. Find your user by email
4. Edit the user and set `role` field to: `admin`
5. Save

### Option C: Using MongoDB Directly

If you have MongoDB Compass or MongoDB CLI access:

1. Find your user in the `user` collection
2. Update the `role` field to: `"admin"`

```javascript
// MongoDB query
db.user.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Step 3: Access the Admin Panel

Once your role is set to `"admin"`:

1. Make sure you're logged in: `http://localhost:3000/login`
2. Go to the admin panel: `http://localhost:3000/admin`

You should see:
- **Dashboard** - Statistics overview
- **Products** - Manage products (add, edit, delete)
- **Orders** - View all customer orders

## 🔒 Security Notes

- Only users with `role: "admin"` can access `/admin` routes
- Non-admin users will be redirected to `/dashboard`
- Unauthenticated users will be redirected to `/login`

## ❓ Troubleshooting

**Problem**: "Unauthorized" or redirected to dashboard

**Solution**: Make sure your user's `role` field in the database is exactly `"admin"` (lowercase, as a string)

**Problem**: User not found when running the script

**Solution**: 
- Make sure you've signed up first
- Check that your email matches exactly (case-sensitive)

---

**Admin Panel Routes:**
- Dashboard: `/admin`
- Products: `/admin/products`
- Orders: `/admin/orders`
