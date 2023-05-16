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
