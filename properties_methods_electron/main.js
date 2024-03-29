// Modules
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    minWidth: 300, minHeight: 150,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  secWindow = new BrowserWindow({
    width: 700, height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  secWindow.on('closed', () => {
    mainWindow.maximize()
  })

  // instance events
  // will fire when mainWindow is focused
  // mainWindow.on('focus', () => {
  //   console.log('Main win focused')
  // })
  // will fire when secWindow is focused
  // secWindow.on('focus', () => {
  //   console.log('Second win focused')
  // })
  // will fire whenever any window is focused
  // app.on('browser-window-focus', () => {
  //   console.log('App focused')
  // })
  // returns an array with all the current windows
  // console.log(BrowserWindow.getAllWindows())

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    // set to null so it can be garbage collected
    mainWindow = null
  })
  secWindow.on('closed',  () => {
    mainWindow = null
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
