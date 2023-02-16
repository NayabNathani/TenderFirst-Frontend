import React from 'react'
import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Index from './screens/Index-page/index-page.js'
import Login from './screens/Login-page/loginPage.js'
import Marketplace from './screens/Market-Place/Marketplace';
import DetailPage from './screens/Detail-Page/DetailPage';
import Breadcrumb from './components/BreadCrumb/breadcrumb';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={< Index/>} />
          <Route path="/Login" element={< Login/>} />
          <Route path="/Marketplace" element={< Marketplace/>} />
          <Route path="/Detailpage" element={< DetailPage/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
