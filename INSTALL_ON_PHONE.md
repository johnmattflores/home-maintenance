# Install on Your Phone

Your House Maintenance Tracker is now a **Progressive Web App (PWA)** that can be installed on your phone like a native app!

## What You Get

✅ **App icon on home screen** - Just like a regular app
✅ **Works offline** - View your data even without internet
✅ **Full screen mode** - No browser bars
✅ **Fast loading** - Cached for instant access
✅ **Push notifications** (future feature)

## How to Install

### Option 1: Deploy to Vercel First (Recommended)

1. **Deploy your app to Vercel:**
   ```bash
   cd house-maintenance
   vercel
   ```

2. **You'll get a URL like:**
   ```
   https://house-maintenance-xyz.vercel.app
   ```

3. **Then follow the installation steps below** using your Vercel URL

---

### On iPhone/iPad (iOS/iPadOS)

1. **Open Safari** (must use Safari, not Chrome)
2. **Go to your deployed URL:**
   ```
   https://your-app.vercel.app
   ```
3. **Tap the Share button** (square with arrow pointing up)
4. **Scroll down and tap "Add to Home Screen"**
5. **Tap "Add"** in the top right
6. **Done!** The app icon appears on your home screen

**Icon on iOS:**
- Dark gray square with white house icon
- Name: "Maintenance" or "House Maintenance Tracker"

---

### On Android

1. **Open Chrome browser**
2. **Go to your deployed URL:**
   ```
   https://your-app.vercel.app
   ```
3. **Tap the menu (⋮)** in the top right
4. **Tap "Install app"** or "Add to Home screen"
5. **Tap "Install"**
6. **Done!** The app appears in your app drawer

**Alternative Android method:**
- Chrome will show a banner at the bottom: "Add House Maintenance to Home screen"
- Just tap "Add"

---

## Testing Locally Before Deployment

If you want to test the PWA features before deploying:

1. **Start the production server:**
   ```bash
   cd house-maintenance
   npm run build
   npm run start
   ```

2. **Find your computer's IP address:**
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` (look for inet)

3. **On your phone, open the browser and visit:**
   ```
   http://YOUR_COMPUTER_IP:3000
   ```
   Example: `http://192.168.1.100:3000`

4. **Follow the installation steps above**

**Note:** Your phone must be on the same WiFi network as your computer.

---

## Features After Installation

### Works Offline
- Once installed, the app caches pages
- You can view maintenance tasks and appliances even without internet
- Adding/editing requires internet (syncs when online)

### App-like Experience
- No browser bars
- Splash screen on startup
- Smooth, native-feeling navigation
- Shortcuts to specific pages

### Quick Access Shortcuts (Android)
- Long press the app icon
- Tap "Maintenance Tasks" or "Appliances"
- Opens directly to that page

---

## Updating the App

### Automatic Updates
- When you deploy a new version to Vercel
- Users get updates automatically on next visit
- Service worker updates in the background

### Manual Update
- Close and reopen the app
- New version loads automatically

---

## Uninstalling

### iPhone/iPad
1. Long press the app icon
2. Tap "Remove App"
3. Tap "Delete App"

### Android
1. Long press the app icon
2. Tap "App info"
3. Tap "Uninstall"

Or just drag to "Uninstall" like any other app.

---

## Troubleshooting

### "Add to Home Screen" doesn't appear
- **iOS:** Make sure you're using Safari, not Chrome
- **Android:** Make sure you're using Chrome or Edge
- Make sure the site is served over HTTPS (Vercel provides this automatically)

### App doesn't work offline
- Open the app at least once while online
- The service worker needs to cache files first
- Wait a few seconds, then go offline and try

### App looks different than in browser
- This is normal! PWA runs in "standalone" mode
- No browser UI (address bar, etc.)
- This is the intended app-like experience

### Icon doesn't show up
- The app uses a simple house icon
- If it shows blank, wait a minute and restart your phone
- Vercel deployment ensures proper icon display

---

## Requirements

### Minimum Requirements
- **iOS:** iOS 11.3 or newer (Safari)
- **Android:** Chrome 45 or newer
- **HTTPS:** Must be deployed (Vercel provides this)

### Recommended
- **iOS:** iOS 15 or newer
- **Android:** Android 10 or newer
- Stable internet for first install

---

## Next Steps

1. **Deploy to Vercel:**
   ```bash
   vercel
   ```

2. **Share the URL with yourself:**
   - Email it
   - Text it
   - Or use QR code generator

3. **Install on your phone** using steps above

4. **Enjoy!** Your home maintenance tracker is now a phone app

---

## Advanced: Custom Icon (Optional)

Want a custom icon? Replace these files in `/public`:

- `icon.svg` - Main app icon (any size)
- `icon-192.svg` - 192x192 icon
- `icon-512.svg` - 512x512 icon

Then rebuild and redeploy:
```bash
npm run build
vercel --prod
```

---

## Support

- App works on both iOS and Android
- Works on tablets too
- Even works on desktop (Chrome, Edge)

Your maintenance tracker is now fully installable! 📱
