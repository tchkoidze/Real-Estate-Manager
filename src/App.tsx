import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Listings from "./pages/Listings";
import AddListing from "./pages/AddListing";
import Header from "./layouts/Header";
import AddAgent from "./components/AddAgent";
import PropertPage from "./pages/PropertyPage";

function App() {
  const [openAddAgent, setOpenAddAgent] = useState(false);

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
