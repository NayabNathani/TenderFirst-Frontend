import Footer from "../../components/Footer/footer";
import React, { useState, useEffect } from "react";
import { Container, Table, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const MyTenders = ({ user }) => {
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTenders = async (page) => {
    setIsLoading(true);
    const limit = 10;
    const response = await axios.get(
      `http://localhost:8000/tender?limit=${limit}&page=${page}&tenderee=${user._id}`
    );
    const responseData = response.data.result.data; // Access the nested array of tenders
    setTotalPages(response.data.result.totalPages);

    if (Array.isArray(responseData) && responseData.length > 0) {
      const mappedTenders = responseData.map((tenderee) => ({
        id: tenderee._id,
        title: tenderee.title,
        body: tenderee.description,
      }));
      setTenders(mappedTenders);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTenders(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container>
        <h1 style={{ marginTop: "1rem" }}>My Tenders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tenderee, index) => (
              <tr key={tenderee.id}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>{tenderee.title}</td>
                <td>{tenderee.body}</td>
                <td>
                  <Link to={`/tender/${tenderee.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isLoading && <p>Loading...</p>}
        <Pagination>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default MyTenders;
