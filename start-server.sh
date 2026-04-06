#!/bin/bash

# AI FOR DEVELOPERS - Quick Start Script
# Starts a local web server to view the interactive website

echo "╔═════════════════════════════════════════════════════════════╗"
echo "║  AI FOR DEVELOPERS: Interactive Learning Website           ║"
echo "║  Supercharging Your Development Workflow                   ║"
echo "╚═════════════════════════════════════════════════════════════╝"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✓ Starting web server with Python 3..."
    echo ""
    echo "🌐 Opening at: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000

elif command -v python &> /dev/null; then
    echo "✓ Starting web server with Python 2..."
    echo ""
    echo "🌐 Opening at: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000

elif command -v node &> /dev/null; then
    echo "✓ Starting web server with Node.js..."
    echo ""
    echo "Installing http-server globally..."
    npm install -g http-server
    
    echo ""
    echo "🌐 Opening at: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    http-server

else
    echo "❌ Error: No suitable web server found."
    echo ""
    echo "Please install one of the following:"
    echo "  • Python 3: https://www.python.org/"
    echo "  • Node.js: https://nodejs.org/"
    echo ""
    echo "Then run this script again."
    exit 1
fi
