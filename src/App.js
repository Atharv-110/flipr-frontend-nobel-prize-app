import "./App.css";

// Components Import
import Navbar from "./components/Navbar";
import TableComponent from "./components/TableComponent";
import SidebarComponent from "./components/SidebarComponent";
import MoreThanOneButton from "./components/MoreThanOneButton";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <MoreThanOneButton />
      <Navbar />
      <div className="relative z-10 flex justify-center items-center flex-col mx-auto sm:px-10">
        <h1 className="mt-[7rem] text-[2.5rem] lg:text-[3rem] tracking-wide font-semibold text-gray-600 text-center">
          <span className="gradient-text">Nobel Prize </span> Winners 🥇
        </h1>
        <p className="text-center p-2 text-[0.8rem] lg:text-[1rem] text-gray-600 tracking-wide">
          Unveiling Brilliance, Celebrating Excellence — Your Gateway to Nobel
          Laureates' Legacy!
        </p>
        <div className="w-[95%] flex-between my-10">
          <TableComponent />
          <SidebarComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
