import { DataTypes, Model, UUIDV4 } from 'sequelize';
import db from '../config/database.config'

export interface ProductOptionAttributes {
	id: string;
	productId: string;
	name: string;
	description: string;
}

export default class ProductOption extends Model<ProductOptionAttributes> {}

ProductOption.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			defaultValue: UUIDV4,
			primaryKey: true,
			allowNull: false,
			unique: true,
			field: 'Id',
		},
		productId: {
			type: DataTypes.UUIDV4,
			field: 'ProductId',
		},
    name: {
			type: DataTypes.STRING,
			defaultValue: null,
			field: 'Name',
		},
    description: {
			type: DataTypes.STRING,
			defaultValue: null,
			field: 'Description',
		},
	},
	{
		sequelize: db,
		tableName: 'Productoptions',
	}
);