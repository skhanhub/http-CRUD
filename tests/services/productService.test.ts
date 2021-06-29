import productMockData from "../../src/models/__mocks__/productMockData";
import Product from "../../src/models/product.model"
import ProductsService from "../../src/services/productsService";

jest.mock('../../src/models/product.model')

describe('Tests for ProductsService', () => {

  it('Should get all the records', async () => {
    // Arrange
    const productsService = new ProductsService(Product)
    
    // Act
    const products = await productsService.Get();

    // Assert
    expect(products.length).toEqual(productMockData.length);
    expect(products[0].get().id).toEqual(productMockData[0].id);
  });

  it('Should return one rec', async () => {
    // Arrange
    const productsService = new ProductsService(Product)
    
    // Act
    const products = await productsService.FilterProductByName("Samsung");

    // Assert
    expect(products.length).toEqual(1);
    expect(products[0].get().name).toEqual(productMockData[0].name);
  });

  it('Should create a new record', async () => {
    // Arrange
    const data = {
      "name": "Google Pixel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }
    const productsService = new ProductsService(Product)
    
    // Act
    const products = await productsService.Create(data);

    // Assert
    expect(products.get().name).toEqual(data.name);
    expect(products.get().id).toBeDefined();
  });

  it('Should update an existing record', async () => {
    // Arrange
    const data = {
      "name": "Google Mixel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }
    const productsService = new ProductsService(Product)
    
    // Act
    const numUpdated = await productsService.Update(productMockData[0].id, data);

    // Assert
    expect(numUpdated).toEqual(1);
  });

  it('Should not update if id dont find a match', async () => {
    // Arrange
    const data = {
      "name": "Google Mixel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }
    const productsService = new ProductsService(Product)
    
    // Act
    const numUpdated = await productsService.Update("8F2E9176-35EE-4F0A-AE55-83023D2DB1A4", data);

    // Assert
    expect(numUpdated).toEqual(0);
  });

  it('Should not update if id dont find a match', async () => {
    // Arrange
    const data = {
      "name": "Google Mixel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }
    const productsService = new ProductsService(Product)
    
    // Act
    const numUpdated = await productsService.Update("8F2E9176-35EE-4F0A-AE55-83023D2DB1A4", data);

    // Assert
    expect(numUpdated).toEqual(0);
  });

  it('Should delete matching rec', async () => {
    // Arrange
    const productsService = new ProductsService(Product)
    
    // Act
    const numUpdated = await productsService.DeleteById(productMockData[0].id);

    // Assert
    expect(numUpdated).toEqual(1);
  });

  it('Should return 0 for non matching delete', async () => {
    // Arrange
    const productsService = new ProductsService(Product)
    
    // Act
    const numUpdated = await productsService.DeleteById("8F2E9176-35EE-4F0A-AE55-83023D2DB1A4");

    // Assert
    expect(numUpdated).toEqual(0);
  });
});