// product-details.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetails(productId);
    }

    async function fetchProductDetails(productId) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const product = await response.json();
            displayProductDetails(product);
        } catch (error) {
            console.error(`Error fetching product with ID ${productId}:`, error);
        }
    }

    function displayProductDetails(product) {
        const detailsContainer = document.getElementById('product-details');
        detailsContainer.innerHTML = `
            <h2>${product.title}</h2>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <img src="${product.image}" alt="${product.title}" class="product-image">
        `;
    }
});
