const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      // when you click away from an app, chromium is going to start throttling js in the app, 
      // this causes unexpected behavior, so we have to do "backgroundThrottling: false" in order to prevent that behavior
      webPreferences: { backgroundThrottling: false }
    });

    this.loadURL(url);
    // this makes sure that the app disappears when you click away from it.
    this.on('blur', this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
