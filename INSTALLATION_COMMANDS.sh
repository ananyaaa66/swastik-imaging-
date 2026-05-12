#!/bin/bash

# Appointment Booking System - Installation Commands
# Run these commands to set up the appointment booking system

echo "Installing Appointment Booking System Dependencies..."
echo "========================================================"

# Step 1: Install main dependencies (Twilio is already in package.json)
echo ""
echo "Step 1: Installing Express and dotenv..."
npm install express dotenv

# Step 2: Install development dependencies
echo ""
echo "Step 2: Installing development tools..."
npm install --save-dev concurrently tsx

# Step 3: Verify installation
echo ""
echo "Step 3: Verifying TypeScript compilation..."
npm run typecheck

echo ""
echo "========================================================"
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Twilio credentials:"
echo "   - TWILIO_ACCOUNT_SID"
echo "   - TWILIO_AUTH_TOKEN"
echo "   - CLINIC_WHATSAPP_NUMBER"
echo ""
echo "2. Start development servers:"
echo "   npm run dev"
echo ""
echo "3. Visit the appointment form:"
echo "   http://localhost:8080/book-appointment"
echo ""
echo "========================================================"
