import React from "react";
import Footer from '../../components/Footer/footer'; 
import MarketPlaceComp from "../../components/MarketpalceCompo/MarketPlaceComp";
import Breadcrumb from "../../components/BreadCrumb/breadcrumb";


const Marketplace= ()=> {
  return (
    <>
      <Breadcrumb/>
      <br/>
      <MarketPlaceComp/>
      
      <div style={{ marginBottom: "15rem" }}></div>
      <div style={{bottom: 0, width: "100%" }}><Footer /></div>
      {/* <Footer /> */}
    </>
  );
}

export default Marketplace
