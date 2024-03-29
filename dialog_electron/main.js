// Modules
const {app, BrowserWindow, dialog} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

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

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', () => {

    // dialog for selecting a photo
    // dialog.showOpenDialog({
    //   buttonLabel: 'Select a photo',
    //   defaultPath: app.getPath('desktop'),
    //   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    // }).then( result => {
    //   console.log(result)
    // })

    // saves a new file
    // dialog.showSaveDialog({}).then( result => {
    //   console.log(result)
    // })

    const answers = ['Yes', 'No', 'Maybe']

    // prompts a choice from options
    dialog.showMessageBox({
      title: 'Message Box',
      message: 'Please select an option',
      detail: 'Message details.',
      buttons: answers
    }).then( result => {
      console.log(`User selected: ${answers[result.response]}`)
    })

  })

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
