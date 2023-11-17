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
    <div className="w-[24%] rounded-lg hidden inner-boxshadow px-4 py-5 lg:block">
      <h2 className="text-center mb-5 font-medium">Won More Than Once</h2>
      <ul >
        {multiTimeWinners.map((winner) => (
          <li className="p-3 w-full bg-[#ffe1a7] flex items-center justify-between mb-4 rounded-md tracking-wide font-medium"  key={`${winner.firstname} ${winner.surname}`}>
            <p>{`${winner.firstname} ${winner.surname}`}</p>
            <p className="bg-[#c5741849] px-2 py-1 rounded-[2rem]">{`${winner.count} times`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
