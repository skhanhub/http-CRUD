import { isGuid } from "../../src/helpers";

describe('Test the isGuid function', () => {

  it('Should return true if the guid is valid', async () => {

    // Arrange
    const validGuid = '8F2E9176-35EE-4F0A-AE55-83023D2DB1A4';

    // Act
    const result = isGuid(validGuid);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should return false if the guid is invalid', async () => {
    
    // Arrange
    const invalidGuid = 'invalid-guid';

    // Act
    const result = isGuid(invalidGuid);

    // Assert
    expect(result).toBeFalsy();
  });
}); // end describe