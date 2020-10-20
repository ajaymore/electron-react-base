const { app, BrowserWindow } = require("electron");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");
const { ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

db.serialize(function () {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
    console.log(row.id + ": " + row.info);
  });
});

db.close();

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }

  ipcMain.on("RENDERER_MESSAGE", (event, arg) => {
    console.log(event, arg);
    win.webContents.send("MAIN_STATE_UPDATE", "Received and noted!");
  });
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
