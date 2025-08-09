# Facebook Messenger Desktop - Installation Guide

This guide covers multiple installation methods for the Facebook Messenger Desktop application.

## 🌐 Option 1: Web Application (Recommended for Testing)

### Prerequisites
- Node.js 18+ and npm
- Git

### Steps
1. **Clone the repository** (after connecting to GitHub)
   ```bash
   git clone <your-github-repo-url>
   cd messenger-desktop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:8080 in your browser
   - The app will hot-reload as you make changes

### Building for Production
```bash
npm run build
npm run preview  # Preview the production build
```

## 🖥️ Option 2: Desktop Application (Electron)

### Prerequisites
- Node.js 18+ and npm
- Git

### Steps

1. **Install Electron dependencies**
   ```bash
   npm install --save-dev electron electron-builder
   npm install --save-dev concurrently wait-on
   ```

2. **Create Electron main process file**
   Create `electron/main.js`:
   ```javascript
   const { app, BrowserWindow } = require('electron');
   const path = require('path');
   const isDev = process.env.NODE_ENV === 'development';

   function createWindow() {
     const mainWindow = new BrowserWindow({
       width: 1200,
       height: 800,
       minWidth: 800,
       minHeight: 600,
       webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
         enableRemoteModule: false,
       },
       icon: path.join(__dirname, '../public/favicon.ico'),
       titleBarStyle: 'default',
       show: false
     });

     const url = isDev 
       ? 'http://localhost:8080' 
       : `file://${path.join(__dirname, '../dist/index.html')}`;
     
     mainWindow.loadURL(url);
     
     mainWindow.once('ready-to-show', () => {
       mainWindow.show();
     });

     if (isDev) {
       mainWindow.webContents.openDevTools();
     }
   }

   app.whenReady().then(createWindow);

   app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') {
       app.quit();
     }
   });

   app.on('activate', () => {
     if (BrowserWindow.getAllWindows().length === 0) {
       createWindow();
     }
   });
   ```

3. **Update package.json**
   Add these scripts and configuration:
   ```json
   {
     "main": "electron/main.js",
     "scripts": {
       "electron": "NODE_ENV=development electron .",
       "electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:8080 && electron .\"",
       "build:electron": "npm run build && electron-builder",
       "dist": "npm run build && electron-builder --publish=never"
     },
     "build": {
       "appId": "com.yourname.messenger-desktop",
       "productName": "Messenger Desktop",
       "directories": {
         "output": "release"
       },
       "files": [
         "dist/**/*",
         "electron/**/*",
         "node_modules/**/*"
       ],
       "linux": {
         "target": [
           {
             "target": "AppImage",
             "arch": ["x64"]
           },
           {
             "target": "deb",
             "arch": ["x64"]
           },
           {
             "target": "rpm",
             "arch": ["x64"]
           }
         ],
         "category": "Network"
       }
     }
   }
   ```

4. **Development with Electron**
   ```bash
   npm run electron-dev
   ```

5. **Build desktop packages**
   ```bash
   npm run dist
   ```

## 📦 Option 3: Linux Package Installation

### From Pre-built Packages (After Building)

#### AppImage (Universal Linux)
```bash
# Download the AppImage file
chmod +x Messenger-Desktop-*.AppImage
./Messenger-Desktop-*.AppImage
```

#### Ubuntu/Debian (.deb)
```bash
sudo dpkg -i messenger-desktop_*.deb
sudo apt-get install -f  # Fix dependencies if needed
```

#### Fedora/RHEL (.rpm)
```bash
sudo rpm -i messenger-desktop-*.rpm
# or
sudo dnf install messenger-desktop-*.rpm
```

#### Flatpak (Future Enhancement)
```bash
# After creating Flatpak manifest
flatpak install messenger-desktop.flatpak
flatpak run com.yourname.messenger-desktop
```

## 🌍 Option 4: Deploy to Web (Lovable Platform)

### Using Lovable's Built-in Deployment
1. Click the **Publish** button in the Lovable editor
2. Your app will be deployed to `yourapp.lovable.app`
3. Share the URL with users

### Custom Domain (Paid Plan Required)
1. Go to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow DNS configuration instructions
4. Your app will be available at your custom domain

## 🔗 Option 5: GitHub Integration & Self-Hosting

### Connect to GitHub
1. Click **GitHub** → **Connect to GitHub** in Lovable
2. Authorize the Lovable GitHub App
3. Create repository

### Deploy to Popular Platforms

#### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
```

#### Vercel
```bash
npx vercel --prod
```

#### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🛠️ Configuration & Customization

### Environment Variables
Create `.env` file (for self-hosting):
```env
VITE_APP_NAME=Messenger Desktop
VITE_API_URL=your-api-endpoint
```

### Customizing the App
- **Colors**: Edit `src/index.css` design system variables
- **Features**: Modify components in `src/components/`
- **Data**: Replace mock data in `MessengerApp.tsx` with real API calls

## 🔧 Development Setup

### Required Tools
- **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Install via package manager
- **VS Code** (recommended): For development

### Ubuntu/Debian
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

### Fedora
```bash
sudo dnf install nodejs npm git
```

### Arch Linux
```bash
sudo pacman -S nodejs npm git
```

## 🚀 Next Steps

1. **Add Real Facebook Integration**
   - Implement Facebook Graph API
   - Add OAuth authentication
   - Handle real-time messaging

2. **Enhanced Features**
   - System tray integration
   - Desktop notifications
   - Offline message queuing
   - Voice/video calling

3. **Distribution**
   - Create proper app signing certificates
   - Set up auto-updater
   - Publish to software repositories

## 📞 Support

- **Lovable Discord**: [Join Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Documentation**: [docs.lovable.dev](https://docs.lovable.dev/)
- **Issues**: Report bugs in the GitHub repository

## 📄 License

Open source project - see LICENSE file for details.