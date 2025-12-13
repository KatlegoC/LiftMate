#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "1. Visit: https://nodejs.org/"
    echo "2. Download the LTS version for macOS"
    echo "3. Run the installer"
    echo "4. Restart your terminal"
    echo ""
    echo "After installing, run this script again."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting development server..."
echo "The site will open at http://localhost:5173"
echo ""
npm run dev

