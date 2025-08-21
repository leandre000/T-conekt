# Deployment Guide for TalentConnect

This guide explains how to deploy the TalentConnect application to Vercel and Render.

## Prerequisites

Before deploying, make sure you have:

1. A PostgreSQL database (you can use Neon, Supabase, or AWS RDS)
2. OAuth applications set up for Google and GitHub
3. Stripe account for payment processing (optional)
4. AWS S3 bucket for file uploads (optional)

## Environment Variables

Copy `.env.example` to `.env` and fill in all the required values:

```bash
cp .env.example .env
```

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth.js
- `NEXTAUTH_URL`: Your application URL
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: GitHub OAuth credentials

### Optional Environment Variables

- `STRIPE_SECRET_KEY`: For payment processing
- `AWS_*`: For file uploads to S3
- `NEXT_PUBLIC_BASE_URL`: For API calls

## Database Setup

1. Run database migrations:
```bash
npx prisma migrate deploy
```

2. Generate Prisma client:
```bash
npx prisma generate
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all environment variables from your `.env` file

## Deployment to Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `talent-connect-app`

4. Set environment variables in Render dashboard:
   - Add all environment variables from your `.env` file

## Post-Deployment Steps

1. Run database migrations on production:
```bash
npx prisma migrate deploy
```

2. Test the application:
   - User registration/login
   - Profile creation
   - Job posting/application
   - Real-time messaging

## Troubleshooting

### Build Issues
- Ensure all environment variables are set
- Check that the database is accessible
- Verify OAuth redirects are configured correctly

### Runtime Issues
- Check application logs
- Verify database connection
- Ensure all required environment variables are present

## Monitoring

- Monitor application performance
- Set up error tracking (Sentry recommended)
- Monitor database performance
- Set up uptime monitoring

## Security Considerations

- Use strong secrets for all keys
- Enable HTTPS only
- Configure CORS properly
- Set up rate limiting
- Use secure headers
