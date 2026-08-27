"use strict";

const categoryItems = {

    fashion: {
        title: "Fashion & Clothing",
        description: "Explore clothing, shoes, bags and fashion accessories.",
        items: [
            {
                name: "Dresses",
                image: "../images/products/dresses.jpg"
            },
            {
                name: "T-Shirts",
                image: "../images/products/t-shirts.jpg"
            },
            {
                name: "Shirts",
                image: "../images/products/shirts.jpg"
            },
            {
                name: "Trousers",
                image: "../images/products/dresses.jpg"
            },
            {
                name: "Jeans",
                image: "../images/products/jeans.jpg"
            },
            {
                name: "Shoes",
                image: "../images/products/shoes.jpg"
            },
            {
                name: "Bags",
                image: "../images/products/handbag.jpg"
            },
            {
                name: "Hills",
                image: "../images/products/hills.jpg"
            },
            {
                name: "Watches",
                image: "../images/products/watches.jpg"
            }
        ]
    },

    electronics: {
        title: "Electronics",
        description: "Discover electronics and modern gadgets.",
        items: [
            {
                name: "Televisions",
                image: "../images/products/TV.jpg"
            },
            {
                name: "Laptops",
                image: "../images/products/laptop.jpg"
            },
            {
                name: "Desktop Computers",
                image: "../images/products/desktop.jpg"
            },
            {
                name: "Speakers",
                image: "../images/products/speakers.jpg"
            },
            {
                name: "Headphones",
                image: "../images/products/headphones.jpg"
            },
            {
                name: "Printers",
                image: "../images/products/printer.jpg"
            }
        ]
    },

    phones: {
        title: "Phones & Accessories",
        description: "Find smartphones and mobile phone accessories.",
        items: [
            {
                name: "Smartphones",
                image: "../images/products/smartphones.jpg"
            },
            {
                name: "Screen Protectors",
                image: "../images/products/screenprotectors.jpg"
            },
            {
                name: "Chargers",
                image: "../images/products/charger.jpg"
            },
            {
                name: "USB Cables",
                image: "../images/products/usbcable.jpg"
            },
            {
                name: "Earphones",
                image: "../images/products/earphones.jpg"
            },
            {
                name: "Smartwatches",
                image: "../images/products/smartwatchjpg.jpg"
            },
            {
                name: "Memory Cards",
                image: "../images/products/mermorycard.jpg"
            }
        ]
    },

    food: {
        title: "Food & Groceries",
        description: "Find fresh food, drinks and everyday groceries.",
        items: [
            {
                name: "Fruits",
                image: "../images/products/fruits.jpg"
            },
            {
                name: "Vegetables",
                image: "../images/subcategories/vegetables.jpg"
            },
            {
                name: "Meat",
                image: "../images/products/meat.jpg"
            },
            {
                name: "Fish",
                image: "../images/products/fish.jpg"
            },
            {
                name: "Rice",
                image: "../images/products/rice.jpg"
            },
            {
                name: "Beans",
                image: "../images/products/beans.jpg"
            },
            {
                name: "Drinks",
                image: "../images/products/drinks.jpg"
            },
            {
                name: "Snacks",
                image: "../images/subcategories/snacks.jpg"
            },
            {
                name: "Bread",
                image: "../images/products/bread.jpg"
            },
            {
                name: "Spices",
                image: "../images/products/spices.jpg"
            }
        ]
    },

    beauty: {
        title: "Beauty & Personal Care",
        description: "Explore beauty, skincare and personal care products.",
        items: [
            {
                name: "Skincare",
                image: "../images/products/skincare.jpg"
            },
            {
                name: "Perfumes",
                image: "../images/products/perfumes.jpg"
            },
            {
                name: "Hair Products",
                image: "../images/products/hairproducts.jpg"
            },
            {
                name: "Wigs",
                image: "../images/products/wigs.jpg"
            },
            {
                name: "Hair Extensions",
                image: "../images/products/hairextention.jpg"
            },
            {
                name: "Soaps",
                image: "../images/products/soaps.jpg"
            },
            {
                name: "Lotions",
                image: "../images/products/lotion.jpg"
            }
        ]
    },

    home: {
        title: "Home & Furniture",
        description: "Everything you need for your home.",
        items: [
            {
                name: "Beds",
                image: "../images/products/beds.jpg"
            },
            {
                name: "Tables",
                image: "../images/products/tables.jpg"
            },
            {
                name: "Chairs",
                image: "../images/products/chairs.jpg"
            }
        ]
    },

    agriculture: {
        title: "Agriculture & Farm Products",
        description: "Explore agricultural products and farming supplies.",
        items: [
            {
                name: "Farm Produce",
                image: "../images/products/farm-produce.jpg"
            },
            {
                name: "Fertilizers",
                image: "../images/products/fertelizer.jpg"
            },
            {
                name: "Animal Feed",
                image: "../images/products/feed.jpg"
            },
            {
                name: "Poultry Products",
                image: "../images/products/poultry.jpg"
            }
        ]
    },

    other: {
        title: "Other Products",
        description: "Discover more products from local sellers.",
        items: [
            {
                name: "Musical Instruments",
                image: "../images/subcategories/musical-instruments.jpg"
            },
            {
                name: "Collectibles",
                image: "../images/subcategories/collectibles.jpg"
            },
            {
                name: "Gifts",
                image: "../images/subcategories/gifts.jpg"
            },
            {
                name: "Miscellaneous",
                image: "../images/subcategories/miscellaneous.jpg"
            }
        ]
    }

};


const categoryCards =
    document.querySelectorAll(".category-card");

const subcategorySection =
    document.getElementById("subcategory-section");

const subcategoryTitle =
    document.getElementById("subcategory-title");

const subcategoryDescription =
    document.getElementById("subcategory-description");

const subcategoryList =
    document.getElementById("subcategory-list");


categoryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const category =
            card.dataset.category;

        showSubcategories(category);

    });

});


function showSubcategories(category) {

    const selectedCategory =
        categoryItems[category];

    if (!selectedCategory) {
        return;
    }


    subcategoryTitle.textContent =
        selectedCategory.title;

    subcategoryDescription.textContent =
        selectedCategory.description;

    subcategoryList.innerHTML = "";


    selectedCategory.items.forEach(function (item) {

        const subcategoryCard =
            document.createElement("a");

        subcategoryCard.className =
            "subcategory-card";


        /*
         * Send the buyer to product.html
         * with both category and subcategory.
         */
        subcategoryCard.href =
            "product.html?category=" +
            encodeURIComponent(category) +
            "&subcategory=" +
            encodeURIComponent(item.name);


        subcategoryCard.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="subcategory-content">

                <h3>${item.name}</h3>

                <span>
                    View Products →
                </span>

            </div>

        `;


        subcategoryList.appendChild(
            subcategoryCard
        );

    });


    subcategorySection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}