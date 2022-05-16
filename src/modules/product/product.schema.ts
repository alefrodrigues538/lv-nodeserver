import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    uuid: String,
    description: String,
    value: Number,
    promotionValue: Number,
    imgUrl: String
});

const ProductModel = mongoose.model('Products', productSchema);

export default ProductModel;