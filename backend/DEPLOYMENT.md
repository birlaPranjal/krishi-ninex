# Backend API Deployment Guide (Standalone Vercel Project)

This backend is deployed as a **separate Vercel project** from the Next.js frontend.

## Deployment Steps

### 1. Create Vercel Project for Backend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. **Important**: Set the **Root Directory** to `backend`
   - In project settings, go to "Settings" → "General"
   - Set "Root Directory" to `backend`

### 2. Configure Build Settings

Vercel will auto-detect the configuration from `vercel.json`, but verify:
- **Framework Preset**: Other (or Node.js)
- **Build Command**: Leave empty (Vercel compiles TypeScript automatically)
- **Output Directory**: Leave empty
- **Install Command**: `npm install` (default)

### 3. Set Environment Variables

In Vercel project settings → "Environment Variables", add:

#### Required:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### Optional:
```
PORT=5000
API_VERSION=v1
BCRYPT_SALT_ROUNDS=12
```

**Important**: 
- Add `CORS_ORIGIN` with your frontend Vercel URL (e.g., `https://your-app.vercel.app`)
- Or add multiple origins: `https://app1.vercel.app,https://app2.vercel.app`
- For development, you can add: `http://localhost:3000`

### 4. Deploy

1. Push your code to GitHub
2. Vercel will automatically deploy on push to main/master
3. Your API will be available at: `https://your-backend-project.vercel.app/api/v1/*`

## API Endpoints

Once deployed, your API will be available at:

- Base URL: `https://your-backend-project.vercel.app`
- API Routes: `/api/v1/*`

Example:
- `POST https://your-backend-project.vercel.app/api/v1/auth/register`
- `GET https://your-backend-project.vercel.app/api/v1/products`
- `POST https://your-backend-project.vercel.app/api/v1/orders`

## Frontend Configuration

Update your Next.js frontend `.env.local` or Vercel environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app/api/v1
```

## Project Structure

```
backend/
├── api/
│   └── index.ts          # Vercel serverless function entry point
├── src/
│   ├── index.ts          # Express app
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   ├── models/           # Mongoose models
│   └── ...
├── package.json
├── vercel.json           # Vercel configuration
└── tsconfig.json
```

## How It Works

1. **Serverless Functions**: Each API request invokes the serverless function at `api/index.ts`
2. **Database Connection**: MongoDB connection is established on first invocation and reused
3. **TypeScript**: Vercel automatically compiles TypeScript files
4. **Routes**: All requests (`/*`) are routed to the Express app handler

## Troubleshooting

### Build Errors

1. **TypeScript Errors**: Ensure all dependencies are installed
   ```bash
   cd backend
   npm install
   ```

2. **Import Errors**: The `api/index.ts` imports from `../src/index.js`
   - Vercel compiles TypeScript automatically
   - Ensure the path is correct

3. **Database Connection Errors**: 
   - Verify `MONGODB_URI` is set correctly
   - Check MongoDB Atlas IP whitelist (should allow all IPs: `0.0.0.0/0`)
   - Verify network access is enabled

### Runtime Errors

1. **CORS Errors**: 
   - Ensure `CORS_ORIGIN` includes your frontend domain
   - Check browser console for specific error

2. **Function Timeout**: 
   - Default is 30 seconds (Hobby plan)
   - Can increase to 60s on Pro plan
   - Check for slow database queries

3. **Cold Starts**: 
   - First request may be slower (database connection)
   - Subsequent requests are faster

## Testing Locally

To test the Vercel setup locally:

```bash
cd backend
npm install -g vercel
vercel dev
```

This will:
- Start a local server simulating Vercel
- Use your Vercel environment variables
- Hot-reload on changes

## Monitoring

- Check Vercel Dashboard → "Functions" tab for logs
- Monitor database connections in MongoDB Atlas
- Check "Deployments" for build logs

## Next Steps

After backend deployment:
1. Get your backend Vercel URL
2. Update frontend environment variables
3. Deploy frontend (separate Vercel project)
4. Test integration between frontend and backend

