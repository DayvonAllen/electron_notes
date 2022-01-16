## Electron
- It's a platform for writing desktop apps by using tools, languages and  design patterns traditionally used for creating rich apps on the web.
- We can use web technology to create desktop apps.
- We can build websites that operate on a user's machine with higher level of access to the system resources than traditional web apps which are constrained to the browser context.
- Web apps cannot access your hard drive but desktop apps can, which is why it's sometimes better to make desktop apps than web apps.
- Can read any arbitrary file off the machine at any time.
- `Tray` - is an icon that shows on the OS for an app
- [More Information on Electron](https://www.electronjs.org/docs/latest/api/app)
---

## How Google Chrome Works
- Electron works almost the same as Google Chrome.
- There is a main `browser process`(shown as `google chrome` in your resource monitoring software) which is the box that contains all  the buttons to open, close and minimize the browser
- For every open tab a `child browser process`(shown as `google chrome helper` in your resource monitoring software)  is generated
- `child browser processes` are completely isolated from one another by being separate processes, this was done for security reasons, bug resilience and better encapsulation
  - it isolates tabs that may have issues from being able to affect other tabs and the OS overall.
- The `child browser processes` are so separate that they cannot communicate directly with the `browser process` or other `child browser processes`
- Child browser tabs are also known as `RendererProcess` or `RendererProcesses`(each show some webpage), they are spawned by the `Chrome App`(main `browser process`)
- These `processes` can only communicate using `Inter Process Communication(IPC)`
---

## How Does Electron Works?
- Under the hood, It makes use of the `Chromium` open source project which is what Google Chrome is built on top of.
- Works similar to how Google Chrome works.
- We create an object or process that spawns a main window and that window has some number of child processes as well.
- The job of each `RendererProcesses` is to show a separate window to the user in a desktop looking environment.
- Our electron app can have as many `RendererProcesses` as we wish, each of which will show a different window to the user.
- Communication between the `RendererProcesses` or windows is going to be handled by IPC.
- When we create an electron app two things happen:
  1. The `electron app` is created(made for free by the electron library)
  2. The `electron app` can then create a `MainWindow`(which is a browser window) after it boots up, we have to make it this window ourselves.
- So we are going to have two separate files initially:
  1. a `index.js` file that will be respsonsible for starting up the electron file
     - this file will be executed by our `electron runtime` inside of our terminal environment. 
     - we can write JS like we do in `node.js` in this `index.js` file.
  2. a `index.html` file that contains all of the form elements and all the form event handlers etc.
---

## History Of Electron
- it was made by `Github` in 2013.
- `Github` - a company involved in the management of code, not the creation of code.
  - it's based on the `git` version control system that is used to track changes in source code, merge different blobs of code and review changes in general.
- it was then used to create `Atom`(created by `Github` and was the first electron app), `VsCode`, `Slack`, `Discord` and many more desktop apps.
---

## Electron Lifecycle
- Everytime an app starts, this lifecycle happens:
  - Electron starts
  - App process is created
  - App is ready to start doing things
  - App closes down.
---

## Start Electron
- The `package.json` file should contain this script `"electron": "electron ."`:
```
{
  "name": "electron",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "electron": "electron ."
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/DayvonAllen/electron_notes.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/DayvonAllen/electron_notes/issues"
  },
  "homepage": "https://github.com/DayvonAllen/electron_notes#readme",
  "dependencies": {
    "electron": "^16.0.6"
  }
}

```
- Then you can type `npm run electron` to start the app.
- Load HTML into main window:
``` 
// this file contains all the logic pertaining to the electron side of things
// just concerned with creating windows and handling the electron side.
const electron = require("electron");

// get the 'electron app' so we can make windows
// app gives us a view into the electron lifecycle
const { app, BrowserWindow } = electron;

// we have to wait for an app ready event before we start doing stuff on our side.
// this is event based programming, we wait for an event, when that event occurs we execute code.
app.on("ready", () => {
  // create a browser window(this will be our main window), object is for configuration if you need it
  const mainWindow  = new BrowserWindow({});
  // tells the main window to load an HTML document when it starts
  // can be any valid url(ex. https://google.com) or a path to a document on our local filesystem
  // "__dirname" is global variable given by node.js which gives us our current working directory.
  // file: means use file protocol instead of http
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
```
---

## Installation Of Electron
- `npm install electron` - installs in a specific project
  - ***Must have node and npm install first***
  - `sudo npm install -g electron`(linux and Mac OSX) - installs globally so you can use it on your computer no matter what project you are in(you don't have to add as a dependency to your `package.json` in that case)
    - `npm install -g electron`(windows)
---