import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Index from "./screens/Index-page/index-page.js";
import Login from "./screens/Login-page/loginPage.js";
import Marketplace from "./screens/Market-Place/Marketplace";
import DetailPage from "./screens/Detail-Page/DetailPage";
import Loader from "./components/Loader/Loader";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./screens/Dashboard/Dashboard";
import OpenTender from "./screens/OpenTender/OpenTender";
import Profile from "./screens/Profile/Profile";
import UpdateProfile from "./screens/Profile/updateProfile";
import MyTenders from "./screens/MyTender/MyTender";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import MyTenderDetails from "./screens/MyTenderDetail/MyTenderDetails";
import MarketPlaceDetails from "./screens/MarketPlaceDetailPage/marketplaceDetails";
import OnGoingProjects from "./screens/OnGoingProjects/OnGoingProjects";


function App() {
  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {
              isAuthenticated ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile user={user} />} />
                  <Route path="/updateprofile" element={<UpdateProfile />} />
                  <Route path="/mytender" element={<MyTenders user={user} />} />
                  <Route path="/myprojects" element={<OnGoingProjects user={user} />} />
                  <Route path="/mytender/:id" element={<MyTenderDetails />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/:id" element={<MarketPlaceDetails />} />
                  <Route path="/opentender" element={<OpenTender />} />
                  {/* <Route path="/detailpage" element={<DetailPage />} /> */}
                  
                </>
              ) : (
                <Route path="/login" element={<Navigate to="/login" />} />
              )
            }

            <Route path="*" element={<NotFound />} />
          </Routes>




          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
