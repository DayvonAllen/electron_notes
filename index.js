// this file contains all the logic pertaining to the electron side of things
// just concerned with creating windows and handling the electron side.
const electron = require("electron");

// get the 'electron app' so we can make windows
// app gives us a view into the electron lifecycle
const { app } = electron;

// we have to wait for an app ready event before we start doing stuff on our side.
// this is event based programming, we wait for an event, when that event occurs we execute code.
app.on("ready", () => {
    console.log("App is now ready")
})