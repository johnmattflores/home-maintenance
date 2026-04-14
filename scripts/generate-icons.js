// Simple icon generation script
// Run this with: node scripts/generate-icons.js
// Or just use the SVG icon which works for PWA

const fs = require('fs');
const path = require('path');

const iconSVG = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1e293b"/>
  <path d="M256 80L120 200V432H200V320H312V432H392V200L256 80Z" fill="white"/>
  <rect x="140" y="380" width="40" height="40" fill="#1e293b"/>
  <rect x="210" y="380" width="40" height="40" fill="#1e293b"/>
  <rect x="332" y="380" width="40" height="40" fill="#1e293b"/>
</svg>`;

// Save as both 192 and 512 (they'll be the same SVG)
fs.writeFileSync(path.join(__dirname, '../public/icon-192.svg'), iconSVG);
fs.writeFileSync(path.join(__dirname, '../public/icon-512.svg'), iconSVG);

console.log('✅ Icons generated! (SVG format works for PWA)');
console.log('Note: For production, consider using a tool like sharp or imagemagick to convert to PNG');
