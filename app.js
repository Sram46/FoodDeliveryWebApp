// Array to hold ordered items
let order = [];
let totalPrice = 0;

// Function to update order details
function updateOrderDetails() {
    const orderDetails = document.getElementById('order-details');
    const totalPriceElement = document.getElementById('total-price');
    
    if (order.length === 0) {
        orderDetails.textContent = 'No items ordered yet.';
        totalPriceElement.textContent = 'Total: ₹0';
    } else {
        orderDetails.innerHTML = order.map(item => `${item.name} - ₹${item.price}`).join('<br>');
        totalPriceElement.textContent = `Total: ₹${totalPrice}`;
    }
}

// Add event listeners to all "Order Now" buttons
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const itemName = e.target.getAttribute('data-item');
        const itemPrice = parseInt(e.target.getAttribute('data-price'));

        // Add the ordered item to the order array
        order.push({ name: itemName, price: itemPrice });
        totalPrice += itemPrice;

        // Update order details on the page
        updateOrderDetails();
    });
});

// Restaurant selection functionality
const restaurantSelect = document.getElementById('restaurant-select');
const menuSection = document.getElementById('menu-section');
restaurantSelect.addEventListener('change', () => {
    if (restaurantSelect.value !== "") {
        menuSection.style.display = "block";
    } else {
        menuSection.style.display = "none";
    }
});

// Place order button functionality
const placeOrderButton = document.getElementById('place-order-btn');
placeOrderButton.addEventListener('click', () => {
    if (order.length === 0) {
        alert('Please add items to your order.');
    } else {
        alert('Thank you for your order from ' + restaurantSelect.value + '!');
        order = [];
        totalPrice = 0;
        updateOrderDetails();
    }
});

// Initialize the order details display
updateOrderDetails();
