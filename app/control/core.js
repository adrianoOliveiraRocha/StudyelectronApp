(function(global) {
  // Private variables
  let isLoggedIn = false;
  let currentUser = null;
  
  // Public API
  const CoreController = {
    isItLoged: function() {
      console.log('Checking login status...');
      return isLoggedIn;
    },
    
    login: async function(email, pwd) {
      try {
        if(email && pwd) {
          // console.log(`core:login; email: ${email}; pwd: ${pwd}`);
          const user = await window.userPreload.db_getUser(email, pwd);
        } else {
          return {success: false, message: 'Invalid credentials. Type the credentials correctly please!'};
        }
      } catch (error) {
        console.log(`Error in core.js / login: ${error}`)
      }      
    },
    
    logout: function() {
      isLoggedIn = false;
      currentUser = null;
      console.log('Logged out');
      return { success: true, message: 'Logged out successfully' };
    },
    
    getCurrentUser: function() {
      return currentUser;
    },
    
    onPageLoad: function(pageName) {
      console.log(`Page loaded: ${pageName}`);
    }
  };
  
  // Expose to global
  global.CoreController = CoreController;
  
})(window);