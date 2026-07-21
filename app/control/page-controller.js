(function(global) {
  // Check if CoreController exists
  if (!global.CoreController) {
    console.error('CoreController not loaded!');
    return;
  }
  
  class PageController {
    constructor() {
      this.loadPage = this.loadPage.bind(this);
      
      // Define all pages here
      this.pages = {
        home: {
          title: 'Home',
          content: `
            <hr>
            <div class="card text-primary">
              <div class="card-body">
                <h3>Home</h3>
                <p>Welcome to the home page!</p>
                <button id="loginNavBtn" class="btn btn-primary">Go to Login</button>
                <button id="aboutNavBtn" class="btn btn-info">Go to About</button>
                <div id="homeMessage"></div>
              </div>
            </div>
            <hr>
          `,
          onLoad: function() {
            document.getElementById('loginNavBtn')?.addEventListener('click', () => {
              pageController.loadPage('login');
            });
            
            document.getElementById('aboutNavBtn')?.addEventListener('click', () => {
              pageController.loadPage('about');
            });
          }
        },
        
        login: {
          title: 'Login',
          content: `
            <hr>
            <div class="card">
              <div class="card-body">
                <h3>Login</h3>
                <form id="loginForm">
                  <div class="mb-3">
                    <label for="loginEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="loginEmail" placeholder="Enter email">
                  </div>
                  <div class="mb-3">
                    <label for="loginPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="loginPassword" placeholder="Enter password">
                  </div>
                  <button type="submit" class="btn btn-primary">Login</button>
                  <button type="button" id="backHomeFromLoginBtn" class="btn btn-secondary">Back Home</button>
                </form>
                <div id="loginMessage" class="mt-3"></div>
              </div>
            </div>
            <hr>
          `,
          onLoad: function() {
            document.getElementById('loginForm')?.addEventListener('submit', (e) => {
              e.preventDefault();
              const email = document.getElementById('loginEmail').value;
              const password = document.getElementById('loginPassword').value;
              
              const result = await global.CoreController.login(email, password);
              const messageDiv = document.getElementById('loginMessage');
              
              if (result.success) {
                console.log(result)
                messageDiv.innerHTML = 
                  `<div class="alert alert-success">${result.message}</div>`;
                // Update nav to show logged in state
                updateNavAfterLogin(true);
              } else {
                messageDiv.innerHTML = 
                  `<div class="alert alert-danger">${result.message}</div>`;
              }
            });
            
            document.getElementById('backHomeFromLoginBtn')?.addEventListener('click', () => {
              pageController.loadPage('home');
            });
          }
        },
        
        about: {
          title: 'About',
          content: `
            <hr>
            <div class="card">
              <div class="card-body">
                <h3>About</h3>
                <p>This is a desktop application built with Electron</p>
                <p>Version: 1.0.0</p>
                <button id="backHomeFromAboutBtn" class="btn btn-primary">Back Home</button>
                <button id="logoutFromAboutBtn" class="btn btn-danger">Logout</button>
                <div id="aboutMessage" class="mt-3"></div>
              </div>
            </div>
            <hr>
          `,
          onLoad: function() {
            document.getElementById('backHomeFromAboutBtn')?.addEventListener('click', () => {
              pageController.loadPage('home');
            });
            
            document.getElementById('logoutFromAboutBtn')?.addEventListener('click', () => {
              const result = global.CoreController.logout();
              const messageDiv = document.getElementById('aboutMessage');
              if (result.success) {
                messageDiv.innerHTML = 
                  `<div class="alert alert-info">${result.message}</div>`;
                updateNavAfterLogin(false);
                // Redirect to home after logout
                setTimeout(() => pageController.loadPage('home'), 500);
              }
            });
          }
        }
      };
      
      this.currentPage = null;
      this.contentArea = document.getElementById('content-area');
    }
    
    loadPage(pageName) {
      console.log(`Loading page: ${pageName}`);
      
      // Update active nav
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
          link.classList.add('active');
        }
      });
      
      const page = this.pages[pageName];
      if (page) {
        this.contentArea.innerHTML = page.content;
        this.currentPage = pageName;
        
        // Execute page-specific onLoad
        if (page.onLoad) {
          page.onLoad();
        }
        
        // Call CoreController
        if (global.CoreController && global.CoreController.onPageLoad) {
          global.CoreController.onPageLoad(pageName);
        }
      } else {
        this.contentArea.innerHTML = `
          <hr>
          <div class="card text-danger">
            <div class="card-body">
              <h3>Page Not Found</h3>
              <p>The page "${pageName}" does not exist.</p>
              <button id="goHomeBtn" class="btn btn-primary">Go Home</button>
            </div>
          </div>
          <hr>
        `;
        
        // Add event listener for the go home button
        setTimeout(() => {
          document.getElementById('goHomeBtn')?.addEventListener('click', () => {
            this.loadPage('home');
          });
        }, 0);
      }
    }
  }
  
  // Helper function to update navigation
  function updateNavAfterLogin(isLoggedIn) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const page = link.dataset.page;
      if (page === 'login') {
        if (isLoggedIn) {
          link.textContent = 'Logout';
          link.dataset.page = 'logout';
        } else {
          link.textContent = 'Login';
          link.dataset.page = 'login';
        }
      }
    });
  }
  
  // Create and expose instance
  const pageController = new PageController();
  global.pageController = pageController;
  global.loadPage = pageController.loadPage.bind(pageController);
  
})(window);