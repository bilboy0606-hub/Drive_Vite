#!/bin/bash
# Local testing server setup

# This script helps you test the React + Vite app locally with PHP backend

echo "🚀 Starting local development environment..."
echo ""

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP first."
    exit 1
fi

echo "✅ PHP found"
echo ""

# Start PHP development server in background on port 8000
echo "Starting PHP server on http://localhost:8000/api ..."
cd "api" || exit
php -S localhost:8000 &
PHP_PID=$!
cd ..

echo "✅ PHP server started (PID: $PHP_PID)"
echo ""

# Start Vite dev server
echo "Starting Vite dev server..."
npm run dev

# Cleanup on exit
trap "kill $PHP_PID 2>/dev/null" EXIT
