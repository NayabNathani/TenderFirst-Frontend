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
        {/* <div style={{ position: 'absolute', bottom: 0, width: '100%' }}> */}
        <br/>
        <div>
        <Footer />
      </div>
    </>
  )
}

export default DetailPage
