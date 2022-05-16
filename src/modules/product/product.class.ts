import { Double } from "mongodb";

export class Product{
    private description;
    private value;
    private promotionValue;
    private imgUrl;

    constructor(
        description:string,
        value:Double,
        promotionValue?:Double,
        imgUrl?:string){

        this.description = description;
        this.value = value;
        this.promotionValue = promotionValue;
        this.imgUrl = imgUrl;
    }

    getDescription(){
        return this.description;
    }
    setDescription(value:string){
        this.description = value;
    }

    getValue(){
        return this.value;
    }
    setValue(value:Double){
        this.value = value;
    }

    getPromotionValue(){
        return this.promotionValue;
    }
    setPromotionValue(value:Double){
        this.promotionValue = value;
    }

    getImgUrl(){
        return this.imgUrl;
    }
    setImgUrl(base64Encode:string){
        this.imgUrl = base64Encode;
    }
}