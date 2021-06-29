import { Sequelize } from 'sequelize';
import path from "path";

let db = new Sequelize(process.env.DB_NAME || 'data', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
	host: process.env.DB_HOST,
	dialect: 'mysql',
});
// Use sqlite if no env is defined
if (!process.env.ENVIRONMENT) {
	db = new Sequelize({
		storage: process.env.DB_PATH || path.join(__filename, '../../../App_Data/products.db'),
		dialect: 'sqlite',
		logging: false,
		define: {
			createdAt: false,
			updatedAt: false,
		},
	});
}

export default db;