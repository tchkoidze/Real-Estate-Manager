import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Listings from "./pages/Listings";
import AddListing from "./pages/AddListing";
import Header from "./layouts/Header";
import AddAgent from "./components/AddAgent";
import PropertPage from "./pages/PropertyPage";

function App() {
  const [openAddAgent, setOpenAddAgent] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("openAddAgent")!);
  useEffect(() => {
    if (storedData) {
      setOpenAddAgent(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("openAddAgent", JSON.stringify(openAddAgent));
  }, [openAddAgent]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Listings setOpenAddAgent={setOpenAddAgent} />}
        ></Route>
        <Route
          path="/addListing"
          element={<AddListing setOpenAddAgent={setOpenAddAgent} />}
        />
        <Route path="/property/:id" element={<PropertPage />} />
      </Routes>

      {openAddAgent && <AddAgent setOpenAddAgent={setOpenAddAgent} />}
    </>
  );
}

export default App;
