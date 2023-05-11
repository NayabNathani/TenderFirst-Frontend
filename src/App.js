import React, { Fragment } from "react";
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
            <Route path="*" element={<NotFound />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detailpage" element={<DetailPage />} />
            <Route path="/opentender" element={<OpenTender />} />
            </Routes>
            {/* {
              isAuthenticated ? (
            <>
              
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/updateprofile" element={<UpdateProfile />} />
              <Route path="/mytender" element={<MyTenders user={user} />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/opentender" element={<OpenTender />} />
              <Route path="/detailpage" element={<DetailPage />} />
            </>
              ) : (
              <Route path="/login" element={<Navigate to="/login" />} />
              )
            } */}



          

          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
