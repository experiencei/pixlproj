import Product from "../models/Products.js";


export const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
       const savedProduct = await newProduct.save();
       res.status(200).json(savedProduct) 
    } catch (error) {
      next(err);
    }
  };


export const updateProduct = async (req, res, next) => {
    try {
      const updatedProducts = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProducts);
    } catch (err) {
      next(err);
    }
  };

export const deleteProduct = async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted.");
    } catch (err) {
      next(err);
    }
  };


  export const getProducts = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const products = await Product.find({})
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };