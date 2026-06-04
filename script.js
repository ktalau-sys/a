/* ============================================
   ALLO LAWYERS WEBSITE - JAVASCRIPT
   ============================================ */

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// LANGUAGE SWITCHER
// ============================================

const langButtons = document.querySelectorAll('.lang-btn');
const translations = {
    en: {
        about: 'About',
        practice: 'Practice',
        team: 'Team',
        news: 'News & Insights',
        contact: 'Contact',
        welcome: 'Welcome to ALLO Lawyers',
        tagline: 'Your trusted partner in cryptocurrency, blockchain, and financial services',
        getInTouch: 'Get in Touch',
        aboutHeading: 'About ALLO',
        aboutText: 'Andy Lau Law Office (ALLO) is a Hong Kong boutique law firm dedicated to providing exceptional legal and professional services to international clients. We specialize in cutting-edge areas of law including cryptocurrency, blockchain, Web3, and financial regulation.',
    },
    zh: {
        about: '关于',
        practice: '业务范围',
        team: '团队',
        news: '新闻&洞察',
        contact: '联系',
        welcome: '欢迎来到ALLO律师事务所',
        tagline: '您在加密货币、区块链和金融服务方面的可信赖合作伙伴',
        getInTouch: '联系我们',
        aboutHeading: '关于ALLO',
        aboutText: 'Andy Lau Law Office (ALLO)是一家香港精品律师事务所，致力于为国际客户提供卓越的法律和专业服务。我们专门从事包括加密货币、区块链、Web3和金融监管在内的前沿法律领域。',
    }
};

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedLang = button.getAttribute('data-lang');
        
        // Update active button
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update page content (simplified)
        updateLanguage(selectedLang);
        
        // Store preference
        localStorage.setItem('preferred-language', selectedLang);
    });
});

function updateLanguage(lang) {
    console.log('Language switched to:', lang);
}

// Set initial language preference
const savedLang = localStorage.getItem('preferred-language') || 'en';
const activeLangBtn = document.querySelector(`[data-lang="${savedLang}"]`);
if (activeLangBtn) {
    activeLangBtn.click();
}

// ============================================
// SMOOTH SCROLL BEHAVIOR (FALLBACK)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        showNotification('Thank you for your message. We will get back to you soon!', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#FF8C42' : '#333'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.about-card, .practice-card, .team-card, .news-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// ANIMATIONS KEYFRAMES (CSS IN JS)
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} ALLO Lawyers. All rights reserved.`;
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInUp 0.6s ease';
});

// ============================================
// PRINT CONSOLE MESSAGE
// ============================================

console.log('%c Welcome to ALLO Lawyers', 'font-size: 20px; color: #FF8C42; font-weight: bold;');
console.log('%c Hong Kong Boutique Law Firm', 'font-size: 14px; color: #E67E22;');