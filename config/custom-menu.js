const { app, BrowserWindow } = require('electron');

const CustomMenu = (() => {
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
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    }
  ];
  return {
    getTemplate() {
      return template;
    }
  }
})();



// Fix the typo here:
module.exports = CustomMenu;