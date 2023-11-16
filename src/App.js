import "./App.css";

// Components Import
import Navbar from "./components/Navbar";
import TableComponent from "./components/TableComponent";
import SidebarComponent from "./components/SidebarComponent";

const App = () => {

  return (
    <div className="App">
      <Navbar />
      <h1 className="mt-[7rem] text-[2.5rem] lg:text-[3rem] tracking-wide font-semibold text-gray-600 text-center"><span className="gradient-text">Nobel Prize </span> Winners 🥇</h1>
      <p className="text-center p-2 text-[0.8rem] lg:text-[1rem] text-gray-600 tracking-wide">Unveiling Brilliance, Celebrating Excellence — Your Gateway to Nobel Laureates' Legacy!</p>
      <div className="w-[95%] flex-between my-10">
      <TableComponent />
      <SidebarComponent />
      </div>
    </div>
  );
};

export default App;
