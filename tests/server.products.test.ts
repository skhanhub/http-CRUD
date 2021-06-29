import { getReasonPhrase, StatusCodes } from "http-status-codes";
import request from 'supertest';
import initServer from '../src/server';
import productMockData from '../src/models/__mocks__/productMockData'
import urljoin from "url-join";

jest.mock('../src/models/product.model')
describe('Test the product route', () => {

    let server: any;
    beforeEach(async () => {
        server = await initServer();
    });

  it('Should get all the products', async () => {
    // Act
    const result = await request(server)
      .get('/products')

    // Assert
    expect(result.status).toEqual(StatusCodes.OK);
    expect(result.body.items).toBeDefined();
    expect(Array.isArray(result.body.items)).toBeTruthy();
    expect.assertions(3);
  });

  it('Should create a new products', async () => {
    // Arrange
    const data = {
      "name": "Google Pixel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }

    // Act
    const result = await request(server)
      .post('/products')
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
      "id": productMockData[0].id,
      "name": "Google Pixel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }
    
    // Act
    const result = await request(server)
      .post('/products')
      .send(data)

    // Assert
    expect(result.status).toEqual(StatusCodes.CONFLICT);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.CONFLICT));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });


  it('Should set status to ACCEPTED', async () => {
    // Arrange
    const data = {
      "name": "Google Foxel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }

    // Act
    const result = await request(server)
      .put(urljoin('/products', productMockData[0].id))
      .send(data)

    // Assert
    expect(result.status).toEqual(StatusCodes.ACCEPTED);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.ACCEPTED));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });

  it('Should fail update if resource does not exists and set status to NOT_FOUND', async () => {
    // Arrange
    const data = {
      "name": "Google Pixel",
      "description": "Latest Google Phone",
      "price": 201,
      "deliveryPrice": 12.34
    }

    // Act
    const result = await request(server)
      .put(urljoin('/products/8F2E9176-35EE-4F0A-AE55-83023D2DB1A4'))
      .send(data)
                          
    // Assert
    expect(result.status).toEqual(StatusCodes.NOT_FOUND);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.NOT_FOUND));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });

  it('Should fail delete if resource does not exists and set status to NOT_FOUND', async () => {
    
    // Act
    const result = await request(server)
        .delete(urljoin('/products', productMockData[0].id))
                         
                          
    // Assert
    expect(result.status).toEqual(StatusCodes.ACCEPTED);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.ACCEPTED));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });

  it('Should delete a resource and set status to ACCEPTED', async () => {
    
    // Act
    const result = await request(server)
      .delete(urljoin('/products/8F2E9176-35EE-4F0A-AE55-83023D2DB1A4'))
                          
    // Assert
    expect(result.status).toEqual(StatusCodes.NOT_FOUND);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.NOT_FOUND));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });
}); // end describe