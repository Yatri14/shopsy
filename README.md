# Shopsy

Shopsy is a production-ready full-stack e-commerce experience built with Next.js, TypeScript, Tailwind CSS, Express, MongoDB, JWT, Stripe, Razorpay, Cloudinary, and Nodemailer.

## Project structure

- shopsy-app: Next.js storefront and admin frontend
- shopsy-api: Express + MongoDB REST API

## Run locally

1. Install frontend dependencies:
   - cd shopsy-app
   - npm install
   - npm run dev

2. Install backend dependencies:
   - cd shopsy-api
   - npm install
   - npm run dev

## Deployment guide

### 1. Frontend on Vercel
1. Create a Vercel project and import the GitHub repository.
2. Set the root directory to shopsy-app.
3. Build command: npm run build
4. Add environment variables:
   - NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com
   - NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   - NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
5. Deploy.

### 2. Backend on Render
1. Create a Render Web Service for the backend folder.
2. Build command: npm install && npm run build
3. Start command: npm run start
4. Add environment variables:
   - PORT=10000
   - NODE_ENV=production
   - MONGODB_URI=your_mongodb_atlas_connection_string
   - JWT_SECRET=your_long_secret
   - CORS_ORIGIN=https://your-vercel-domain.vercel.app
   - STRIPE_SECRET_KEY=sk_live_...
   - RAZORPAY_KEY_ID=rzp_live_...
   - RAZORPAY_KEY_SECRET=your_secret
   - CLOUDINARY_CLOUD_NAME=your_cloud_name
   - CLOUDINARY_API_KEY=your_api_key
   - CLOUDINARY_API_SECRET=your_secret
   - SMTP_HOST=smtp.sendgrid.net
   - SMTP_PORT=587
   - SMTP_USER=apikey
   - SMTP_PASS=your_sendgrid_key
5. Deploy and test the health endpoint at /health.

### 3. MongoDB Atlas
1. Create a cluster and database user.
2. Whitelist 0.0.0.0/0 for deployment access.
3. Use the Atlas URI in MONGODB_URI.

### 4. Cloudinary, Stripe, and Razorpay
- Cloudinary: use the cloud name, API key, and API secret from your account.
- Stripe: add the publishable key in Vercel and the secret key in Render.
- Razorpay: add the key ID in Vercel and the key ID/secret in Render.

### 5. CI/CD with GitHub
1. Connect the repository to Vercel and Render.
2. Use GitHub branch protection and require builds to pass before merging.
3. Recommended workflow: run npm install and npm run build on push/PR.

### 6. Post-deployment checklist
- Verify the frontend reaches the backend.
- Confirm MongoDB connectivity.
- Test uploads through Cloudinary.
- Confirm Stripe and Razorpay checkout flows.
- Verify /sitemap.xml and /robots.txt are publicly accessible.
