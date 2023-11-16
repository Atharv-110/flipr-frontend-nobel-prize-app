import React, { useState, useEffect } from "react";
import { fetchPrizes } from "../api";

const SidebarComponent = () => {
  const [multiTimeWinners, setMultiTimeWinners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prizeData = await fetchPrizes();

        findMultiTimeWinners(prizeData);
      } catch (error) {
        console.error("Error fetching prizes:", error);
      }
    };

    fetchData();
  }, []);

  const findMultiTimeWinners = (prizeData) => {
    if (!prizeData || prizeData.length === 0) {
      console.error("Prize data is empty or undefined.");
      return;
    }

    const laureateCountMap = new Map();

    prizeData.forEach((prize) => {
      if (prize.laureates && Array.isArray(prize.laureates)) {
        prize.laureates.forEach((laureate) => {
          if (laureate && laureate.firstname && laureate.surname) {
            const laureateKey = `${laureate.firstname} ${laureate.surname}`;
            laureateCountMap.set(
              laureateKey,
              (laureateCountMap.get(laureateKey) || 0) + 1
            );
          }
        });
      }
    });

    const multiTimeWinners = [];
    laureateCountMap.forEach((count, laureateKey) => {
      if (count > 1) {
        const [firstname, surname] = laureateKey.split(" ");
        multiTimeWinners.push({ firstname, surname, count });
      }
    });

    setMultiTimeWinners(multiTimeWinners);
  };

  if (!multiTimeWinners || multiTimeWinners.length === 0) {
    return (
      <>
        <h1>No one have won Nobel Prize more than once</h1>
      </>
    );
  }

  return (
    <div className="w-[25%] hidden lg:block">
      <h2 className="">Multiple-Time Winners</h2>
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

export default SidebarComponent;
