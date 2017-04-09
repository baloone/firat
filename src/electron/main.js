const {app, BrowserWindow} = require ("electron")
const path = require ("path")
const srcDir = path.dirname (__dirname)

require ("electron-reload") (srcDir, {
    electron: path.join (path.dirname (srcDir), "node_modules", ".bin", "electron"),
})

let mainWindow

app.on ("ready", () => {
    BrowserWindow.addDevToolsExtension (path.join (__dirname, "exts", "vue"))

    mainWindow = new BrowserWindow ({width: 800, height: 600, backgroundColor: "#f1f1f1"})
    mainWindow.loadURL (`file://${__dirname}/../dist/index.html`)
})
