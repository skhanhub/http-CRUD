import { BuildOptions, Model } from "sequelize";
import { ID_EXISTS, INVALID_ID } from "../const/errorMessages";
import { isGuid } from "../helpers";

export type ModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Model;
}

export interface Body {
    [key: string]: any
}

export default class DbService {

    protected DbModel: ModelStatic;

    constructor(DbModel:  ModelStatic){
        this.DbModel = DbModel;
    }
    async Get() {
        return await this.DbModel.findAll();
    }

    async GetById(id: string) {
        return await this.DbModel.findOne({
            where: { id }
        });
    }

    async Create(newData: Body) {
        // Only requred as table is not using unique id
        if (newData.id){
            if(!isGuid(newData.id)){
                throw new Error(INVALID_ID)
            }
            const record = await this.GetById(newData.id)
            if(record){
                throw new Error(ID_EXISTS, )
            }
        }
        return await this.DbModel.create(newData);
    }

    async DeleteById(id: string) {
        const record = await this.DbModel.findOne({ where: { id } });
        if (!record) {
            return 0;
        }
        await record.destroy(); // need two queries so that the delete propagates

        return 1;
    }

    async Update(id: string, updatedData: Body) {

        const [ numUpdated ] = await this.DbModel.update({
            ...updatedData,
            id,
        }, {
            where: {
                id
            }
        })

        return numUpdated;
    }

    async UpdateOrCreate(id: string, updatedData: Body) {

        const update = {
            ...updatedData,
            id,
        }

        const [ numUpdated ] = await this.DbModel.update(
            update,
            {
                where: {
                    id
                }
            }
        )
        if(numUpdated === 1){
            return {
                created: false,
            }
        }

        await this.DbModel.create(update);

        return {
            created: true,
        }
    }
}