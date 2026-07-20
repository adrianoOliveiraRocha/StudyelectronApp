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
    
    login: function(email, password) {
      console.log(`Login attempt: ${email}`);
      // Simple validation
      if (email && password) {
        isLoggedIn = true;
        currentUser = { email: email, name: email.split('@')[0] };
        return { success: true, message: `Welcome ${currentUser.name}!` };
      }
      return { success: false, message: 'Invalid credentials. Type the credentials correctly please!'};
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