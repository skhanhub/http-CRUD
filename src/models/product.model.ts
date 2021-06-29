import { DataTypes, Model, UUIDV4 } from 'sequelize';
import ProductOption from './productOption.model';
import db from '../config/database.config'

export interface ProductAttributes {
	id: string;
	name: string;
	description: string;
	price: number;
	deliveryPrice: number;
}

export default class Product extends Model<ProductAttributes> {}

Product.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			defaultValue: UUIDV4,
			primaryKey: true,
			allowNull: false,
			unique: true,
			field: 'Id',
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
        price: {
			type: DataTypes.DOUBLE,
			defaultValue: null,
			field: 'Price',
		},
    deliveryPrice: {
			type: DataTypes.DOUBLE,
			defaultValue: null,
			field: 'DeliveryPrice',
		},
	},
	{
		sequelize: db,
		tableName: 'Products',
	}
);

Product.hasMany(ProductOption, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
	hooks: true,
});

ProductOption.belongsTo(Product, {
	foreignKey: 'productId',
});
