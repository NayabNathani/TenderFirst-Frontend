import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Index from "./screens/Index-page/index-page.js";
import Login from "./screens/Login-page/loginPage.js";
import Marketplace from "./screens/Market-Place/Marketplace";
import DetailPage from "./screens/Detail-Page/DetailPage";
import Breadcrumb from "./components/BreadCrumb/breadcrumb";
import Loader from "./components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import { ProtectedRoute } from "protected-route";
import Dashboard from "./screens/Dashboard/Dashboard";
import OpenTender from "./screens/OpenTender/OpenTender";
import Profile from "./screens/Profile/Profile";
import UpdateProfile from "./screens/Profile/updateProfile";
import MyTenders from "./screens/MyTender/MyTender";

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });

  const { loading, user, error } = useSelector(
    (state) => state.user
  );

  const LoginSuccess = useSelector(state => state.loginSuccess);
  const LoginFail = useSelector(state => state.loginFail);

  const dispatch = useDispatch();

  useEffect(() => {
    if (LoginFail) {
      toast.error("ERROR");
      dispatch({ type: "clearError" });
    } 
    if(LoginSuccess)
      toast.error(`Welcome Back ${user.name}` );
  }, [dispatch, error]);

  let isAllowed = true

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAllowed={isAllowed} user={user} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/mytender" element={<MyTenders />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/opentender" element={<OpenTender />} />
            <Route path="/detailpage" element={<DetailPage />} />
          </Routes>
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
