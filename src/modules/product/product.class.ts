import { Double } from "mongodb";

export class Product {
    private description;
    private value;
    private promotionValue;
    private imgUrl;
    private stockAmount;
    private unity;
    private categoryId;
    private departmentId;

    constructor(
        description: string,
        value: Double,
        promotionValue?: Double,
        imgUrl?: string,
        stockAmount?: Number,
        unity?: string,
        categoryId?: Number,
        departmentId?: Number,) {

        this.description = description;
        this.value = value;
        this.promotionValue = promotionValue;
        this.imgUrl = imgUrl;
        this.stockAmount = stockAmount;
        this.unity = unity;
        this.categoryId = categoryId;
        this.departmentId = departmentId;
    }

    getDescription() {
        return this.description;
    }
    setDescription(value: string) {
        this.description = value;
    }

    getValue() {
        return this.value;
    }
    setValue(value: Double) {
        this.value = value;
    }

    getPromotionValue() {
        return this.promotionValue;
    }
    setPromotionValue(value: Double) {
        this.promotionValue = value;
    }

    getImgUrl() {
        return this.imgUrl;
    }
    setImgUrl(base64Encode: string) {
        this.imgUrl = base64Encode;
    }

    getStockAmount() {
        return this.stockAmount;
    }
    setStockAmount(value: Number) {
        this.stockAmount = value;
    }

    getUnity() {
        return this.unity;
    }
    setUnity(value: string) {
        this.unity = value;
    }

    getCategoryId() {
        return this.categoryId;
    }
    setCategoryId(value: Number) {
        this.categoryId = value;
    }

    getDepartmentId() {
        return this.departmentId;
    }
    setDepartmentId(value: Number) {
        this.departmentId = value;
    }
}