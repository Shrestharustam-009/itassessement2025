document.addEventListener('DOMContentLoaded', function() {

    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // --- Shopping Cart Elements ---
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const headerCartCountSpan = document.getElementById('cart-count'); // For total items in header
    const headerCartAmountSpan = document.getElementById('cart-amount'); // For total amount in header
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.querySelector('.close-cart-button');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const modalCartTotalSpan = document.getElementById('total-price'); // For total amount in modal
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn'); // Select all add to cart buttons

    
    let cart = []; 


    function formatCurrency(amount) {
        return `Rs ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }


    function updateHeaderCartDisplay() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        headerCartCountSpan.textContent = totalItems;
        headerCartAmountSpan.textContent = formatCurrency(totalAmount);


        if (totalItems > 0) {
            headerCartCountSpan.style.display = 'block';
            headerCartAmountSpan.style.display = 'block';
        } else {
            headerCartCountSpan.style.display = 'none';
            headerCartAmountSpan.style.display = 'none';
        }
    }


    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; 

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            return;
        }

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.thumbnail}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${formatCurrency(item.price)}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="decrease-quantity-btn" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity-btn" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });


        cartItemsContainer.querySelectorAll('.increase-quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const item = cart.find(i => i.id === id);
                if (item) {
                    item.quantity++;
                    
                    renderCartItems(); // Re-render to update quantities
                    updateHeaderCartDisplay(); // Update header
                    modalCartTotalSpan.textContent = formatCurrency(cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)); // Update modal total
                }
            });
        });

        cartItemsContainer.querySelectorAll('.decrease-quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const itemIndex = cart.findIndex(i => i.id === id);
                if (itemIndex > -1) {
                    if (cart[itemIndex].quantity > 1) {
                        cart[itemIndex].quantity--;
                    } else {
                        cart.splice(itemIndex, 1); // Remove if quantity becomes 0
                    }
                    // If using localStorage: localStorage.setItem('fitnessShopCart', JSON.stringify(cart));
                    renderCartItems(); // Re-render
                    updateHeaderCartDisplay(); // Update header
                    modalCartTotalSpan.textContent = formatCurrency(cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)); // Update modal total
                }
            });
        });

        cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                cart = cart.filter(item => item.id !== id);
                // If using localStorage: localStorage.setItem('fitnessShopCart', JSON.stringify(cart));
                renderCartItems(); // Re-render
                updateHeaderCartDisplay(); // Update header
                modalCartTotalSpan.textContent = formatCurrency(cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)); // Update modal total
            });
        });
    }

    // --- Add to Cart Functionality ---

    // Event listener for "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent any parent click listeners (e.g., for lightbox if it were present)
            const productId = this.dataset.id;
            // Find the closest food-card ancestor to get product details
            const foodCard = this.closest('.food-card');

            if (foodCard) {
                const productName = foodCard.querySelector('.food-name').textContent;
                // Parse price, removing "Rs" and converting to number
                const productPriceText = foodCard.querySelector('.food-price').textContent;
                const productPrice = parseFloat(productPriceText.replace('Rs', '').trim());
                const productThumbnail = foodCard.querySelector('.food-image').src;

                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        thumbnail: productThumbnail,
                        quantity: 1
                    });
                }
                // If using localStorage: localStorage.setItem('fitnessShopCart', JSON.stringify(cart));

                updateHeaderCartDisplay(); // Update header cart display
                console.log('Current Cart State:', cart); // For debugging
                // Using alert for simplicity, consider a custom, more professional modal for "Added to cart!"
                alert(`${productName} added to cart! Total items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`);
            }
        });
    });

    // Event listener to open cart modal
    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', function() {
            cartModal.classList.add('active'); // Use class for showing/hiding
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            renderCartItems(); // Render items every time cart is opened
            modalCartTotalSpan.textContent = formatCurrency(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)); // Update modal total
        });
    }

    // Event listener to close cart modal
    if (closeCartButton) {
        closeCartButton.addEventListener('click', function() {
            cartModal.classList.remove('active'); // Use class for showing/hiding
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close cart modal when clicking outside content (on the modal overlay itself)
    if (cartModal) {
        cartModal.addEventListener('click', function(event) {
            // Check if the click target is the modal itself, not its content
            if (event.target === cartModal) {
                cartModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close cart modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && cartModal.classList.contains('active')) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initial update of cart display on page load
    updateHeaderCartDisplay();
});
