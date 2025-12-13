# Setup Instructions for LiftMate

## Prerequisites: Install Node.js

You need Node.js (which includes npm) to run this project. Here are the easiest ways to install it on macOS:

### Option 1: Download from nodejs.org (Recommended - Easiest)

1. Visit https://nodejs.org/
2. Download the LTS (Long Term Support) version for macOS
3. Run the installer and follow the instructions
4. Restart your terminal

### Option 2: Using Homebrew (if you have it installed)

```bash
brew install node
```

### Option 3: Using nvm (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

## Verify Installation

After installing Node.js, verify it's working:

```bash
node --version
npm --version
```

You should see version numbers for both commands.

## Running the Project

Once Node.js is installed, run these commands in your terminal:

```bash
cd /Users/katlegotshabangu/Projects/LiftMate
npm install
npm run dev
```

The development server will start and automatically open in your browser at `http://localhost:5173` (or similar port).

## Troubleshooting

- If `npm install` fails, try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again
- If the port is already in use, Vite will automatically use the next available port
- Make sure you're in the project directory when running the commands

