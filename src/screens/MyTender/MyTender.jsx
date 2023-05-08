import Footer from "../../components/Footer/footer"
import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';


const MyTendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dummyData = [
    { id: 1, title: "Tender 1", body: "This is the body of Tender 1" },
    { id: 2, title: "Tender 2", body: "This is the body of Tender 2" },
    { id: 3, title: "Tender 3", body: "This is the body of Tender 3" },
    { id: 4, title: "Tender 4", body: "This is the body of Tender 4" },
    { id: 5, title: "Tender 5", body: "This is the body of Tender 5" },
    { id: 6, title: "Tender 6", body: "This is the body of Tender 6" },
    { id: 7, title: "Tender 7", body: "This is the body of Tender 7" },
    { id: 8, title: "Tender 8", body: "This is the body of Tender 8" },
    { id: 9, title: "Tender 9", body: "This is the body of Tender 9" },
    { id: 10, title: "Tender 10", body: "This is the body of Tender 10" },
    { id: 11, title: "Tender 1", body: "This is the body of Tender 1" },
    { id: 12, title: "Tender 2", body: "This is the body of Tender 2" },
    { id: 13, title: "Tender 3", body: "This is the body of Tender 3" },
    { id: 14, title: "Tender 4", body: "This is the body of Tender 4" },
    { id: 15, title: "Tender 5", body: "This is the body of Tender 5" },
    { id: 16, title: "Tender 6", body: "This is the body of Tender 6" },
    { id: 17, title: "Tender 7", body: "This is the body of Tender 7" },
    { id: 18, title: "Tender 8", body: "This is the body of Tender 8" },
    { id: 19, title: "Tender 9", body: "This is the body of Tender 9" },
    { id: 20, title: "Tender 10", body: "This is the body of Tender 10" },
    // { id: 21, title: "Tender 1", body: "This is the body of Tender 1" },
    // { id: 22, title: "Tender 2", body: "This is the body of Tender 2" },
    // { id: 23, title: "Tender 3", body: "This is the body of Tender 3" },
    // { id: 24, title: "Tender 4", body: "This is the body of Tender 4" },
    // { id: 25, title: "Tender 5", body: "This is the body of Tender 5" },
    // { id: 26, title: "Tender 6", body: "This is the body of Tender 6" },
    // { id: 27, title: "Tender 7", body: "This is the body of Tender 7" },
    // { id: 28, title: "Tender 8", body: "This is the body of Tender 8" },
    // { id: 29, title: "Tender 9", body: "This is the body of Tender 9" },
    // { id: 30, title: "Tender 10", body: "This is the body of Tender 10" },
  ];

//   const fetchTenders = async () => {
//     setIsLoading(true);
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`);
//     setTenders((prevTenders) => [...prevTenders, ...response.data]);
//     setCurrentPage(currentPage + 1);
//     setIsLoading(false);
//   };

const fetchTenders = async () => {
    setIsLoading(true);
    // const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`);
    const response = dummyData.slice((currentPage - 1) * 10, currentPage * 10);
    setTenders((prevTenders) => [...prevTenders, ...response]);
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
  };
  

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      fetchTenders();
    }
  };

  useEffect(() => {
    fetchTenders();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Container>
      <h1 style={{ marginTop: '1rem' }}>My Tenders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, index) => (
            <tr key={tender.id}>
              <td>{index + 1}</td>
              <td>{tender.title}</td>
              <td>{tender.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isLoading && <p>Loading...</p>}
    </Container>
    <div><Footer/></div>
    </>
  );
};

export default MyTendersPage;

