import productOptionMockData from './productOptionMockData'

const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();
const ProductOptionsModel = dbMock.define('Productoptions');
ProductOptionsModel.$queueResult(productOptionMockData.map(rec=>ProductOptionsModel.build(rec)));

ProductOptionsModel.$queryInterface.$useHandler(function(query: string, queryOptions: any, done: any) {

  if (query === 'create') {
    return queryOptions;
  } else if (query === 'findOne') {
    if (productOptionMockData.some(rec=>rec.id == queryOptions[0].where.id )) {
      return ProductOptionsModel.build(productOptionMockData.find(rec=>rec.id == queryOptions[0].where.id))
    }
    return null;
  } if (query === 'findAll') {
    return productOptionMockData.map(rec=>ProductOptionsModel.build(rec));
  } else if (query === 'update') {
    if (productOptionMockData.some(rec=>rec.id == queryOptions[1].where.id )) {
      return [1]
    }
    return [ 0 ];
  } else if (query === 'delete') {
    if (productOptionMockData.some(rec=>rec.id == queryOptions[0].where.id )) {
      return [1]
    }
    return [0];
  } 
});

export default ProductOptionsModel;