/**
 * Fetches the list of products from the server.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 * @throws {Error} Throws an error if the network response is not ok.
 */
export const getProducts = async () => {
  // Send a request to fetch the products JSON file
  const response = await fetch('/json/products.json');

  // Check if the response is OK (status code 200-299)
  if (!response.ok) {
    // Throw an error if the response was not OK
    throw new Error('Network response was not ok');
  }

  // Parse the JSON data from the response
  const products = await response.json();

  // Return the parsed products
  return products;
};
