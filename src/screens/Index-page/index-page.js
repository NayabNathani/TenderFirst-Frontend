import React from 'react';
// import IndexNavbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer'; 

function indexpage() {
  return (
    <>
        <section id="hero" className="d-flex align-items-center justify-content-center">
    <div className="container" data-aos="fade-up">

      <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
        <div className="col-xl-6 col-lg-8">
          <h1>Smart Contract based e-Tendering System<span>.</span></h1>
          <h2></h2>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- ======= About Section ======= --> */}
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src="assets/img/about.jpg" className="img-fluid" alt=""/>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100">
            <h3>About Tender First</h3>
            {/* <p className="fst-italic">
            The world is embracing change and automation very fondly and a lot of new technologies are emerging as a result of this fondness.
            </p> */}
            {/* <ul>
              <li><i className="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li><i className="ri-check-double-line"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
              <li><i className="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
            </ul> */}
            <p>
            Wrongful tender management leads to huge losses in case of faulty practices. This includes favoring contractors, improper record maintenance, lack of transparency, hacking, data modification and other issues. Furthermore, the number of independent service providers is increasing day by day. Some of them are legit while some cause harm to the tenderers by exploiting vulnerabilities. In other words, they are deceiving them by showing their insightful portfolio and by bidding on different projects all the while not having a sound knowledge of the kind of project. To eliminate vulnerabilities and stop these frugal activities we have come up with an idea to implement a safe, decentralized and automated platform using the secure Blockchain technology and smart contracts to design such a distributed ledger which maintains all the records of synchronized transactions and automate these transactions that happen between the tenderers and the vendors.
            </p>
          </div>
        </div>

      </div>
    </section>

    {/* <!-- ======= Team Section ======= --> */}
    <section id="team" className="team">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Team</h2>
          <p>Check our Team</p>
        </div>

        <div className="row">

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="100">
              <div className="member-img">
                <img src="assets/img/team/team-1.png" className="img-fluid" alt=""/>
                <div className="social">
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Ali Nayab Nathani</h4>
                <span>Chief Executive Officer</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="200">
              <div className="member-img">
                <img src="assets/img/team/team-2.png" className="img-fluid" alt=""/>
                <div className="social">

                  <a href=""><i className="bi bi-facebook"></i></a>

                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Tuaha Ejaz</h4>
                <span>Chief Executive Officer</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="300">
              <div className="member-img">
                <img src="assets/img/team/team-3.jpg" className="img-fluid" alt=""/>
                <div className="social">
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>Abu Bakr</h4>
                <span>Chief Executive Officer</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <Footer/>
  <a href="#hero" className="back-to-top d-flex align-items-center justify-content-center active"><i className="bi bi-arrow-up-short"></i></a>
    </>
  )
}

export default indexpage
