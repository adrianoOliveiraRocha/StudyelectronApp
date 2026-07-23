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
          let result = await window.userPreload.db_getUser(email, pwd);
          if(result.length) {
            return {success: true, message: 'Ok', user: result[0]};
          } else {
            return {success: false, message: 'Invalid credentials. Type the credentials correctly please!', user: null}
          }          
        } 
      } catch (error) {
        console.log(error);
        return {success: false, message: 'Error', error};
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