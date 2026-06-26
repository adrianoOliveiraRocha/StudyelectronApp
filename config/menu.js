const { app, BrowserWindow } = require('electron');

const template = [
  {
    label: 'User',
    submenu: [
      {
        label: 'User',
        submenu: [
          {
            label: 'Show All',
            click: () => {
              console.log("Show All Users");
            }
          },

          {
            label: 'Save',
            click: () => {
              console.log("Save User");
            }
          },

          {
            label: 'Find',
            click: () => {
              console.log("Find User");
            }
          },
          {
            label: 'Delete',
            click: () => {
              console.log("Delete a Users");
            }
          }
        ]
      },
      {
        label: 'Open File',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          console.log("Open File");
        }
      },
      { type: 'separator' },
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Custom',
    submenu: [
      {
        label: 'Ping',
        click: () => {
          // Send ping to renderer
          const win = BrowserWindow.getFocusedWindow();
          if (win) {
            win.webContents.send('ping-from-menu');
          }
        }
      }
    ]
  }
];

// Fix the typo here:
module.exports = template;  // Was: module.exposts = template;