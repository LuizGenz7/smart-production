
/* =========================
   CATEGORIES
========================= */
export const categories = [
    {
        id: 1,
        name: "T-Shirts",
        image: "https://source.unsplash.com/400x400/?tshirt,fashion"
    },
    {
        id: 2,
        name: "Jeans",
        image: "https://source.unsplash.com/400x400/?jeans,denim"
    },
    {
        id: 3,
        name: "Jackets",
        image: "https://source.unsplash.com/400x400/?jacket,fashion"
    },
    {
        id: 4,
        name: "Sneakers",
        image: "https://source.unsplash.com/400x400/?sneakers,shoes"
    },
    {
        id: 5,
        name: "Hoodies",
        image: "https://source.unsplash.com/400x400/?hoodie,fashion"
    },
    {
        id: 6,
        name: "Accessories",
        image: "https://source.unsplash.com/400x400/?fashion,accessories"
    }
];
const sampleNames = {
    1: ["Basic Tee", "Graphic Tee", "Oversized Tee"],
    2: ["Slim Fit Jeans", "Ripped Jeans", "Straight Jeans"],
    3: ["Denim Jacket", "Leather Jacket", "Bomber Jacket"],
    4: ["Running Shoes", "Casual Sneakers", "High Tops"],
    5: ["Pullover Hoodie", "Zip Hoodie", "Oversized Hoodie"],
    6: ["Cap", "Backpack", "Watch"]
};

export const products = Array.from({ length: 100 }, (_, i) => {
    const categoryId = (i % 6) + 1;
    const category = categories.find(c => c.id === categoryId);

    const names = sampleNames[categoryId];
    const name = names[i % names.length];

    return {
        id: i + 1,
        name: `${name} ${i + 1} `,
        categoryId: categoryId,
        categoryName: category.name,
        mainImageUrl: `https://source.unsplash.com/400x400/?${category.name.toLowerCase()},fashion&sig=${i}`,
        images: [
            `https://source.unsplash.com/400x400/?${category.name.toLowerCase()}&sig=${i + 1}`,
            `https://source.unsplash.com/400x400/?fashion&sig=${i + 2}`,
            `https://source.unsplash.com/400x400/?clothes&sig=${i + 3}`
        ],
        description: `High-quality ${name.toLowerCase()} perfect for everyday wear.`,
        price: (10 + (i % 50)) * 2,
        rate: (Math.random() * 2 + 3).toFixed(1),
        stock: Math.floor(Math.random() * 100),
        brand: "SmartWear",
        isNew: i % 7 === 0,
        discount: i % 5 === 0 ? 10 : 0
    };
});


const full = {
    products, categories
}


const handler = (req, res) => {
    try {
        res.status(200).json(full);

    } catch (error) {
        res.status(500).json({
            error: "Server crashed",
            message: error.message,
        });
    }
}

export default handler;


console.log(full);