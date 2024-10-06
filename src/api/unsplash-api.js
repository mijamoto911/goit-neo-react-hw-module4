import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
const ACCESS_KEY = 'avPSA7tWahVoj3bhRtmkEGDXQV6Y5DPhfPqeiIjPcq8';

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(`/search/photos`, {
    params: {
      query,
      client_id: ACCESS_KEY,
      page,
      per_page: 15,
    },
  });

  return data;
};
