const ProductModel = require("../../../server/models/product");

const getProducts = (req, res) => {
  ProductModel.find({}, (error, products) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(products);
  });
};

const addProduct = (req, res) => {
  const { _id: id, name, reviews, } = req.swagger.params.body.value;

  ProductModel.create({_id: id, name, reviews, }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(product);
  });
};

const findProductById = (req, res) => {
  const id = req.swagger.params.id.value;

  ProductModel.findOne({_id: id, }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    res.json(product);
  });
};

const deleteProductById = (req, res) => {
  const id = req.swagger.params.id.value;

  ProductModel.findOneAndDelete({_id: id, }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    res.json(product);
  });
};

const getProductReviewsById = (req, res) => {
  const id = req.swagger.params.id.value;

  ProductModel.findOne({_id: id, }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    res.send({
      reviews: product["reviews"],
    });
  });
};

module.exports = {
  getProducts: getProducts,
  addProduct: addProduct,
  findProductById: findProductById,
  deleteProductById: deleteProductById,
  getProductReviewsById: getProductReviewsById
};
