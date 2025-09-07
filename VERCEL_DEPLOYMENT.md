# Vercel Deployment Guide for OFYS Web App

## Prerequisites

Before deploying to Vercel, ensure you have:

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Your code should be in a GitHub repo
3. **MongoDB Atlas Account** - For production database
4. **Gmail App Password** - For email functionality

---

## Step 1: Prepare Your Code

### 1.1 Update package.json

Ensure your `package.json` has the correct build script:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

### 1.2 Create .vercelignore (Optional)

Create `.vercelignore` to exclude unnecessary files:

```
.env.local
.env.development.local
.env.test.local
.env.production.local
node_modules
.git
README.md
*.md
scripts/
```

---

## Step 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel

### 2.2 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

Example:

```
mongodb+srv://username:password@cluster.mongodb.net/ofys-web-app?retryWrites=true&w=majority
```

---

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project

### 3.2 Configure Build Settings

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3.3 Set Environment Variables

In Vercel dashboard, go to your project → Settings → Environment Variables:

#### Required Variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ofys-web-app?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-here-generate-a-random-string
NEXTAUTH_URL=https://your-app-name.vercel.app

# Admin Credentials
ADMIN_USERNAME=ofys_admin
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_EMAIL=admin@ofys.com

# Email Configuration
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-gmail-app-password
```

#### Environment Variable Settings:

- **NEXTAUTH_SECRET**: Production, Preview, Development
- **MONGODB_URI**: Production, Preview, Development
- **NEXTAUTH_URL**: Production only
- **ADMIN_USERNAME**: Production, Preview, Development
- **ADMIN_PASSWORD**: Production, Preview, Development
- **ADMIN_EMAIL**: Production, Preview, Development
- **MAIL_USER**: Production, Preview, Development
- **MAIL_PASS**: Production, Preview, Development

---

## Step 4: Deploy and Test

### 4.1 Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (usually 2-3 minutes)
3. Your app will be available at `https://your-app-name.vercel.app`

### 4.2 Create Admin User

After deployment, you'll need to create the admin user:

1. **Option A: Use the API directly**

```bash
curl -X POST https://your-app-name.vercel.app/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ofys_admin",
    "email": "admin@ofys.com",
    "password": "YourSecurePassword123!",
    "role": "admin"
  }'
```

2. **Option B: Create a temporary script**
   Create a simple script to run locally that connects to your production database.

### 4.3 Test Your Deployment

1. Visit your Vercel URL
2. Go to `/admin/login`
3. Login with your admin credentials
4. Test all functionality:
   - Contact form
   - Admin dashboard
   - User management (if implemented)

---

## Step 5: Domain Configuration (Optional)

### 5.1 Custom Domain

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

### 5.2 SSL Certificate

Vercel automatically provides SSL certificates for all domains.

---

## Step 6: Production Optimizations

### 6.1 Performance

- Vercel automatically optimizes Next.js apps
- Images are automatically optimized
- Static assets are cached globally

### 6.2 Monitoring

- Vercel provides built-in analytics
- Monitor performance in the Vercel dashboard
- Set up error tracking if needed

---

## Environment Variables Reference

### Required for Production:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ofys-web-app

# Authentication
NEXTAUTH_SECRET=your-32-character-secret-key
NEXTAUTH_URL=https://your-domain.com

# Admin Access
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
ADMIN_EMAIL=admin@yourdomain.com

# Email Service
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-gmail-app-password
```

### Security Notes:

- Use strong, unique passwords
- Generate a random 32+ character NEXTAUTH_SECRET
- Use Gmail App Passwords (not your regular password)
- Keep environment variables secure

---

## Troubleshooting

### Common Issues:

#### 1. Build Failures

- Check that all dependencies are in `package.json`
- Ensure TypeScript errors are resolved
- Check build logs in Vercel dashboard

#### 2. Database Connection Issues

- Verify MongoDB Atlas connection string
- Check IP whitelist (should include 0.0.0.0/0)
- Verify database user permissions

#### 3. Authentication Issues

- Ensure NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain
- Check admin credentials

#### 4. Email Issues

- Verify Gmail App Password is correct
- Check MAIL_USER and MAIL_PASS variables
- Ensure 2FA is enabled on Gmail account

### Getting Help:

- Check Vercel deployment logs
- Review MongoDB Atlas logs
- Test API endpoints individually
- Use browser developer tools for frontend issues

---

## Post-Deployment Checklist

- [ ] App loads successfully
- [ ] Admin login works
- [ ] Contact form sends emails
- [ ] All pages render correctly
- [ ] Images and assets load
- [ ] Database connections work
- [ ] Environment variables are set
- [ ] SSL certificate is active
- [ ] Custom domain works (if applicable)
- [ ] Performance is acceptable

---

## Maintenance

### Regular Tasks:

- Monitor Vercel dashboard for issues
- Update dependencies regularly
- Backup MongoDB data
- Review and rotate secrets periodically
- Monitor email delivery rates

### Updates:

- Push changes to GitHub
- Vercel automatically redeploys
- Test in preview environment first
- Monitor deployment logs
