// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create navigation menu
    createNavigation();
    
    // Handle navigation visibility on scroll
    handleNavigationOnScroll();
    
    // Handle mobile menu toggle
    handleMobileMenu();
});

// Create navigation menu
function createNavigation() {
    // Create navigation container
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top';
    nav.id = 'main-nav';
    
    // Create navigation content
    nav.innerHTML = `
        <div class="container">
            <a class="navbar-brand" href="#">CV Cá Nhân</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">Giới Thiệu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#skills">Kỹ Năng</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#experience">Kinh Nghiệm</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#education">Học Vấn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#projects">Dự Án</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Liên Hệ</a>
                    </li>
                </ul>
            </div>
        </div>
    `;
    
    // Add navigation to body
    document.body.insertBefore(nav, document.body.firstChild);
    
    // Add padding to body to account for fixed navbar
    document.body.style.paddingTop = '56px';
}

// Handle navigation visibility on scroll
function handleNavigationOnScroll() {
    const nav = document.getElementById('main-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide navigation based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scrolling down & past header
            nav.style.top = '-60px';
        } else {
            // Scrolling up
            nav.style.top = '0';
        }
        
        // Update active link based on scroll position
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Handle mobile menu toggle
function handleMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
} 