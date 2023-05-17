import Footer from "../../components/Footer/footer";
import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import {
  Container,
  Table,
  Pagination,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../../config";
import Rating from "react-rating-stars-component";

const OnGoingProjects = ({ user }) => {
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTenders = async (page) => {
    setIsLoading(true);
    const limit = 10;
    const response = await axios.get(
      API_URL + `/tender?limit=${limit}&page=${page}&tendererId=${user._id}`,
      { withCredentials: true }
    );
    const responseData = response.data.result.data; // Access the nested array of tenders
    setTotalPages(response.data.result.totalPages);

    if (Array.isArray(responseData) && responseData.length > 0) {
      const mappedTenders = responseData.map((tenderer) => ({
        id: tenderer._id,
        title: tenderer.title,
        body: tenderer.description,
        status: tenderer.status,
      }));
      // console.log(mappedTenders)
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tenderer, index) => (
              <tr key={tenderer.id}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>{tenderer.title}</td>
                <td>{tenderer.body}</td>
                <td>
                  <Link to={`/mytender/${tenderer.id}`}>View Details</Link>
                </td>
                <td style={{ alignItems: "center", textAlign: "center" }}>
                  <MDBBtn
                    color={
                        tenderer.status === "pending"
                        ? "danger"
                        : tenderer.status === "approved"
                        ? "success"
                        : tenderer.status === "completed"
                        ? "success"
                        : tenderer.status === "rejected"
                        ? "danger"
                        : ""
                    }
                    className={
                        tenderer.status === "approved" ||
                        tenderer.status === "pending"
                        ? "opacity-70"
                        : {}
                    }
                  >
                    {tenderer.status}
                  </MDBBtn>
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
      <div style={{ marginBottom: "5rem" }}></div>

      <Footer />
    </>
  );
};

export default OnGoingProjects;
