import productOptionMockData from "../../src/models/__mocks__/productOptionMockData";
import PrproductOption from "../../src/models/productOption.model"
import ProductOptionsService from "../../src/services/productOptionsService";


jest.mock('../../src/models/productOption.model')

describe('Tests for ProductOptionsService', () => {

  it('Should get all the records', async () => {
    // Arrange
    const productOptionsService = new ProductOptionsService(PrproductOption)
    
    // Arc
    const productOptions = await productOptionsService.Get();

    // Assert
    expect(productOptions.length).toEqual(productOptionMockData.length);
    expect(productOptions[0].get().id).toEqual(productOptionMockData[0].id);
  });

  it('Should create a new record', async () => {
    // Arrange
    const data = {
      "productId": "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3",
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }
    const productOptionsService = new ProductOptionsService(PrproductOption)
    
    // Act
    const productOptions = await productOptionsService.CreateProductOption(data.productId, data);

    // Assert
    expect(productOptions.get().name).toEqual(data.name);
    expect(productOptions.get().id).toBeDefined();
  });

  it('Should update an existing record', async () => {
    // Arrange
    const data = {
      "id": "5C2996AB-54AD-4999-92D2-89245682D534",
      "productId": "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3",
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }
    const productOptionsService = new ProductOptionsService(PrproductOption)
    
    // Act
    const numUpdated = await productOptionsService.UpdateProductOptionById(productOptionMockData[0].productId, productOptionMockData[0].id, data);

    // Assert
    expect(numUpdated).toEqual(1);
  });

  it('Should not update if id dont find a match and return 1', async () => {
    // Arrange
    const data = {
      "id": "5C2996AB-54AD-4999-92D2-89245682D534",
      "productId": "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3",
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }
    const productOptionsService = new ProductOptionsService(PrproductOption)
    
    // Act
    const numUpdated = await productOptionsService.UpdateProductOptionById("5C2996AB-54AD-4999-92D2-89245682D532", "8F2E9176-35EE-4F0A-AE55-83023D2DB1A4", data);

    // Assert
    expect(numUpdated).toEqual(0);
  });

  it('Should delete matching rec', async () => {
    // Arrange
    const data = {
      "id": "5C2996AB-54AD-4999-92D2-89245682D534",
      "productId": "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3",
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }
    const productOptionsService = new ProductOptionsService(PrproductOption)
    
    // Act
    const numUpdated = await productOptionsService.DeleteProductOptionById(productOptionMockData[0].productId, productOptionMockData[0].id);

    // Assert
    expect(numUpdated).toEqual(1);
  });

  it('Should return 0 for non matching delete', async () => {
    // Arrange
    const data = {
      "id": "5C2996AB-54AD-4999-92D2-89245682D534",
      "productId": "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3",
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }
    const productOptionsService = new ProductOptionsService(PrproductOption)
    
    // Act
    const numUpdated = await productOptionsService.DeleteProductOptionById("5C2996AB-54AD-4999-92D2-89245682D532", "8F2E9176-35EE-4F0A-AE55-83023D2DB1A4");

    // Assert
    expect(numUpdated).toEqual(0);
  });
});