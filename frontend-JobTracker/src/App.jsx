import { useState } from "react";
import "./App.css";
// import Dashboard from "./Compoents/Dashboard";
import { Pipline } from "./Compoents/Pipline";
import SideBar from "./Compoents/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Compoents/Home";
import ListOfApplications from "./Compoents/ListOfApplications";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <SideBar />
          <div className="data">
            <Routes>
              <Route path="/" element={<Pipline />} />
              <Route path="/listOfApps" element={<ListOfApplications/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;