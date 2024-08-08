export const getProducts = async () => {
    const response = await fetch('/json/products.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    return products;
  };
  