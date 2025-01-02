// Function to display random ads
window.addEventListener('load', function() {
    if (typeof initAdCommunication === 'function') {
        initAdCommunication();
    }
});

// Call displayRandomAd when the page loads
window.addEventListener('load', displayRandomAd);

// Refresh ads every 30 seconds
setInterval(displayRandomAd, 30000);

// Function to update cart item quantity
function updateCartItemQuantity(productId, quantity) {
    // Implement quantity update functionality here
    console.log(`Updating quantity for product ${productId} to ${quantity}`);
    // You can use AJAX to send this information to the server
}

// Function to remove item from cart
function removeFromCart(productId) {
    // Implement remove from cart functionality here
    console.log(`Removing product ${productId} from cart`);
    // You can use AJAX to send this information to the server
}

// Add event listeners for quantity update and remove buttons
document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('.cart-quantity');
    const removeButtons = document.querySelectorAll('.remove-from-cart');

    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.dataset.productId;
            const quantity = this.value;
            updateCartItemQuantity(productId, quantity);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            removeFromCart(productId);
        });
    });
});

