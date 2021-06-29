import { where, fn, col } from "sequelize";
import DbService from "./dbService";
import ProductOption from "../models/productOption.model";


export default class ProductsService extends DbService{

    constructor(DbModel: any){
        super(DbModel)
    }
    async GetWithOptions() {
        return await this.DbModel.findAll({include: ProductOption});
    }
    async FilterProductByName(name: string) {
        return await this.DbModel.findAll({
            where: {
                name: where(fn('LOWER', col('Name')), 'LIKE',  `%${name}%`)
            }
        });
    }
}