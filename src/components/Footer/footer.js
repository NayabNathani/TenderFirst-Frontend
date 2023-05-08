import React from 'react'

function footer() {
  return (
    <>
        <footer id="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-5 col-md-6">
            <div className="footer-info">
              <h3>TF<span>.</span></h3>
              <p>
              St-4, Sector 17-D, NH 5, <br/>
              Karachi, Karachi City, Sindh<br/><br/>
                <strong>Phone:</strong> +1 5589 55488 55<br/>
                <strong>Email:</strong> info@tenderfirst.com<br/>
              </p>
              <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong><span>TF</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
        
        Designed by <a href="#">TEAM Tender First</a>
      </div>
    </div>
  </footer>
    </>
  )
}

export default footer
