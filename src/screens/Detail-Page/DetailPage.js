import React from 'react'
import './detailPage.css'
import Footer from '../../components/Footer/footer'; 
import DetailCompo  from '../../components/Detailpage-Compo/DetailCompo';
import Breadcrumb from '../../components/BreadCrumb/breadcrumb';

const DetailPage = () => {
  return (
    <>
        <Breadcrumb/>
        <DetailCompo/>
        <Footer/>
    </>
  )
}

export default DetailPage
