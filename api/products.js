/* ==========================================
   STORE API
========================================== */

// Categories
const categories = [
  {
    id: 1,
    name: "T-Shirts",
    image: "https://source.unsplash.com/400x400/?tshirt"
  },
  {
    id: 2,
    name: "Jeans",
    image: "https://source.unsplash.com/400x400/?jeans"
  },
  {
    id: 3,
    name: "Jackets",
    image: "https://source.unsplash.com/400x400/?jacket"
  },
  {
    id: 4,
    name: "Sneakers",
    image: "https://source.unsplash.com/400x400/?sneakers"
  },
  {
    id: 5,
    name: "Hoodies",
    image: "https://source.unsplash.com/400x400/?hoodie"
  },
  {
    id: 6,
    name: "Accessories",
    image: "https://source.unsplash.com/400x400/?accessories"
  }
];

// Sample names
const sampleNames = {
  1: ["Basic Tee", "Graphic Tee", "Oversized Tee"],
  2: ["Slim Fit Jeans", "Ripped Jeans", "Straight Jeans"],
  3: ["Denim Jacket", "Leather Jacket", "Bomber Jacket"],
  4: ["Running Shoes", "Casual Sneakers", "High Tops"],
  5: ["Pullover Hoodie", "Zip Hoodie", "Oversized Hoodie"],
  6: ["Cap", "Backpack", "Watch"]
};

// Products
const products = Array.from({ length: 100 }, (_, i) => {
  const categoryId = (i % 6) + 1;

  const category = categories.find(
    item => item.id === categoryId
  );

  const name =
    sampleNames[categoryId][
      i % sampleNames[categoryId].length
    ];

  return {
    id: i + 1,
    name: `${name} ${i + 1}`,
    categoryId,
    categoryName: category.name,

    price: (10 + (i % 50)) * 2,

    rating: Number(
      (Math.random() * 2 + 3).toFixed(1)
    ),

    stock: Math.floor(
      Math.random() * 100
    ),

    brand: "SmartWear",

    image: `https://source.unsplash.com/400x400/?${category.name}&sig=${i}`
  };
});

/* ==========================================
   MAIN HANDLER
========================================== */

const handler = (req, res) => {
  try {
    const path = req.path
      .split("/")
      .filter(Boolean);

    // Example:
    // /products → ["products"]
    // /products/1 → ["products", "1"]

    const resource = path[0];
    const id = path[1];

    /* ==========================
       PRODUCTS
    ========================== */

    if (resource === "products") {

      // GET /products/1
      if (id) {
        const product = products.find(
          item =>
            item.id === Number(id)
        );

        if (!product) {
          return res.status(404).json({
            success: false,
            message:
              "Product not found"
          });
        }

        return res.status(200).json({
          success: true,
          data: product
        });
      }

      // GET /products?page=1
      const {
        page = 1,
        limit = 10,
        search,
        category,
        sort
      } = req.query;

      let result = [...products];

      // Search
      if (search) {
        result = result.filter(
          item =>
            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
      }

      // Category
      if (category) {
        result = result.filter(
          item =>
            item.categoryName
              .toLowerCase() ===
            category.toLowerCase()
        );
      }

      // Sort
      switch (sort) {
        case "price-low":
          result.sort(
            (a, b) =>
              a.price - b.price
          );
          break;

        case "price-high":
          result.sort(
            (a, b) =>
              b.price - a.price
          );
          break;

        case "rating":
          result.sort(
            (a, b) =>
              b.rating - a.rating
          );
          break;
      }

      // Pagination
      const pageNum =
        Number(page);

      const limitNum =
        Number(limit);

      const start =
        (pageNum - 1) *
        limitNum;

      const data =
        result.slice(
          start,
          start + limitNum
        );

      return res.status(200).json({
        success: true,

        pagination: {
          page: pageNum,
          limit: limitNum,
          total: result.length,
          pages: Math.ceil(
            result.length /
              limitNum
          )
        },

        data
      });
    }

    /* ==========================
       CATEGORIES
    ========================== */

    if (
      resource ===
      "categories"
    ) {

      // GET /categories/1
      if (id) {
        const category =
          categories.find(
            item =>
              item.id ===
              Number(id)
          );

        if (!category) {
          return res.status(404).json({
            success: false,
            message:
              "Category not found"
          });
        }

        const categoryProducts =
          products.filter(
            item =>
              item.categoryId ===
              Number(id)
          );

        return res.status(200).json({
          success: true,

          data: {
            ...category,
            products:
              categoryProducts
          }
        });
      }

      // GET /categories
      return res.status(200).json({
        success: true,
        data: categories
      });
    }

    /* ==========================
       NOT FOUND
    ========================== */

    return res.status(404).json({
      success: false,
      message:
        "Route not found"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};

export default handler;