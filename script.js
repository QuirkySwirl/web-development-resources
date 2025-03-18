document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }

  // Resource data - inline to avoid CORS issues
  const resources = {
    "title": "Awesome Web Development Resources",
    "description": "This is an awesome project about Web Development resources.",
    "categories": [
      {
        "id": "hosting",
        "title": "Hosting",
        "icon": "fas fa-server",
        "resources": [
          {
            "url": "https://netlify.com",
            "name": "Netlify",
            "description": "Netlify unites an entire ecosystem of modern tools and services into a single, simple workflow for building high performance sites and apps."
          },
          {
            "url": "https://firebase.google.com",
            "name": "Firebase",
            "description": "Firebase helps you build and run successful apps. It is backed by Google and loved by app development teams - from startups to global enterprises"
          },
          {
            "url": "https://aws.amazon.com",
            "name": "Amazon Web Services",
            "description": "Amazon Web Services offers a broad set of global cloud-based products and services help organizations move faster, lower IT costs, and scale."
          },
          {
            "url": "https://pages.github.com",
            "name": "GitHub Pages",
            "description": "GitHub Pages are websites for you and your projects. It is hosted directly from your GitHub repository. You just have to edit, push, and your changes are live."
          },
          {
            "url": "https://vercel.com",
            "name": "Vercel",
            "description": "Vercel combines the best developer experience with an obsessive focus on end-user performance. It enables frontend teams to do their best work."
          },
          {
            "url": "https://surge.sh",
            "name": "Surge",
            "description": "Surge is static web publishing for Front-End Developers. It is simple, single-command web publishing. It publishes HTML, CSS, and JS for free."
          },
          {
            "url": "https://render.com",
            "name": "Render",
            "description": "Render is a unified cloud to build and run all your apps and websites with free TLS certificates, a global CDN, DDoS protection, and auto deploys from Git."
          },
          {
            "url": "https://docs.gitlab.com/ee/user/project/pages/",
            "name": "GitLab Pages",
            "description": "GitLab Pages - static websites directly from a repository in GitLab. To publish a website one can use any static site generator or HTML, CSS, and JavaScript."
          }
        ]
      },
      {
        "id": "learning-platforms",
        "title": "Learning Platforms",
        "icon": "fas fa-graduation-cap",
        "resources": [
          { 
            "url": "https://www.freecodecamp.org/", 
            "name": "freeCodeCamp",
            "description": "Learn to code at home. Build projects. Earn certifications. A nonprofit community helping millions of people learn to code for free."
          },
          { 
            "url": "https://www.lambdatest.com/learning-hub/", 
            "name": "LambdaTest Learning Hub",
            "description": "A comprehensive resource for developers to stay updated with the latest in testing, development, and technology."
          },
          { 
            "url": "https://codecademy.com", 
            "name": "Codecademy",
            "description": "Learn to code interactively, for free. Offering courses in 12 different programming languages including Python, Java, JavaScript, and more."
          },
          { 
            "url": "https://javascript30.com", 
            "name": "JavaScript30",
            "description": "A free 30-day vanilla JavaScript coding challenge. Build 30 things in 30 days with 30 tutorials by Wes Bos."
          },
          { 
            "url": "https://www.frontendmentor.io", 
            "name": "Frontend Mentor",
            "description": "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges."
          },
          { 
            "url": "https://testautomationu.applitools.com", 
            "name": "Test Automation University",
            "description": "Free online courses about test automation. Learn from the world's leading test automation experts."
          },
          { 
            "url": "https://www.coursera.org", 
            "name": "Coursera",
            "description": "Build skills with courses, certificates, and degrees online from world-class universities and companies."
          },
          { 
            "url": "https://www.edx.org/", 
            "name": "edX",
            "description": "Access 2000+ online courses from 140+ institutions. Learn computer science, data science, business and more."
          }
        ]
      },
      {
        "id": "coding-challenge-platforms",
        "title": "Coding Challenge Platforms",
        "icon": "fas fa-code",
        "resources": [
          { 
            "url": "https://www.codewars.com/", 
            "name": "Codewars",
            "description": "Achieve code mastery through challenge. Train on kata in the dojo and reach your highest potential."
          },
          { 
            "url": "https://topcoder.com", 
            "name": "TopCoder",
            "description": "A competitive programming platform and crowdsourcing marketplace for software development and data science challenges."
          },
          { 
            "url": "https://www.codingame.com/start", 
            "name": "CodinGame",
            "description": "Learn to code by playing games. Solve puzzles, code AI bots, learn from your peers, have fun."
          },
          { 
            "url": "https://hackerrank.com", 
            "name": "HackerRank",
            "description": "Practice coding, prepare for interviews, and get hired. Solve company interview questions and improve your coding skills."
          },
          { 
            "url": "https://projecteuler.net", 
            "name": "Project Euler",
            "description": "A series of challenging mathematical/computer programming problems that require creative problem-solving."
          },
          { 
            "url": "https://leetcode.com", 
            "name": "LeetCode",
            "description": "Enhance your skills, expand your knowledge and prepare for technical interviews with real interview questions."
          },
          { 
            "url": "https://exercism.org", 
            "name": "Exercism",
            "description": "Develop fluency in over 50 programming languages with thousands of exercises and mentored learning tracks."
          },
          { 
            "url": "https://codechef.com", 
            "name": "CodeChef",
            "description": "A competitive programming platform to help programmers enhance their skills and compete globally."
          }
        ]
      },
      {
        "id": "design-resources",
        "title": "Design Resources",
        "icon": "fas fa-paint-brush",
        "resources": [
          { 
            "url": "https://unsplash.com", 
            "name": "Unsplash",
            "description": "The internet's source of freely-usable images. Powered by creators everywhere."
          },
          { 
            "url": "https://coolors.co", 
            "name": "Coolors",
            "description": "The super fast color schemes generator. Create, browse and share beautiful color combinations for your designs."
          },
          { 
            "url": "https://fonts.google.com", 
            "name": "Google Fonts",
            "description": "A library of 1,000+ free licensed font families for use in your projects."
          },
          { 
            "url": "https://fontawesome.com", 
            "name": "Font Awesome",
            "description": "The web's most popular icon set and toolkit, used by millions of designers, developers, and content creators."
          },
          { 
            "url": "https://www.drawkit.com", 
            "name": "DrawKit",
            "description": "Beautiful, free illustrations. Updated weekly. Hand-drawn vector illustration and icon resources."
          },
          { 
            "url": "https://undraw.co/illustrations", 
            "name": "unDraw",
            "description": "Open-source illustrations for any idea you can imagine and create. A constantly updated collection of beautiful SVG images."
          },
          { 
            "url": "https://www.manypixels.co/gallery", 
            "name": "ManyPixels",
            "description": "Free illustration library with 2,500+ royalty-free illustrations for your design projects."
          },
          { 
            "url": "https://color.adobe.com", 
            "name": "Adobe Color",
            "description": "Create color themes and gradients, access your saved colors, and explore thousands of color combinations from the Adobe Color community."
          }
        ]
      },
      {
        "id": "development-tools",
        "title": "Development Tools",
        "icon": "fas fa-tools",
        "resources": [
          { 
            "url": "https://code.visualstudio.com/", 
            "name": "VS Code",
            "description": "A lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux."
          },
          { 
            "url": "https://github.com/", 
            "name": "GitHub",
            "description": "A platform for version control and collaboration for developers."
          },
          { 
            "url": "https://webpack.js.org/", 
            "name": "Webpack",
            "description": "A static module bundler for modern JavaScript applications."
          },
          { 
            "url": "https://babeljs.io/", 
            "name": "Babel",
            "description": "A JavaScript compiler that lets you use next generation JavaScript, today."
          },
          { 
            "url": "https://www.postman.com/", 
            "name": "Postman",
            "description": "The Collaboration Platform for API Development. Simplify each step of building an API and streamline collaboration."
          },
          { 
            "url": "https://git-scm.com/", 
            "name": "Git",
            "description": "A free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency."
          },
          { 
            "url": "https://prettier.io/", 
            "name": "Prettier",
            "description": "An opinionated code formatter that supports many languages and integrates with most editors."
          },
          { 
            "url": "https://eslint.org/", 
            "name": "ESLint",
            "description": "A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript."
          }
        ]
      },
      {
        "id": "css-frameworks",
        "title": "CSS Frameworks",
        "icon": "fab fa-css3-alt",
        "resources": [
          { 
            "url": "https://tailwindcss.com/", 
            "name": "Tailwind CSS",
            "description": "A utility-first CSS framework for rapidly building custom designs. Highly customizable and low-level."
          },
          { 
            "url": "https://getbootstrap.com/", 
            "name": "Bootstrap",
            "description": "The most popular HTML, CSS, and JS library in the world for building responsive, mobile-first projects."
          },
          { 
            "url": "https://bulma.io/", 
            "name": "Bulma",
            "description": "A free, open source CSS framework based on Flexbox. It's 100% responsive, fully modular, and comes with a beautiful design system."
          },
          { 
            "url": "https://materializecss.com/", 
            "name": "Materialize",
            "description": "A modern responsive CSS framework based on Material Design by Google."
          },
          { 
            "url": "https://get.foundation/", 
            "name": "Foundation",
            "description": "The most advanced responsive front-end framework in the world for enterprise-grade websites and applications."
          },
          { 
            "url": "https://semantic-ui.com/", 
            "name": "Semantic UI",
            "description": "A development framework that helps create beautiful, responsive layouts using human-friendly HTML."
          },
          { 
            "url": "https://chakra-ui.com/", 
            "name": "Chakra UI",
            "description": "A simple, modular and accessible component library that gives you the building blocks to build React applications."
          },
          { 
            "url": "https://windicss.org/", 
            "name": "Windi CSS",
            "description": "Next generation utility-first CSS framework, featuring an on-demand engine and extremely fast HMR."
          }
        ]
      },
      {
        "id": "javascript-frameworks",
        "title": "JavaScript Frameworks",
        "icon": "fab fa-js",
        "resources": [
          { 
            "url": "https://reactjs.org/", 
            "name": "React",
            "description": "A JavaScript library for building user interfaces. Declarative, component-based, learn once, write anywhere."
          },
          { 
            "url": "https://vuejs.org/", 
            "name": "Vue.js",
            "description": "An approachable, performant and versatile framework for building web user interfaces."
          },
          { 
            "url": "https://angular.io/", 
            "name": "Angular",
            "description": "A platform and framework for building single-page client applications using HTML and TypeScript."
          },
          { 
            "url": "https://svelte.dev/", 
            "name": "Svelte",
            "description": "A radical new approach to building user interfaces. Write less code and no virtual DOM."
          },
          { 
            "url": "https://nextjs.org/", 
            "name": "Next.js",
            "description": "The React Framework for Production. A framework for server-rendered or statically-exported React applications."
          },
          { 
            "url": "https://nuxtjs.org/", 
            "name": "Nuxt.js",
            "description": "The Intuitive Vue Framework. Build your next Vue.js application with confidence."
          },
          { 
            "url": "https://expressjs.com/", 
            "name": "Express",
            "description": "Fast, unopinionated, minimalist web framework for Node.js. A robust set of features for web and mobile applications."
          },
          { 
            "url": "https://www.gatsbyjs.com/", 
            "name": "Gatsby",
            "description": "A React-based open source framework for creating websites and apps. Build anything you can imagine with over 2000 plugins."
          }
        ]
      },
      {
        "id": "testing-tools",
        "title": "Testing Tools",
        "icon": "fas fa-vial",
        "resources": [
          { 
            "url": "https://jestjs.io/", 
            "name": "Jest",
            "description": "A delightful JavaScript Testing Framework with a focus on simplicity. Works with Babel, TypeScript, Node, React, Angular, and more."
          },
          { 
            "url": "https://www.cypress.io/", 
            "name": "Cypress",
            "description": "Fast, easy and reliable testing for anything that runs in a browser. End-to-end testing made simple."
          },
          { 
            "url": "https://mochajs.org/", 
            "name": "Mocha",
            "description": "A feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun."
          },
          { 
            "url": "https://www.chaijs.com/", 
            "name": "Chai",
            "description": "A BDD / TDD assertion library for node and the browser that can be paired with any JavaScript testing framework."
          },
          { 
            "url": "https://www.selenium.dev/", 
            "name": "Selenium",
            "description": "Automate web browsers across platforms. A tool for automating web applications for testing purposes."
          },
          { 
            "url": "https://testing-library.com/", 
            "name": "Testing Library",
            "description": "Simple and complete testing utilities that encourage good testing practices."
          },
          { 
            "url": "https://storybook.js.org/", 
            "name": "Storybook",
            "description": "An open source tool for developing UI components in isolation. Perfect for UI testing and development."
          },
          { 
            "url": "https://playwright.dev/", 
            "name": "Playwright",
            "description": "Reliable end-to-end testing for modern web apps. A framework for web testing and automation."
          }
        ]
      }
    ]
  };

  // Populate UI with data
  populateCategories(resources.categories);
  populateResources(resources.categories);
  setupEventListeners();
  
  // Set up event listeners
  function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        // Save preference to local storage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Update icon
        updateDarkModeIcon(isDarkMode);
      });
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterResources(searchTerm);
      });
    }
    
    // Category click handling
    document.addEventListener('click', function(event) {
      const categoryItem = event.target.closest('.category-item');
      if (categoryItem) {
        const categoryId = categoryItem.getAttribute('data-category');
        scrollToCategory(categoryId);
        
        // Mark active category
        document.querySelectorAll('.category-item').forEach(item => {
          item.classList.remove('active');
        });
        categoryItem.classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth <= 992) {
          sidebar.classList.remove('active');
        }
      }

      // Back to top button
      if (event.target.closest('.back-to-top')) {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Update dark mode icon based on current theme
  function updateDarkModeIcon(isDarkMode) {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
      const icon = darkModeToggle.querySelector('i');
      
      if (icon) {
        if (isDarkMode) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      }
    }
  }
  
  // Populate categories in the sidebar
  function populateCategories(categories) {
    const categoriesList = document.getElementById('categories-list');
    
    if (!categoriesList) return;
    
    // Clear existing categories
    categoriesList.innerHTML = '';
    
    // Loop through categories and create category items
    categories.forEach(category => {
      const categoryItem = document.createElement('div');
      categoryItem.classList.add('category-item');
      categoryItem.setAttribute('data-category', category.id);
      
      // Add icon and name
      categoryItem.innerHTML = `
        <span class="category-icon">
          <i class="${category.icon}"></i>
        </span>
        ${category.title}
      `;
      
      categoriesList.appendChild(categoryItem);
    });

    // Set first category as active by default
    if (categoriesList.firstChild) {
      categoriesList.firstChild.classList.add('active');
    }
  }
  
  // Populate resources in the main content
  function populateResources(categories) {
    const resourcesContainer = document.getElementById('resources-container');
    
    if (!resourcesContainer) return;
    
    // Clear existing resources
    resourcesContainer.innerHTML = '';
    
    // Loop through categories and create resource sections
    categories.forEach(category => {
      const sectionElement = document.createElement('div');
      sectionElement.classList.add('category-section');
      sectionElement.id = category.id;
      
      // Create section header
      const categoryHeader = document.createElement('div');
      categoryHeader.classList.add('category-header');
      
      const categoryTitle = document.createElement('h2');
      categoryTitle.classList.add('category-title');
      categoryTitle.textContent = category.title;
      
      const resourceCount = document.createElement('span');
      resourceCount.classList.add('resource-count');
      resourceCount.textContent = category.resources.length;
      
      categoryHeader.appendChild(categoryTitle);
      categoryHeader.appendChild(resourceCount);
      sectionElement.appendChild(categoryHeader);
      
      // Create resources grid
      const resourcesGrid = document.createElement('div');
      resourcesGrid.classList.add('resources-grid');
      
      // Add resources to grid
      category.resources.forEach(resource => {
        const cardElement = createResourceCard(resource, category.icon);
        resourcesGrid.appendChild(cardElement);
      });
      
      sectionElement.appendChild(resourcesGrid);
      
      // Add back to top link
      const backToTop = document.createElement('a');
      backToTop.classList.add('back-to-top');
      backToTop.href = '#';
      backToTop.innerHTML = '<i class="fas fa-arrow-up"></i> Back to top';
      
      sectionElement.appendChild(backToTop);
      resourcesContainer.appendChild(sectionElement);
    });
  }

  // Create a resource card
  function createResourceCard(resource, categoryIcon) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('resource-card');
    
    // Extract domain from URL for icons or as fallback
    const domain = new URL(resource.url).hostname.replace('www.', '');
    const domainParts = domain.split('.');
    const name = resource.name || domainParts[0];
    
    // Determine icon to use
    let iconClass = categoryIcon; // Default to category icon
    
    // Check if there's a brand icon for this domain
    const brandName = domainParts[0].toLowerCase();
    if (isFontAwesomeBrand(brandName)) {
      iconClass = `fab fa-${brandName}`;
    }
    
    // Card content
    cardElement.innerHTML = `
      <h3 class="resource-name">
        <span class="resource-icon"><i class="${iconClass}"></i></span>
        ${name}
      </h3>
      ${resource.description ? `<p class="resource-description">${resource.description}</p>` : ''}
      <a href="${resource.url}" class="resource-link" target="_blank">
        Visit Resource <i class="fas fa-external-link-alt"></i>
      </a>
    `;
    
    return cardElement;
  }
  
  // Check if a brand has a Font Awesome icon
  function isFontAwesomeBrand(brand) {
    // Common brands with Font Awesome icons
    const commonBrands = [
      'github', 'gitlab', 'bitbucket', 'npm', 'yarn', 'react', 'vue', 
      'angular', 'node', 'js', 'html5', 'css3', 'sass', 'less', 'bootstrap', 
      'aws', 'google', 'apple', 'microsoft', 'adobe', 'figma', 'sketch', 
      'trello', 'slack', 'jira', 'wordpress', 'wix', 'shopify', 'magento'
    ];
    
    return commonBrands.includes(brand);
  }

  // Filter resources based on search term
  function filterResources(searchTerm) {
    // Reset if search is empty
    if (searchTerm === '') {
      document.querySelectorAll('.category-section, .resource-card').forEach(el => {
        el.style.display = '';
      });
      document.querySelectorAll('.category-item').forEach(el => {
        el.style.display = '';
      });
      return;
    }
    
    // Get all resource sections
    const sections = document.querySelectorAll('.category-section');
    
    sections.forEach(section => {
      let sectionHasMatch = false;
      
      // Check section title
      const sectionTitle = section.querySelector('.category-title').textContent.toLowerCase();
      if (sectionTitle.includes(searchTerm)) {
        sectionHasMatch = true;
      }
      
      // Check resources within the section
      const cards = section.querySelectorAll('.resource-card');
      cards.forEach(card => {
        const resourceText = card.textContent.toLowerCase();
        
        if (resourceText.includes(searchTerm)) {
          card.style.display = '';
          sectionHasMatch = true;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show/hide the entire section based on matches
      section.style.display = sectionHasMatch ? '' : 'none';
    });
    
    // Update category visibility in sidebar
    updateCategoryVisibility();
  }
  
  // Update category visibility in sidebar based on search
  function updateCategoryVisibility() {
    const categories = document.querySelectorAll('.category-item');
    
    categories.forEach(category => {
      const categoryId = category.getAttribute('data-category');
      const categorySection = document.getElementById(categoryId);
      
      if (categorySection && categorySection.style.display !== 'none') {
        category.style.display = '';
      } else {
        category.style.display = 'none';
      }
    });
  }
  
  // Scroll to a specific category
  function scrollToCategory(categoryId) {
    const element = document.getElementById(categoryId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
});