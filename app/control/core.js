'use strict'

const CoreController = {
  // Your existing methods
  isItLoged: function() {
    console.log('Checking login status...');
    // Your logic
  },
  
  login: function(email) {
    console.log(`Login attempt for: ${email}`);
    // Your login logic
    const message = document.getElementById('loginMessage');
    if (message) {
      message.innerHTML = `<div class="alert alert-info">Logging in: ${email}</div>`;
    }
    
    // Call Electron IPC
    if (window.electronAPI) {
      window.electronAPI.login(email).then(result => {
        if (message) {
          message.innerHTML = `<div class="alert alert-success">${result}</div>`;
        }
      });
    }
  },
  
  // Called when page loads
  onPageLoad: function(pageName) {
    console.log(`Page loaded: ${pageName}`);
    // Your page load logic
  }
};

// Make it globally available
window.CoreController = CoreController;