// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
        });
    }

    if (closeMobileMenu && mobileMenu) {
        closeMobileMenu.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    }

    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Product card hover effects and interactions
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add any hover animations here
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Quick Add') || button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a temporary notification
                const notification = document.createElement('div');
                notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
                notification.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-check-circle mr-2"></i>
                        <span>Added to cart!</span>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.classList.remove('translate-x-full');
                }, 10);
                
                // Animate out and remove
                setTimeout(() => {
                    notification.classList.add('translate-x-full');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 2000);
                
                // Update cart count
                const cartBadge = document.querySelector('.fa-shopping-cart').parentElement.querySelector('span');
                if (cartBadge) {
                    const currentCount = parseInt(cartBadge.textContent);
                    cartBadge.textContent = currentCount + 1;
                    
                    // Add bounce animation to cart icon
                    const cartIcon = document.querySelector('.fa-shopping-cart');
                    cartIcon.classList.add('animate-bounce');
                    setTimeout(() => {
                        cartIcon.classList.remove('animate-bounce');
                    }, 1000);
                }
            });
        }
    });

    // Wishlist functionality
    const heartButtons = document.querySelectorAll('.fa-heart');
    heartButtons.forEach(heart => {
        heart.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            heart.classList.toggle('text-red-500');
            heart.classList.toggle('text-gray-400');
            
            // Update wishlist count
            const wishlistBadge = document.querySelector('.fa-heart').parentElement.querySelector('span');
            if (wishlistBadge) {
                const currentCount = parseInt(wishlistBadge.textContent);
                const isAdding = heart.classList.contains('text-red-500');
                wishlistBadge.textContent = isAdding ? currentCount + 1 : Math.max(0, currentCount - 1);
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Implement search functionality here
                console.log('Searching for:', this.value);
            }
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('footer input[type="email"]');
    const newsletterButton = newsletterForm?.nextElementSibling;
    
    if (newsletterButton) {
        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterForm.value;
            
            if (email && email.includes('@')) {
                // Create success notification
                const notification = document.createElement('div');
                notification.className = 'fixed bottom-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
                notification.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-check-circle mr-2"></i>
                        <span>Successfully subscribed!</span>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.classList.remove('translate-x-full');
                }, 10);
                
                // Animate out and remove
                setTimeout(() => {
                    notification.classList.add('translate-x-full');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
                
                newsletterForm.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Category hover effects
    const categoryCards = document.querySelectorAll('.card.group');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Navigate to category page (placeholder)
            console.log('Navigating to category:', card.querySelector('h3').textContent);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Quantity selector functionality (for product detail page)
    const quantityMinusBtn = document.querySelector('.fa-minus');
    const quantityPlusBtn = document.querySelector('.fa-plus');
    const quantityDisplay = quantityMinusBtn?.parentElement?.querySelector('span');

    if (quantityMinusBtn && quantityDisplay) {
        quantityMinusBtn.addEventListener('click', function() {
            let current = parseInt(quantityDisplay.textContent);
            if (current > 1) {
                quantityDisplay.textContent = current - 1;
            }
        });
    }

    if (quantityPlusBtn && quantityDisplay) {
        quantityPlusBtn.addEventListener('click', function() {
            let current = parseInt(quantityDisplay.textContent);
            quantityDisplay.textContent = current + 1;
        });
    }

    // Product image gallery (for product detail page)
    const thumbnails = document.querySelectorAll('img[alt="Thumbnail"]');
    const mainImage = document.querySelector('img[alt="Product"]');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => {
                t.classList.remove('border-primary-500');
                t.classList.add('border-gray-200');
            });
            
            // Add active class to clicked thumbnail
            this.classList.add('border-primary-500');
            this.classList.remove('border-gray-200');
            
            // Update main image
            if (mainImage) {
                mainImage.src = this.src.replace('w=200', 'w=800');
            }
        });
    });

    // Chat button functionality
    const chatButton = document.querySelector('.fixed.bottom-6.right-6 button');
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            // Open chat widget (placeholder)
            alert('Chat feature would open here!');
        });
    }

    // Page navigation simulation
    window.showProductListing = function() {
        document.querySelector('main').style.display = 'none';
        document.getElementById('product-listing-page').classList.remove('hidden');
        window.scrollTo(0, 0);
    };

    window.showProductDetail = function() {
        document.querySelector('main').style.display = 'none';
        document.getElementById('product-detail-page').classList.remove('hidden');
        window.scrollTo(0, 0);
    };

    window.showHomepage = function() {
        document.querySelector('main').style.display = 'block';
        document.getElementById('product-listing-page').classList.add('hidden');
        document.getElementById('product-detail-page').classList.add('hidden');
        window.scrollTo(0, 0);
    };
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .btn-primary, .btn-secondary');
    animatedElements.forEach(el => observer.observe(el));
});
