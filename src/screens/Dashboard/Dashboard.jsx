import React from "react";
import Footer from "../../components/Footer/footer";
// import { Box, Text, Heading, Flex } from "@chakra-ui/react";
// import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const [tenders, setTenders] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   //   const fetchTenders = async () => {
  //   //     const response = await axios.get('/api/tenders');
  //   //     setTenders(response.data);
  //   //   };
  //   //   fetchTenders();

  //   setTenders(dummyTenders);
  // }, [setTenders]);

  return (
    <>
      <section
        id="hero"
        className="d-flex align-items-center justify-content-center"
      >
        <div className="container" data-aos="fade-up">
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="col-xl-6 col-lg-8">
              <h1>
                Smart Contract based e-Tendering System<span>.</span>
              </h1>
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
      <Footer />
      <a
        href="#hero"
        className="back-to-top d-flex align-items-center justify-content-center active"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default Dashboard;
