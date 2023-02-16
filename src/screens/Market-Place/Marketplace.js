import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import LoginHeader from '../../components/Login-Header/Loginnavbar';
import Footer from '../../components/Footer/footer'; 
import MarketPlaceComp from "../../components/MarketpalceCompo/MarketPlaceComp";


const Marketplace= ()=> {
  return (
    <>
      <LoginHeader />
      <MarketPlaceComp/>
      <Footer />
    </>
  );
}

export default Marketplace
