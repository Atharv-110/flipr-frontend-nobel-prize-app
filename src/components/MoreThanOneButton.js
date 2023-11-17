import { useState, useEffect } from "react";
import { fetchPrizes } from "../api";

// MUI Modal Component Import
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  bgcolor: "white",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "16px",
  border: "2px solid white",
  boxShadow: 24,
  p: "8px",
};

const MoreThanOneButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-[25px] right-[25px] w-[60px] h-[60px] rounded-full p-2 lg:hidden gradient-full font-semibold text-[1.3rem] z-50"
      >
        &#62; 1
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-full bg-white inner-boxshadow px-4 py-5 rounded-lg">
            <h2 className="text-center mb-5 font-medium">Won More Than Once</h2>
            <ul>
              {multiTimeWinners.map((winner) => (
                <li
                  className="p-3 w-full bg-[#ffe1a7] flex items-center justify-between mb-4 rounded-md tracking-wide font-medium"
                  key={`${winner.firstname} ${winner.surname}`}
                >
                  <p>{`${winner.firstname} ${winner.surname}`}</p>
                  <p className="bg-[#c5741849] px-2 py-1 rounded-[2rem]">{`${winner.count} times`}</p>
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MoreThanOneButton;
