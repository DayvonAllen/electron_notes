// Modules
const {app, BrowserWindow, session} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  secWindow = new BrowserWindow({
    width: 800, height: 600,
    x: 200, y: 200,
    webPreferences: {
      webPreferences: {
        // --- !! IMPORTANT !! ---
        // Disable 'contextIsolation' to allow 'nodeIntegration'
        // 'contextIsolation' defaults to "true" as from Electron v12
        contextIsolation: false,
        nodeIntegration: true
      },
      // allows you to sync your applications across multiple devices by using a custom session
      // this partition will save to disk
      // there are also memory partitions that get deleted when app is closed
      // if you don't put "persist:" in front of the session name, it will save in memory only.
      // will create partition if it doesn't already exist.
      partition: 'persist:part1'
    }
  })

  // default session(created by electron), shared by all browser windows
  // a session is the store of any content's data
  let ses = mainWindow.webContents.session
  let ses2 = secWindow.webContents.session
  // another way to get the default session
  let defaultSes = session.defaultSession

  // clears session data
  ses.clearStorageData()

  // console.log( Object.is(ses, customSes) )

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();
  secWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
  secWindow.on('closed',  () => {
    secWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
