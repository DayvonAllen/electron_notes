module.exports = [
  {
    label: 'Electron',
    submenu: [
      { label: 'Item 1'},
      { label: 'Item 2', submenu: [ { label: 'Sub Item 1'} ]},
      { label: 'Item 3'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo'},
      { role: 'redo'},
      { role: 'copy'},
      { role: 'paste'},
    ]
  },
  {
    label: 'Actions',
    submenu: [
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      },
      {
        role: 'toggleFullScreen'
      },
      {
        label: 'Greet',
        click: () => { console.log('Hello from Main Menu') },
        // not global, which means will only work when the app is in focus.
        accelerator: 'Shift+Alt+G'
      }
    ]
  }
]
