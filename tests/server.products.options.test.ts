import { getReasonPhrase, StatusCodes } from "http-status-codes";
import request from 'supertest';
import initServer from '../src/server';
import productOptionMockData from '../src/models/__mocks__/productOptionMockData'
import urljoin from "url-join";

jest.mock('../src/models/product.model')
jest.mock('../src/models/productOption.model')
describe('Tests the product/:id/options route', () => {

    let server: any;
    beforeEach(async () => {
        server = await initServer();
    });

  it('Should get all the productOptions for a specific product', async () => {
    // Act
    const result = await request(server)
      .get('/products')

    // Assert
    expect(result.status).toEqual(StatusCodes.OK);
    expect(result.body.items).toBeDefined();
    expect(Array.isArray(result.body.items)).toBeTruthy();
    expect.assertions(3);
  });

  it('Should create a new product option', async () => {
    // Arrange
    const data = {
      "productId": "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3",
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }

    // Act
    const result = await request(server)
      .post(urljoin('/products', productOptionMockData[0].productId, 'options'))
      .send(data)

    // Assert
    expect(result.status).toEqual(StatusCodes.CREATED);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.CREATED));
    expect(result.header['content-type']).toContain('application/json');
    expect(result.header['location']).toBeDefined();
    expect.assertions(4);
  });

  it('Should fail product creation as id already exists', async () => {
    // Arrange
    const data = {
      "id": productOptionMockData[0].id,
      "productId": productOptionMockData[0].productId,
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }
    
    // Act
    const result = await request(server)
      .post(urljoin('/products', productOptionMockData[0].productId, 'options'))
      .send(data)

    // Assert
    expect(result.status).toEqual(StatusCodes.CONFLICT);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.CONFLICT));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });


  it('Should set status to ACCEPTED when updating existing product option', async () => {
    // Arrange
    const data = {
      "id": productOptionMockData[0].id,
      "productId": productOptionMockData[0].productId,
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }

    // Act
    const result = await request(server)
      .put(urljoin('/products', productOptionMockData[0].productId, 'options', productOptionMockData[0].id))
      .send(data)

    // Assert
    expect(result.status).toEqual(StatusCodes.ACCEPTED);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.ACCEPTED));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });

  it('Should fail update if product option does not exists and set status to NOT_FOUND', async () => {
    // Arrange
    const data = {
      "id": productOptionMockData[0].id,
      "productId": productOptionMockData[0].productId,
      "name": "Rose Gold",
      "description": "Gold Apple iPhone 6S"
    }

    // Act
    const result = await request(server)
      .put(urljoin('/products', productOptionMockData[0].productId, 'options', '8F2E9176-35EE-4F0A-AE55-83023D2DB1A4'))
      .send(data)
                          
    // Assert
    expect(result.status).toEqual(StatusCodes.NOT_FOUND);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.NOT_FOUND));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });

  it('Should fail delete if product option does not exists and set status to NOT_FOUND', async () => {
    
    // Act
    const result = await request(server)
      .delete(urljoin('/products', productOptionMockData[0].productId, 'options', productOptionMockData[0].id))
                         
                          
    // Assert
    expect(result.status).toEqual(StatusCodes.ACCEPTED);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.ACCEPTED));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });

  it('Should delete a product option and set status to ACCEPTED', async () => {
    
    // Act
    const result = await request(server)
      .delete(urljoin('/products', productOptionMockData[0].productId, 'options', '8F2E9176-35EE-4F0A-AE55-83023D2DB1A4'))
                          
    // Assert
    expect(result.status).toEqual(StatusCodes.NOT_FOUND);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.NOT_FOUND));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });
}); // end describe