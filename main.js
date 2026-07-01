const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const path = require('node:path');
const Database = require('./app/db/database.js');


//<DB>
ipcMain.handle('db:getUsers', async () => {
  try {
    return Database.getUsers();
  } catch (error) {
    console.error('Error in db:getUsers:', error);
    return [];
  }
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './config/preload.js')
    },
    // titleBarStyle: 'hidden'
  });

  win.loadFile('./app/views/core/index.html');
  win.setMenuBarVisibility(false);

}

app.whenReady().then(() => {

  ipcMain.handle('ping', () => {
    return 'pong';
  })

  createWindow();

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })

})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})