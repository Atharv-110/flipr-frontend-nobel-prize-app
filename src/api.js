// const API_URL = '/api/v1/prize.json';
const API_URL = 'http://api.nobelprize.org/v1/prize.json';

export const fetchPrizes = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.prizes;
  } catch (error) {
    console.error('Error fetching prizes:', error);
    return [];
  }
};
