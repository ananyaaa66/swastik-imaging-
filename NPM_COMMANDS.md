# NPM Commands Reference

## Installation Commands

### Initial Setup (Run Once)
```bash
# Install all project dependencies
npm install

# Install additional backend dependencies
npm install express dotenv

# Install development tools
npm install --save-dev concurrently tsx
```

**Status:** ✅ All already installed in this project

## Development Commands

### Start Both Servers (Recommended)
```bash
npm run dev
```
- Starts frontend on `http://localhost:8080`
- Starts backend on `http://localhost:3001`
- Both run simultaneously

### Start Frontend Only
```bash
npm run dev:frontend
```
- Starts Vite dev server
- Port: `http://localhost:8080`
- No backend API available

### Start Backend Only
```bash
npm run dev:backend
```
- Starts Express server
- Port: `http://localhost:3001`
- No frontend available

## Production Commands

### Build for Production
```bash
npm run build
```
- Creates optimized production build
- Output in `dist/` folder
- Ready to deploy to hosting

### Type Checking
```bash
npm run typecheck
```
- Validates TypeScript types
- Checks for type errors
- Should show 0 errors

### Run Tests
```bash
npm test
```
- Runs all .spec.ts test files
- Uses Vitest framework

### Format Code
```bash
npm run format.fix
```
- Formats code with Prettier
- Fixes style issues
- Modifies all files in place

## Specific Development Workflows

### Complete Fresh Start
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run typecheck
npm run dev
```

### Quick Reset
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
npm run dev
```

### Build and Test
```bash
# Verify everything works before deployment
npm run typecheck
npm run test
npm run build
```

### Debug Mode
```bash
# Run with debug output
DEBUG=* npm run dev:backend

# Or for specific modules
NODE_DEBUG=http npm run dev:backend
```

## Package Management

### Check Outdated Packages
```bash
npm outdated
```

### Update Dependencies
```bash
# Update to latest versions
npm update

# Check what would be updated
npm update --dry-run
```

### List Installed Packages
```bash
# List all dependencies
npm list

# List only top-level
npm list --depth=0

# List production dependencies only
npm list --production
```

## Troubleshooting Commands

### Clear Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check npm Version
```bash
npm --version
```

### Check Node Version
```bash
node --version
```

### Verify Installation
```bash
npm run typecheck
```

## Production Deployment Commands

### For Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### For Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### For Heroku
```bash
# Build for production
npm run build

# Heroku automatically runs npm install
# Then runs "npm run start" or "npm start"
```

### For Docker
```bash
# Build production image
docker build -t appointment-app .

# Run container
docker run -p 8080:8080 appointment-app
```

## Advanced Commands

### Run with Environment Variables
```bash
# Set variables and run
TWILIO_ACCOUNT_SID=xxx npm run dev
```

### Run Specific Script
```bash
# Run any script from package.json
npm run <script-name>
```

### Install Specific Version
```bash
# Install specific version
npm install express@4.18.0

# Install latest version
npm install express@latest

# Install version with caret (compatible versions)
npm install express@^4.0.0
```

### Remove Package
```bash
npm uninstall <package-name>
npm uninstall --save-dev <package-name>
```

## Monitoring & Logs

### View npm Cache
```bash
npm cache verify
```

### View npm Configuration
```bash
npm config list
```

### View Global Packages
```bash
npm list -g --depth=0
```

## Summary Table

| Command | Purpose | Runs |
|---------|---------|------|
| `npm install` | Install dependencies | Once |
| `npm run dev` | Start both servers | Development |
| `npm run dev:frontend` | Start frontend | Development |
| `npm run dev:backend` | Start backend | Development |
| `npm run build` | Create production build | Before deployment |
| `npm run typecheck` | Validate types | Before deployment |
| `npm test` | Run tests | Before deployment |
| `npm run format.fix` | Format code | Anytime |

## Quick Reference

**Getting Started:**
```bash
npm install
npm run dev
# Visit http://localhost:8080/book-appointment
```

**Before Pushing to Production:**
```bash
npm run typecheck
npm run test
npm run build
```

**Troubleshooting:**
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run dev
```

**Deploy Frontend Only:**
```bash
npm run build
# Deploy dist/ folder to hosting
```

**Deploy Full Stack:**
```bash
npm run build
# Deploy dist/ to frontend hosting
# Deploy server.ts to Node.js hosting
# Set environment variables on hosting
```

---

**All commands tested and working ✅**

For more help, see:
- QUICK_START.md
- APPOINTMENT_SETUP.md
- README_APPOINTMENT_SYSTEM.md
