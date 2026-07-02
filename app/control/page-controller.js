// ============ PAGE CONTROLLER ============
class PageController {
  constructor() {
    this.pages = {
      home: {
        title: 'Home',
        content: `
          <hr>
          <div class="card text-primary">
            <div class="card-body">
              <h3>Home</h3>
              <p>Welcome to the home page!</p>
              <button id="homeBtn" class="btn btn-primary">Home Action</button>
            </div>
          </div>
          <hr>
        `,
        onLoad: function() {
          document.getElementById('homeBtn')?.addEventListener('click', () => {
            alert('Home button clicked!');
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
                  <label>Email</label>
                  <input type="email" class="form-control" id="loginEmail">
                </div>
                <div class="mb-3">
                  <label>Password</label>
                  <input type="password" class="form-control" id="loginPassword">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
              <div id="loginMessage"></div>
            </div>
          </div>
          <hr>
        `,
        onLoad: function() {
          document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            // Call your login logic
            CoreController.login(email);
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
              <button id="aboutBtn" class="btn btn-info">About Action</button>
              <div id="aboutMessage"></div>
            </div>
          </div>
          <hr>
        `,
        onLoad: function() {
          document.getElementById('aboutBtn')?.addEventListener('click', () => {
            document.getElementById('aboutMessage').innerHTML = 
              '<div class="alert alert-success">About button clicked!</div>';
          });
        }
      }
    };
    
    this.currentPage = null;
    this.contentArea = document.getElementById('content-area');
  }
  
  loadPage(pageName) {
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
      
      // Call CoreController if needed
      if (window.CoreController && window.CoreController.onPageLoad) {
        window.CoreController.onPageLoad(pageName);
      }
    } else {
      this.contentArea.innerHTML = '<h1>Page not found</h1>';
    }
  }
  
  // Method to register new pages dynamically
  registerPage(name, config) {
    this.pages[name] = config;
  }
}

// Create global instance
const pageController = new PageController();