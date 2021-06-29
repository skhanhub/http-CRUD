import { getReasonPhrase, StatusCodes } from "http-status-codes";
import request from 'supertest';
import urljoin from "url-join";
import productOptionMockData from "../src/models/__mocks__/productOptionMockData";
import initServer from '../src/server';

jest.mock('../src/models/product.model')
jest.mock('../src/models/productOption.model')
describe('Test the validateGuid middleware', () => {

    let server: any;
    beforeEach(async () => {
        server = await initServer();
    });

  it('Should return UNPROCESSABLE_ENTITY for invalid guid for products', async () => {
    // Act
    const result = await request(server)
      .get('/products/invalid-guid')

    // Assert
    expect(result.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });

  it('Should return UNPROCESSABLE_ENTITY for invalid guid for product option', async () => {
    
    // Act
    const result = await request(server)
      .get(urljoin('/products', productOptionMockData[0].productId, 'options', 'invalid-guid'))
                         
                          
    // Assert
    expect(result.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(result.body).toEqual(getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY));
    expect(result.header['content-type']).toContain('application/json');
    expect.assertions(3);
  });
}); // end describe