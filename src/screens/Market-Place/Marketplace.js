import React from "react";
//import axios from 'axios';
// import { useNavigate, Link } from "react-router-dom";
// import LoginHeader from '../../components/Login-Header/Loginnavbar';
import Footer from '../../components/Footer/footer'; 
import MarketPlaceComp from "../../components/MarketpalceCompo/MarketPlaceComp";
import Breadcrumb from "../../components/BreadCrumb/breadcrumb";


const Marketplace= ()=> {
  return (
    <>
      <Breadcrumb/>
      <br/>
      <MarketPlaceComp/>
      <div><Footer /></div>
    </>
  );
}

export default Marketplace
