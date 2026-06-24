const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('corepreloads', {
  firstFunction: () => {
    return "my fist core function"
  },

  secondCoreFunction: () => {
    return "BNB can be good to me"
  }
})