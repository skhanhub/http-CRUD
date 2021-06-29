import { ID_EXISTS, INVALID_ID } from "../const/errorMessages";
import DbService from "./dbService";
import { Body } from "./dbService";
import { isGuid } from "../helpers";

export default class ProductsOptionsService extends DbService {
    constructor(DbModel: any){
        super(DbModel)
    }
    async GetProductOptions(productId: string) {
        return await this.DbModel.findAll({
            where: {
                productId
            }
        });
    }

    async GetProductOptionById(productId: string, optionId: string) {
        return await this.DbModel.findOne({
            where: {
                productId,
                id: optionId
            }
        });
    }

    async CreateProductOption(productId: string, newOption: Body) {
        // Only requred as table is not using unique id
        if (newOption.id){
            if(!isGuid(newOption.id)){
                throw new Error(INVALID_ID)
            }
            const option = await this.GetProductOptionById(productId, newOption.id)
            if(option){
                throw new Error(ID_EXISTS)
            }
        }
        return await this.DbModel.create({
            productId,
            ...newOption
        });
    }

    async DeleteProductOptionById(productId: string, optionId: string) {
        const record = await this.DbModel.findOne({
            where: {
                id: optionId,
                productId,
            }
        });
        if (!record) {
            return 0;
        }
        await record.destroy(); // need two queries so that the delete propagates
        return 1;
    }

    async UpdateProductOptionById(productId: string, optionId: string, updatedData: Body) {
        const [ numUpdated ] = await this.DbModel.update({
            ...updatedData,
            id: optionId,
        }, {
            where: {
                id: optionId,
                productId,
            }
        })

        return numUpdated;
    }

    async UpdateOrCreateProductOptionById(productId: string, optionId: string, updatedData: Body) {

        const update = {
            ...updatedData,
            id: optionId,
        }
        const [ numUpdated ] = await this.DbModel.update(
            update,
            {
                where: {
                    id: optionId,
                    productId,
                }
            }
        )
        if(numUpdated === 1){
            return {
                created: false
            }
        }

        await this.CreateProductOption(productId, update)

        return {
            created: true,
        }
    }
}