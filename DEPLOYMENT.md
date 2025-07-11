# Netlify Deployment Guide

## Overview
This project has been configured for static site deployment on Netlify with serverless functions handling the backend API.

## Prerequisites
1. Netlify account
2. Neon PostgreSQL database
3. Environment variables configured

## Environment Variables Required

### Database
- `DATABASE_URL` - Your Neon PostgreSQL connection string

### Authentication
- `JWT_SECRET` - Secret key for JWT token generation

### Payment Processing (Optional)
- `STRIPE_SECRET_KEY` - Stripe secret key for payment processing

### Email Service (Optional)
- `SENDGRID_API_KEY` - SendGrid API key for email services

## Deployment Steps

### 1. Connect Repository
1. Log in to Netlify
2. Click "New site from Git"
3. Connect your GitHub/GitLab repository
4. Select your repository

### 2. Configure Build Settings
The build settings are already configured in `netlify.toml`:
- **Build command**: `npm run build && node build-functions.js`
- **Publish directory**: `dist/public`
- **Functions directory**: `netlify/functions`

### 3. Set Environment Variables
In your Netlify dashboard:
1. Go to Site settings > Environment variables
2. Add all required environment variables listed above

### 4. Database Setup
1. Ensure your Neon database is accessible
2. Run database migrations: `npm run db:push`
3. The database schema will be automatically created

### 5. Deploy
1. Click "Deploy site"
2. Netlify will automatically build and deploy your site
3. Your site will be available at the provided Netlify URL

## File Structure for Deployment

```
project/
├── netlify/
│   └── functions/          # Serverless functions
│       ├── auth.ts         # Authentication endpoints
│       ├── franchises.ts   # Franchise API
│       ├── businesses.ts   # Business API
│       ├── advertisements.ts # Advertisement API
│       ├── inquiries.ts    # Inquiry API
│       ├── payments.ts     # Payment processing
│       └── admin.ts        # Admin functions
├── dist/
│   └── public/             # Static site files
├── netlify.toml            # Netlify configuration
├── _redirects             # URL redirects
└── build-functions.js      # Function build script
```

## API Endpoints

All API endpoints are automatically routed through Netlify Functions:

- `GET/POST /api/franchises` - Franchise operations
- `GET/POST /api/businesses` - Business operations
- `GET/POST /api/advertisements` - Advertisement operations
- `GET/POST /api/inquiries` - Inquiry operations
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/reset-password` - Password reset confirmation
- `GET /api/auth/verify` - Token verification
- `POST /api/payments/create-payment-intent` - Payment processing
- `POST /api/payments/create-subscription` - Subscription creation
- `GET /api/admin/*` - Admin operations
- `PUT /api/admin/*/status` - Status updates

## Security Features

1. **CORS Configuration**: Properly configured for cross-origin requests
2. **Authentication**: JWT-based authentication with secure token handling
3. **Database Security**: Connection pooling and prepared statements
4. **Environment Variables**: Sensitive data stored in environment variables
5. **HTTPS**: Automatic HTTPS through Netlify

## Performance Optimizations

1. **Connection Pooling**: Minimal database connections for serverless
2. **Caching**: Netlify CDN caching for static assets
3. **Code Splitting**: Optimized JavaScript bundles
4. **Serverless Functions**: Auto-scaling based on demand

## Monitoring and Debugging

1. **Netlify Functions**: Check function logs in Netlify dashboard
2. **Database**: Monitor Neon database performance
3. **Error Tracking**: Console logs available in Netlify function logs
4. **Performance**: Netlify Analytics for site performance

## Custom Domain (Optional)

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificates are automatically provisioned

## Troubleshooting

### Common Issues

1. **Function Timeout**: Increase timeout in netlify.toml if needed
2. **Database Connection**: Verify DATABASE_URL is correct
3. **Environment Variables**: Ensure all required variables are set
4. **Build Errors**: Check build logs in Netlify dashboard

### Support

- Netlify Documentation: https://docs.netlify.com/
- Neon Documentation: https://neon.tech/docs
- Project Issues: Check repository issues page