export class CreateProductDto{

    readonly name : string;
    readonly price : number;
    readonly categories : string[];
    readonly measurements : {
        height:number;
        width:number;
        weight:number;
    }

}