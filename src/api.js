import axios from "axios";

const apiBaseUrl = "https://dummyjson.com";

export const searchProducts = (name) =>`${apiBaseUrl}/products/search?q=${name}`;

export const getProducts = (name) => {
  return apiCall(searchProducts(name));
};

const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return null;
  }
};
