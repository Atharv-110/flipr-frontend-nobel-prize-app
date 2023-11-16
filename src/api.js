const API_URL = 'https://api.nobelprize.org/v1/prize.json';

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
