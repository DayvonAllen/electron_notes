// Modules
const {app, BrowserWindow, webContents} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x: 100, y: 100,
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
  // mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  let wc = mainWindow.webContents

  wc.on('context-menu', (e, params) => {
    let selectedText = params.selectionText
    wc.executeJavaScript(`alert("${selectedText}")`)
  })

  // instance events
  // wc.on('media-started-playing', () => {
  //   console.log('Video Started')
  // })
  // wc.on('media-paused', () => {
  //   console.log('Video Paused')
  // })

  // wc.on('login', (e, request, authInfo, callback) => {
  //   console.log('Logging in:')
  //   callback('user', 'passwd')
  // })
  // We use this to get the response status and body when a user tries to authenticate with a server
  // this fire immediately after a link is clicked or after content is loaded
  // wc.on('did-navigate', (e, url, statusCode, message) => {
  //   console.log(`Navigated to: ${url}`)
  //   console.log(statusCode)
  // })

  // wc.on('new-window', (e, url) => {
  // prevents the default behavior of opening a new window when clicking a URL
  //   e.preventDefault()
  //   console.log(`Preventing new window for: ${url}`)
  // })

  // wc.on('before-input-event', (e, input) => {
  //   console.log(`${input.key} : ${input.type}`)
  // })

  // fires whenever everything has loaded including images
  // wc.on('did-finish-load', () => {
  //   console.log('Content fully loaded')
  // })
  // structure of html is ready at this point(images may not be loaded at this point)
  // wc.on('dom-ready', () => {
  //   console.log('DOM Ready')
  // })

  // Listen for window being closed
  mainWindow.on('closed',  () => {
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
