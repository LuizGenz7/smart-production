/* ==========================================
   MOCK STORE API
========================================== */

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

const sampleNames = {
  1: ["Basic Tee", "Graphic Tee", "Oversized Tee"],
  2: ["Slim Fit Jeans", "Ripped Jeans", "Straight Jeans"],
  3: ["Denim Jacket", "Leather Jacket", "Bomber Jacket"],
  4: ["Running Shoes", "Casual Sneakers", "High Tops"],
  5: ["Pullover Hoodie", "Zip Hoodie", "Oversized Hoodie"],
  6: ["Cap", "Backpack", "Watch"]
};

const products = Array.from({ length: 100 }, (_, i) => {
  const categoryId = (i % categories.length) + 1;

  const category = categories.find(
    item => item.id === categoryId
  );

  const names = sampleNames[categoryId];
  const name = names[i % names.length];

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

    description: `Premium ${name.toLowerCase()} for daily wear.`,

    image: `https://source.unsplash.com/400x400/?${category.name.toLowerCase()}&sig=${i}`,

    brand: "SmartWear",

    isNew: i % 7 === 0,
    isFeatured: i % 5 === 0,

    discount:
      i % 5 === 0 ? 10 : 0
  };
});

/* ==========================================
   PRODUCTS
========================================== */

export const getProducts = (req, res) => {
  try {
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
      result = result.filter(product =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Filter by category name
    if (category) {
      result = result.filter(product =>
        product.categoryName
          .toLowerCase()
          .includes(category.toLowerCase())
      );
    }

    // Sorting
    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        result.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "newest":
        result.sort(
          (a, b) => b.id - a.id
        );
        break;

      default:
        break;
    }

    // Pagination
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const start =
      (pageNumber - 1) * limitNumber;

    const paginatedProducts =
      result.slice(
        start,
        start + limitNumber
      );

    return res.status(200).json({
      success: true,

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalItems: result.length,
        totalPages: Math.ceil(
          result.length / limitNumber
        )
      },

      data: paginatedProducts
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ==========================================
   SINGLE PRODUCT
========================================== */

export const getProductById = (
  req,
  res
) => {
  try {
    const id = Number(
      req.params.id
    );

    const product =
      products.find(
        item => item.id === id
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

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ==========================================
   CATEGORIES
========================================== */

export const getCategories = (
  req,
  res
) => {
  try {
    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ==========================================
   SINGLE CATEGORY
========================================== */

export const getCategoryById = (
  req,
  res
) => {
  try {
    const id = Number(
      req.params.id
    );

    const category =
      categories.find(
        item => item.id === id
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
        product =>
          product.categoryId === id
      );

    return res.status(200).json({
      success: true,

      data: {
        ...category,
        products:
          categoryProducts
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};