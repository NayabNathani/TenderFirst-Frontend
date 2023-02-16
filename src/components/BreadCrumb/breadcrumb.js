import React from 'react'
import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';


const Breadcrumb= ()=> {

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <>
      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>{pathnames}</h2>
              <nav>
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                      <li key={index}>
                        <Link to={routeTo}>{name}</Link>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div></div></section></main>
    </>

  )
}

export default Breadcrumb
