import axios from 'axios';
const BASE_URL =
  'https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=20&sort_by=&sort_dir=desc';

const topWearsProductsData = async () => {
  const response = await axios.get(BASE_URL);
  return response.data.result.products;
};

const topWearsfiltersData = async () => {
  const response = await axios.get(BASE_URL);
  response.data.result.filters.splice(response.data.result.filters.length-12,12);
  response.data.result.filters.splice(1,1);

  return response.data.result.filters;
};

export default {
  topWearsProductsData,
  topWearsfiltersData,
};
