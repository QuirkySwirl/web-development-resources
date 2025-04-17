document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }

  // Fetch resource data from JSON file
  fetch('resources.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(resources => {
      // Populate UI with fetched data
      populateCategories(resources.categories);
      populateResources(resources.categories);
      setupEventListeners();
    })
    .catch(error => {
      console.error('Error fetching resources:', error);
      // Optionally display an error message to the user
      const resourcesContainer = document.getElementById('resources-container');
      if (resourcesContainer) {
        resourcesContainer.innerHTML = '<p class="error-message">Could not load resources. Please try again later.</p>';
      }
    });

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
      
      // Add icon and name, using a default icon if none is provided
      const iconClass = category.icon || 'fas fa-folder'; // Default icon
      categoryItem.innerHTML = `
        <span class="category-icon">
          <i class="${iconClass}"></i>
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
    
    // Determine icon to use, using a default icon if categoryIcon is missing
    let iconClass = categoryIcon || 'fas fa-folder'; // Default icon
    
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
