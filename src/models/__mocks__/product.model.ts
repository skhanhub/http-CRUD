import productMockData from "./productMockData";

const SequelizeMock = require('sequelize-mock'); // need to define types in order to use import
const dbMock = new SequelizeMock();
const ProductModel = dbMock.define('Products');

ProductModel.$queryInterface.$useHandler((query: string, queryOptions: any, done: any) => {

  if (query === 'create') {
    return queryOptions;
  } else if (query === 'findOne') {
    if (productMockData.some(rec=>rec.id == queryOptions[0].where.id )) {
      return ProductModel.build(productMockData.find(rec=>rec.id == queryOptions[0].where.id)) // double equals are intentional
    }
    return null;
  } else if (query === 'findAll') {
    if (queryOptions[0]){
      return [ProductModel.build(productMockData[0])];
    }
    return productMockData.map(rec=>ProductModel.build(rec));

  } else if (query === 'update') {
    if (productMockData.some(rec=>rec.id == queryOptions[1].where.id )) {
      return [1]
    }
    return [ 0 ];
  } else if (query === 'delete') {
    if (productMockData.some(rec=>rec.id == queryOptions[0].where.id )) {
      return [1]
    }
    return [ 0 ];
  }
});

export default ProductModel;
