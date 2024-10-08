// Array to hold ordered items
let order = [];
let totalPrice = 0;

// Menus for each restaurant
const menus = {
    "Udhaya's Hotel": [
        { name: "Idli", price: 10 },
        { name: "Dosa", price: 35 },
        { name: "Vada", price: 10 }
    ],
    "Red Rose": [
        { name: "Pizza", price: 280 },
        { name: "Pasta", price: 190 },
        { name: "Burger", price: 150 }
    ],
    "Dosa Corner": [
        { name: "Masala Dosa", price: 50 },
        { name: "Rava Dosa", price: 45 },
        { name: "Plain Dosa", price: 20 },
        { name: "Paneer Dosa", price: 30 },
        { name: "Onion Dosa", price: 40 }
    ],
    "Jeevan Restaurant": [
        { name: "Veg Thali", price: 150 },
        { name: "Paneer Butter Masala", price: 100 },
        { name: "Naan", price: 45 }
    ],
    "7/11 Restaurant": [
        { name: "Chicken Biryani", price: 250 },
        { name: "Mutton Biryani", price: 280 },
        { name: "Fish Curry", price: 130 }
    ],
    "Nila Hotel": [
        { name: "Chapathi", price: 40 },
        { name: "Poori", price: 40 },
        { name: "Parotta", price: 30 }
    ],
    "TAS Mess": [
        { name: "Rice & Sambar", price: 70 },
        { name: "Rasam", price: 45},
        { name: "Curd Rice", price: 45 }
    ]
};
    // Add other restaurant menus here...


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

// Add event listeners to restaurant selection
const restaurantSelect = document.getElementById('restaurant-select');
const menuSection = document.getElementById('menu-section');
const menuItems = document.getElementById('menu-items');

restaurantSelect.addEventListener('change', () => {
    const selectedRestaurant = restaurantSelect.value;
    menuItems.innerHTML = ''; // Clear previous menu

    if (selectedRestaurant !== "") {
        const restaurantMenu = menus[selectedRestaurant];

        restaurantMenu.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Delicious ${item.name}.</p>
                <span class="price">₹${item.price}</span>
                <button class="order-btn" data-item="${item.name}" data-price="${item.price}">Order Now</button>
            `;
            menuItems.appendChild(menuItem);

            // Add event listener to the "Order Now" button
            menuItem.querySelector('.order-btn').addEventListener('click', () => {
                order.push({ name: item.name, price: item.price });
                totalPrice += item.price;
                updateOrderDetails();
            });
        });

        menuSection.style.display = "block";
    } else {
        menuSection.style.display = "none";
    }
});

// Place order button functionality
const placeOrderButton = document.getElementById('place-order-btn');
const trackOrderButton = document.getElementById('track-order-btn');
placeOrderButton.addEventListener('click', () => {
    const paymentMethod = document.getElementById('payment-method').value;
    const deliveryAddress = document.getElementById('delivery-address').value;

    if (order.length === 0) {
        alert('Please add items to your order.');
    } else if (deliveryAddress === "") {
        alert('Please enter your delivery address.');
    } else {
        alert(`Thank you for your order from ${restaurantSelect.value}!\nPayment: ${paymentMethod}\nAddress: ${deliveryAddress}`);
        order = [];
        totalPrice = 0;
        updateOrderDetails();

        // Show track order button after placing order
        trackOrderButton.style.display = 'block';
    }
});

// Tracking button functionality (opens Google Maps)
trackOrderButton.addEventListener('click', () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(document.getElementById('delivery-address').value)}`;
    window.open(googleMapsUrl, '_blank');
});

// Contact Us button functionality
const contactUsButton = document.getElementById('contact-us-btn');
contactUsButton.addEventListener('click', () => {
    alert('For assistance, please contact Foodie\'s Delight at:\nPhone: +1234567890\nEmail: support@foodiesdelight.com');
});

// Initialize the order details display
updateOrderDetails();
