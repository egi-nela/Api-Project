
document.addEventListener('DOMContentLoaded', function () {

    // Function to fetch categories and display them
    async function fetchCategories() {
        try { // perpiqemi ta ekzekutojme kodin dhe kapim ndonje gabim gjate ekzekutimit 
            const response = await fetch('https://fakestoreapi.com/products/categories'); //ben kerksen GET ne url per te mar prgj nga API 
            console.log(response)
            if (!response.ok) { //nese response nuk eshte e suksesshme 
                throw new Error('Network response was not ok'); //
            }
            const categories = await response.json(); // ben pauz ekzekutimin dhe pret pergjigjen e json()  .json()=> json data te konvertohet ne JavaScript object
            console.log(categories)
             displayCategories(categories);
             console.log("eee")
        } catch (error) { //kap gabimet  qe mund te ndodhin gjate try
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    

   


    // Function to display categories in the UI
    function displayCategories(categories) {
        const categoriesDiv = document.getElementById('categories');
        categoriesDiv.innerHTML = '<h2 class="h2-category">Product Categories</h2>';
        const ul = document.createElement('ul');
        ul.classList.add('ul-category');

        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category;//ketyre listave i jep emr ekategorise
            li.classList.add('li-category');
            // Add event listener to fetch products on click
            li.addEventListener('click', () => fetchProductsByCategory(category));
            ul.appendChild(li);
        });

        categoriesDiv.appendChild(ul);
    }

    // Function to fetch products by a specific category
    async function fetchProductsByCategory(category) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error(`Error fetching products in ${category}:`, error);
        }
    }

    // Function to fetch all products
    async function fetchAllProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
    }

    // Function to display products in the UI
    function displayProducts(products) {
        let data = '';
        products.forEach(product => {
            data += `
                <div class="card">
                    <img src="${product.image}" alt="" class="images-all-products">
                    <h1 class="title-all-products">${product.title}</h1>
                    <p class="category-all-products">${product.category}</p>
                    <p class="price-all-products">${product.price}</p>
                </div>`;
        });
        document.getElementById('cards').innerHTML = data;


        //
        document.querySelectorAll('.card').forEach((card, index) => {
            console.log(products)
            console.log(card)
            console.log(index)
            card.addEventListener('click', () => fetchProductById(products[index].id));

        });

    }



async function fetchProductById(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const product = await response.json();
   
        window.location.href = `product-details.html?id=${productId}`;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
    }
}


    // function displayProductDetails(product) {

    //     const detailsContainer = document.getElementById('product-details');
    //     detailsContainer.innerHTML = `
    //         <h2>${product.title}</h2>
    //         <p><strong>Category:</strong> ${product.category}</p>
    //         <p><strong>Price:</strong> ${product.price}</p>
    //         <p><strong>Description:</strong> ${product.description}</p>
    //         <img src="${product.image}" alt="${product.title}" class="product-image">
    //     `;
    // }

  
    

    fetchCategories();

    
    document.getElementById('showAllButton').addEventListener('click', fetchAllProducts);
});





