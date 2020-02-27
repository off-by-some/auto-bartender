const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let url
if (process.env.NODE_ENV === 'production') {
  url = `file://${process.cwd()}/dist/index.html`
} else {
  url = 'http://localhost:3000/'
}

app.on('ready', () => {
  let window = new BrowserWindow({width: 800, height: 600})
  window.loadURL(url)
})