import "./App.css";

// Components Import
import Navbar from "./components/Navbar";
import TableComponent from "./components/TableComponent";
import SidebarComponent from "./components/SidebarComponent";

const App = () => {

  return (
    <div className="App">
      <Navbar />
      <div className="w-[95%] flex-between mt-[6rem]">
      <TableComponent />
      <SidebarComponent />
      </div>
    </div>
  );
};

export default App;
