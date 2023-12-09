const { app, BrowserWindow, screen } = require("electron");
const path= require("path");
const isDevelopment = false;//开发插件功能的时候设置为true
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
function createWindow() {
  const win = new BrowserWindow({
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      icon: path.join(__dirname, '../build/icons/food.png'),     // 打包显示图标
      nodeIntegration: true,//开启node功能
    }
  });
  if (isDevelopment) {         // 测试项目打包路径
    win.loadURL(path.join(__dirname, '/index.html'));
    win.webContents.openDevTools();
  } else {                    // 正式打包:线上首次加载页url
    // win.loadURL("http://10.168.11.94:211/#/login");
    win.loadURL("http://10.70.19.218/#/login");
   
  }
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
