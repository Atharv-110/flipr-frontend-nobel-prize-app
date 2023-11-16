import React, { useState, useEffect } from 'react';
import { fetchPrizes } from './api';
import "./App.css";

const App = () => {
  const [prizes, setPrizes] = useState([]);
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [multiTimeWinners, setMultiTimeWinners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prizeData = await fetchPrizes();
        setPrizes(prizeData);
        setFilteredPrizes(prizeData);
    
        const filteredYears = [...new Set(prizeData.map((prize) => prize.year))]
          .filter((year) => year >= 1900 && year <= 2018)
          .sort((a, b) => b - a);
    
        setYears(filteredYears);
    
        const uniqueCategories = [...new Set(prizeData.map((prize) => prize.category))];
        setCategories(uniqueCategories);
    
        findMultiTimeWinners(prizeData);
      } catch (error) {
        console.error('Error fetching prizes:', error);
        setPrizes([]);
      }
    };

    fetchData();
  }, []);

  const findMultiTimeWinners = (prizeData) => {
    if (!prizeData || prizeData.length === 0) {
      console.error('Prize data is empty or undefined.');
      return;
    }
  
    const laureateCountMap = new Map();
  
    prizeData.forEach((prize) => {
      if (prize.laureates && Array.isArray(prize.laureates)) {
        prize.laureates.forEach((laureate) => {
          if (laureate && laureate.firstname && laureate.surname) {
            const laureateKey = `${laureate.firstname} ${laureate.surname}`;
            laureateCountMap.set(laureateKey, (laureateCountMap.get(laureateKey) || 0) + 1);
          }
        });
      }
    });
  
    const multiTimeWinners = [];
    laureateCountMap.forEach((count, laureateKey) => {
      if (count > 1) {
        const [firstname, surname] = laureateKey.split(' ');
        multiTimeWinners.push({ firstname, surname, count });
      }
    });
  
    setMultiTimeWinners(multiTimeWinners);
  };
  

  const handleFilterChange = () => {
    let filteredData = prizes;

    if (selectedCategory !== '') {
      filteredData = filteredData.filter((prize) => prize.category === selectedCategory);
    }

    if (selectedYear !== '') {
      filteredData = filteredData.filter((prize) => prize.year === selectedYear);
    }

    setFilteredPrizes(filteredData);
  };

  const renderPrizes = () => {
    if (!filteredPrizes || filteredPrizes.length === 0) {
      return <p>No prizes found.</p>;
    }

    return filteredPrizes.map((prize) => (
      <div key={prize.year + prize.category}>
        <h3>{`${prize.year} - ${prize.category}`}</h3>
        <p>{prize.motivation}</p>
        <ul>
          {prize.laureates &&
            prize.laureates.map((laureate) => (
              <li key={laureate.id}>{`${laureate.firstname} ${laureate.surname}`}</li>
            ))}
        </ul>
      </div>
    ));
  };

  const renderMultiTimeWinners = () => {
    if (!multiTimeWinners || multiTimeWinners.length === 0) {
      return null;
    }

    return (
      <div>
        <h2 className=''>Multiple-Time Winners</h2>
        <ul>
          {multiTimeWinners.map((winner) => (
            <li key={`${winner.firstname} ${winner.surname}`}>
              {`${winner.firstname} ${winner.surname} - Won ${winner.count} times`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Nobel Prize Winners</h1>
      <div>
        <label>
          Category:
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Year:
          <select onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>
      {renderPrizes()}
      {renderMultiTimeWinners()}
    </div>
  );
};

export default App;
