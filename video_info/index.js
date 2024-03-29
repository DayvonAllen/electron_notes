// deprecated, old version of electron.js
const electron = require('electron');
// "ffmpeg" is a command line tool used to work with video and audio files, must install on your computer
// can convert video files, can merge audio and video files.
// can use it to query for the duration of a video file
// "fluent-ffmpeg" makes working with "ffmpeg" easier with node.js, it's just a wrapper around "ffmpeg"
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// main electron app IPC
ipcMain.on('video:submit', (event, path) => {
  // ffprobe, reads a files metadata
  ffmpeg.ffprobe(path, (err, metadata) => {
    // this "<browser_window_name>.webContents.send()" allows you to send events to rendererProcesses from the electron App
    mainWindow.webContents.send(
      'video:metadata',
      metadata.format.duration
    );
  });
});
