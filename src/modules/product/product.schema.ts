import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    uuid: String,
    description: String,
    value: Number,
    promotionValue: Number,
    imgUrl: String,
    stockAmount: Number,
    unity: String,
    categoryId: Number,
    departmentId: Number,
    rateAmount: Number
});

const ProductModel = mongoose.model('Products', productSchema);

export default ProductModel;