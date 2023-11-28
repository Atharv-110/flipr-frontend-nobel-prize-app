import React, { useState, useEffect } from "react";
import { useTable, useFilters } from "react-table";
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

const TableComponent = () => {
  const [prizes, setPrizes] = useState([]);
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [displayedRows, setDisplayedRows] = useState(10);
  const [selectedLaureate, setSelectedLaureate] = useState(null);

  // Modal States
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prizeData = await fetchPrizes();
        setPrizes(prizeData);
        setFilteredPrizes(prizeData.slice(0, displayedRows));
        const uniqueYears = Array.from(
          new Set(prizeData.map((prize) => prize.year))
        )
          .filter((year) => year >= 1900 && year <= 2018)
          .sort((a, b) => b - a);
        setYears(uniqueYears);
        setCategories([...new Set(prizeData.map((prize) => prize.category))]);
      } catch (error) {
        console.error("Error fetching prizes:", error);
        setPrizes([]);
      }
    };

    fetchData();
  }, [displayedRows]);

  const handleFilterChange = () => {
    let filteredData = [...prizes];

    if (selectedCategory) {
      filteredData = filteredData.filter(
        (prize) => prize.category === selectedCategory
      );
    }

    if (selectedYear) {
      filteredData = filteredData.filter(
        (prize) => prize.year === selectedYear
      );
    }

    setFilteredPrizes(filteredData.slice(0, displayedRows));
  };

  const handleLoadMore = () => {
    // Disable load more if a specific category or year is selected
    if (selectedCategory || selectedYear) {
      return;
    }
    setDisplayedRows((prevDisplayedRows) => prevDisplayedRows + 10);
  };

  // Table Creation
  const columns = React.useMemo(
    () => [
      { Header: "Year", accessor: "year" },
      { Header: "Category", accessor: "category" },
      {
        Header: "Laureates",
        accessor: "laureates",
        Cell: ({ value }) => (
          <ul>
            {value &&
              value.map((laureate) => (
                <li
                  key={laureate.id}
                  onClick={() => handleLaureateClick(laureate)}
                  className="w-fit text-blue-500 hover:text-blue-600 cursor-pointer"
                >
                  {`${laureate.firstname ? laureate.firstname : ""} ${
                    laureate.surname ? laureate.surname : ""
                  }`}
                </li>
              ))}
          </ul>
        ),
      },
    ],
    []
  );

  const handleLaureateClick = (laureate) => {
    setSelectedLaureate(laureate);
    handleOpen();
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredPrizes,
      },
      useFilters
    );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="outline-none"
      >
        <Box sx={style}>
          <div className="w-full bg-white inner-boxshadow px-4 py-5 rounded-lg">
            {selectedLaureate && (
              <div>
                <h2 className="gradient-text font-bold text-[2rem] text-center mb-5 tracking-wide">{`${selectedLaureate.firstname} ${selectedLaureate.surname}`}</h2>
                <div className="border border-dashed border-gray-600 rounded-md p-4 relative">
                  <i class="fa-solid fa-quote-left text-gray-600 px-0.5 absolute top-[-17px] left-2 bg-white text-[2rem]"></i>
                  <p className="px-1 absolute top-[-9px] text-gray-600 bg-white border-dashed border border-gray-600 tracking-wide right-2 rounded-md text-[0.7rem] w-fit">
                    Motivation
                  </p>
                  <p className="capitalize text-center font-medium text-black">
                    {selectedLaureate.motivation.slice(
                      1,
                      selectedLaureate.motivation.length - 1
                    )}
                  </p>
                  <i class="fa-solid fa-quote-right text-gray-600 px-0.5 absolute bottom-[-17px] right-2 bg-white text-[2rem]"></i>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
      <div className="w-full lg:w-[75%] rounded-lg px-2 py-5 lg:px-4 inner-boxshadow">
        <div className="flex justify-center flex-wrap items-center lg:justify-end pb-5">
          <label className="mr-3">
            Category:
            <select
              className="filter-select"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="mr-4">
            Year:
            <select
              className="filter-select"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <button
            className="btn gradient-btn mt-2 lg:mt-0"
            onClick={handleFilterChange}
          >
            Apply Filters
          </button>
        </div>
        <table
          className="border-collapse rounded-md overflow-hidden z-10"
          {...getTableProps()}
          style={{ width: "100%" }}
        >
          <thead className="">
            {headerGroups.map((headerGroup) => (
              <tr
                className="flex-start bg-[#ffe1a7]"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="w-full text-left py-3 pl-2 capitalize font-semibold lg:text-lg tracking-wide"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  className="flex-start border-x-2 border-t-2 border-[#ffe1a7] bg-[#c5751814]"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="w-full text-xs lg:text-base py-1 pl-2 capitalize font-medium tracking-wide"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn gradient-btn mt-4" onClick={handleLoadMore}>
          Load More Rows
        </button>
      </div>
    </>
  );
};

export default TableComponent;
