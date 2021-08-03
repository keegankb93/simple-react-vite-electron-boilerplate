const { app, BrowserWindow, ipcMain } = require("electron");
const { join, resolve } = require("path");
const { insertTitle, fetchTable } = require("../../common/dist/database.js");
const isDevelopment = process.env.NODE_ENV === "development";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: resolve(join(__dirname, "../../preload/dist/preload.js")),
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  }).once("ready-to-show", () => {
    win.show();
  });
  if (isDevelopment) {
    win.loadURL("http://localhost:3000");
    win.webContents.toggleDevTools();
  } else {
    win.loadFile(resolve(__dirname, "../../renderer/dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("test", async (event, data) => {
  return "datachunk returned from main to app";
});

ipcMain.handle("fetch-database", async (event, data) => {
  return await fetchTable(data);
});

ipcMain.handle("insert-database", async (event, data) => {
  console.log(data);
  return await insertTitle(data.title);
});
