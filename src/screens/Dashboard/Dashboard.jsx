import React, { useState } from "react";
import Footer from "../../components/Footer/footer"
import { Box, Text, Heading,Flex} from "@chakra-ui/react";
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import './Dashboard.css';
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';


const Dashboard = () => {

    const [tenders, setTenders] = useState([]);

    const dummyTenders = [
        {
          id: 1,
          title: 'Tender 1',
          description: 'This is the description for Tender 1.',
          category: 'Category A',
          deadline: '2023-06-01',
          budget: 5000,
          location: 'City A',
          status: 'Open'
        },
        {
          id: 2,
          title: 'Tender 2',
          description: 'This is the description for Tender 2.',
          category: 'Category B',
          deadline: '2023-06-15',
          budget: 10000,
          location: 'City B',
          status: 'Closed'
        },
        {
          id: 3,
          title: 'Tender 3',
          description: 'This is the description for Tender 3.',
          category: 'Category A',
          deadline: '2023-07-01',
          budget: 7500,
          location: 'City C',
          status: 'Open'
        },
        {
          id: 4,
          title: 'Tender 4',
          description: 'This is the description for Tender 4.',
          category: 'Category C',
          deadline: '2023-07-15',
          budget: 15000,
          location: 'City D',
          status: 'Open'
        },
        {
          id: 5,
          title: 'Tender 5',
          description: 'This is the description for Tender 5.',
          category: 'Category B',
          deadline: '2023-08-01',
          budget: 8000,
          location: 'City E',
          status: 'Closed'
        }
      ];

      const { isAuthenticated } = useSelector((state) => state.user);
      const navigate = useNavigate();

      useEffect(() => {
        if (!isAuthenticated) {
          navigate("/login");
        }
      }, [isAuthenticated]);

      

    useEffect(() => {
    //   const fetchTenders = async () => {
    //     const response = await axios.get('/api/tenders');
    //     setTenders(response.data);
    //   };
    //   fetchTenders();

    setTenders(dummyTenders);
    }, [setTenders]);

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

      <Box border="5px solid #2D3748" borderRadius="md" p="4">
        <Heading size="md" justifyContent="flex-start" fontWeight="bold" pb="4">
          Top Tenders
        </Heading>
        <Flex flexWrap="wrap" justifyContent="space-between">
          {tenders.map((tender) => (
            <Box
              key={tender.id}
              w={{ sm: "100%", md: "48%", lg: "30%" }}
              mb="4"
            >
              <Box bg="white" boxShadow="md" rounded="lg" p="4" h="100%">
                <Text fontSize="sm" color="gray.600" mb="2">
                  {tender.category}
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  lineHeight="short"
                  mb="2"
                  isTruncated
                >
                  {tender.title}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  lineHeight="tall"
                  maxH="36"
                  overflow="hidden"
                >
                  {tender.description}
                </Text>
                <Box mt="auto">
                <Button className="my-button" size="sm">
                  View Details
                </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

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
