# Deployment Guide

## Quick Start - Deploy to Vercel

The fastest way to deploy this app is using Vercel:

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project
cd house-maintenance

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy: **Yes**
- Which scope?: Choose your account
- Link to existing project?: **No**
- What's your project's name?: **house-maintenance** (or your preferred name)
- In which directory is your code located?: **./**
- Want to override the settings?: **No**

Your app will be deployed and you'll receive a production URL!

### Method 2: GitHub + Vercel Dashboard

1. **Initialize Git and push to GitHub:**
   ```bash
   cd house-maintenance
   git init
   git add .
   git commit -m "Initial commit: House Maintenance Tracker"
   git branch -M main
   git remote add origin https://github.com/yourusername/house-maintenance.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

Vercel will automatically:
- Detect Next.js
- Configure build settings
- Deploy your app
- Provide a production URL

## Important: Data Persistence on Vercel

**Note:** The current JSON file-based storage (`data/tasks.json`) will reset on each deployment because Vercel's file system is read-only in production.

For production use, you have two options:

### Option A: Keep Using File Storage (For Testing Only)
Your data will work during each deployment session but will reset when you redeploy.

### Option B: Upgrade to a Database (Recommended for Production)

Choose one of these free database options:

#### 1. Vercel Postgres (Easiest)
```bash
# Install Vercel Postgres
npm install @vercel/postgres

# In Vercel Dashboard:
# - Go to Storage tab
# - Create a Postgres database
# - Copy environment variables
```

#### 2. Supabase (Free PostgreSQL)
- Sign up at [supabase.com](https://supabase.com)
- Create a new project
- Get your connection string
- Install: `npm install @supabase/supabase-js`

#### 3. MongoDB Atlas (Free NoSQL)
- Sign up at [mongodb.com](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Install: `npm install mongodb`

## Environment Variables

If you add a database, create a `.env.local` file:

```env
DATABASE_URL=your_database_connection_string
```

In Vercel Dashboard:
1. Go to your project Settings
2. Navigate to Environment Variables
3. Add your variables
4. Redeploy

## Testing Your Deployment

After deployment:

1. Visit your Vercel URL
2. Test adding a new task
3. Test marking a task as done
4. Test filtering and editing
5. Check responsive design on mobile

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run builds and checks

## Custom Domain

To add a custom domain:

1. In Vercel Dashboard, go to your project
2. Navigate to Settings > Domains
3. Add your domain
4. Follow DNS configuration instructions

## Monitoring

Vercel provides:
- Analytics (free tier available)
- Error tracking
- Performance monitoring

Access these in your Vercel Dashboard.

## Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run lint
```

### Data Not Persisting
- Expected with JSON file storage on Vercel
- Consider upgrading to a database (see options above)

### API Routes Not Working
- Ensure all files in `app/api/` are named `route.ts`
- Check Vercel function logs in Dashboard

## Support

For issues:
- Check Vercel deployment logs
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel support: [vercel.com/support](https://vercel.com/support)
