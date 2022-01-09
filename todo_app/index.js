const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  // when the browser window is closed, a "closed" event is sent and we should set the variable that is holding it to "null" so it can be garbage collected.
  addWindow.on('closed', () => addWindow = null);
}

// receive message from one browser window and send it to another browser winder
ipcMain.on('todo:add', (event, todo) => {
  mainWindow.webContents.send('todo:add', todo);
  // close add window, still references an object in memory, so we set up an event listener to null out "addWindow" so we can free the memory.
  addWindow.close();
});

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        // invoked when this button is clicked
        click() { createAddWindow(); }
      },
      {
        label: 'Clear Todos',
        // invoked when this button is clicked
        click() {
          mainWindow.webContents.send('todo:clear');
        }
      },
      {
        label: 'Quit',
        // short cuts declaration
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        // invoked when this button is clicked
        click() {
          app.quit();
        }
      }
    ]
  }
];

// process is a global variable that you get from node and .platform tells you what environment you are in, "darwin" is Mac OSX,
// Mac OSX is treated differently than windows when it comes to menus, the first menu value will not display correctly, so you add a "{}" first then add your menu labels
if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      // role gives us the menu option of reload, shortcut for common sub menu, comes preconfigured.
      { role: 'reload' },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
