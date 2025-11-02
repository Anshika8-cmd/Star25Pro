// ===== VARIABLES =====
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const scrollTopBtn = document.getElementById('scrollTop');

// ===== HAMBURGER MENU TOGGLE =====
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== HEADER SCROLL BEHAVIOR =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for background
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }

    lastScroll = currentScroll;

    // Scroll to top button
    if (scrollTopBtn) {
        if (currentScroll > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

// ===== SCROLL TO TOP =====
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.scroll-animate');
animateElements.forEach(el => observer.observe(el));

// ===== CAROUSEL FUNCTIONALITY =====
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (carouselTrack) {
    const carouselItems = [
        {
            image: 'createteam.jpg',
            title: 'Create Team',
            description: 'You can easily create your fantasy cricket team by selecting players within the given budget.'
        },
        {
            image: 'easywithdrawl.jpg',
            title: 'Easy Withdrawal',
            description: 'You can easily withdraw your winnings through various payment methods available on the platform.'
        },
        {
            image: 'joinmaxtoearn.jpg',
            title: 'Join Maxium to Earn',
            description: 'As many contests you will join , you can win maximum amount from us daily.'
        },
        {
            image: 'extensivecontest.jpg',
            title: 'Select Extensive Contests',
            description: 'From big winnings to all hot contests are available to choose. You canfilter according to prize money and entry money.'
        },
        {
            image: 'viewallmatches.jpg',
            title: 'View All Matches',
            description: 'You can view all the ongoing and upcoming matches on homepage. ALl International, T20 leagues, Domestic Matches are available.'
        },
        
    ];

    // Duplicate items for infinite scroll effect
    const allItems = [...carouselItems, ...carouselItems];

    // Populate carousel
    allItems.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-item-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        carouselTrack.appendChild(carouselItem);
    });

    let currentIndex = 0;
    const itemsPerView = 4;
    const totalItems = allItems.length;
    const itemWidth = 100 / itemsPerView;

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Reset to beginning when reaching end
        if (currentIndex >= carouselItems.length) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentIndex = 0;
                carouselTrack.style.transform = `translateX(0%)`;
                setTimeout(() => {
                    carouselTrack.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500);
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });
    }

    // Auto-play carousel
    setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 3000);
}

// ===== FEATURES SECTION - IMAGE SWITCHING =====
const featureItems = document.querySelectorAll('.feature-item');
const featureImage = document.getElementById('featureImage');

if (featureItems.length > 0 && featureImage) {
    // Set first item as active
    featureItems[0].classList.add('active');

    featureItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            featureItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Change image
            const newImage = item.getAttribute('data-image');
            if (newImage) {
                featureImage.style.opacity = '0';
                setTimeout(() => {
                    featureImage.src = newImage;
                    featureImage.style.opacity = '1';
                }, 300);
            }
        });
    });
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Only prevent default for actual anchor links (not page links)
        if (targetId !== '#' && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// // ===== PARALLAX EFFECT FOR DOWNLOAD SECTION =====
// window.addEventListener('scroll', () => {
//     const parallaxText = document.querySelector('.download-text');
//     const parallaxImage = document.querySelector('.download-image');
    
//     if (parallaxText) {
//         const scrolled = window.pageYOffset;
//         const rate = scrolled * 0.15; // Slower speed for text
//         parallaxText.style.transform = `translateY(${rate}px)`;
//     }
    
//     if (parallaxImage) {
//         const scrolled = window.pageYOffset;
//         const rate = scrolled * -0.1; // Slower opposite direction for image
//         parallaxImage.style.transform = `translateY(${rate}px)`;
//     }
// });

console.log('Star25Pro Website Loaded Successfully! 🎯');
