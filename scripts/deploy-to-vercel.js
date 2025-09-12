#!/usr/bin/env node

/**
 * Vercel Deployment Helper Script
 * This script helps prepare your app for Vercel deployment
 */

const fs = require("fs");
const path = require("path");

console.log("🚀 Vercel Deployment Preparation Script");
console.log("=====================================\n");

// Check if required files exist
const requiredFiles = [
  "package.json",
  "next.config.ts",
  "src/app/layout.tsx",
  "src/app/page.tsx",
];

console.log("📋 Checking required files...");
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
});

// Check package.json scripts
console.log("\n📦 Checking package.json scripts...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const requiredScripts = ["build", "start"];

  requiredScripts.forEach((script) => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
    } else {
      console.log(`❌ ${script} script missing`);
    }
  });
} catch (error) {
  console.log("❌ Error reading package.json");
}

// Environment variables checklist
console.log("\n🔐 Environment Variables Checklist:");
const envVars = [
  "MONGODB_URI",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "ADMIN_EMAIL",
  "MAIL_USER",
  "MAIL_PASS",
];

envVars.forEach((envVar) => {
  console.log(`□ ${envVar}`);
});

console.log("\n📝 Next Steps:");
console.log("1. Set up MongoDB Atlas cluster");
console.log("2. Create Gmail App Password");
console.log("3. Push code to GitHub");
console.log("4. Connect repository to Vercel");
console.log("5. Set environment variables in Vercel dashboard");
console.log("6. Deploy!");

console.log("\n📚 For detailed instructions, see VERCEL_DEPLOYMENT.md");
console.log("\n🎉 Ready for deployment!");
