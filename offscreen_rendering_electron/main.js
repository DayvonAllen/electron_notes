// Modules
const {app, BrowserWindow} = require('electron')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// disable GPU usage when rendering images or content and uses the CPU instead
// should use the GPU rendering if you have 3D CSS animations, if you are not using 3D animations you should use CPU rendering
app.disableHardwareAcceleration()

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    show: false,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      // renders content onto a browser window on a second thread, it's not visible(renders the web content offscreen).
      offscreen: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadURL('https://electronjs.org')

  let i = 1
  // get rendered content, dirty - size and bounds of the area rendered, image - a native image instance of the rendered content
  // this fires each and everytime the content rendered is changed
  mainWindow.webContents.on('paint', (e, dirty, image) => {

    let screenshot = image.toPNG()
    fs.writeFile( app.getPath('desktop') + `/screenshot_${i}.png`, screenshot, console.log )
    i++
  })

  mainWindow.webContents.on('did-finish-load', e => {
    console.log( mainWindow.getTitle() )

    mainWindow.close()
    mainWindow = null
  })

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  // mainWindow.on('closed',  () => {
  //   mainWindow = null
  // })
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
