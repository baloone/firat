const {app, BrowserWindow} = require ("electron")
const path = require ("path")
const srcDir = path.dirname (__dirname)

require ("electron-reload") (srcDir, {
    electron: path.join (path.dirname (srcDir), "node_modules", ".bin", "electron"),
})

let mainWindow

app.on ("ready", () => {
    BrowserWindow.addDevToolsExtension (path.join (__dirname, "exts", "vue"))

    mainWindow = new BrowserWindow ({
        center: true,
        frame: false,
        minWidth: 300,
        minHeight:  530,
    })
    mainWindow.toggleDevTools ()
    mainWindow.setMenu (null)
    mainWindow.loadURL (`file://${__dirname}/../dist/index.html`)
})
