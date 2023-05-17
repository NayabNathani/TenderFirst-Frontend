import Footer from "../../components/Footer/footer";
import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Container, Table, Pagination, Dropdown, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../../config";
import Rating from "react-rating-stars-component";

const MyTenders = ({ user }) => {
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  // const [showModal, setShowModal] = useState(false);

  const fetchTenders = async (page) => {
    setIsLoading(true);
    const limit = 10;
    const response = await axios.get(
      API_URL + `/tender?limit=${limit}&page=${page}&tenderee=${user._id}`,
      { withCredentials: true }
    );
    const responseData = response.data.result.data; // Access the nested array of tenders
    setTotalPages(response.data.result.totalPages);

    if (Array.isArray(responseData) && responseData.length > 0) {
      const mappedTenders = responseData.map((tenderee) => ({
        id: tenderee._id,
        title: tenderee.title,
        body: tenderee.description,
        status: tenderee.status,
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

  const handleCompleted = async (id) => {
    try {
      await axios.post(
        API_URL + `/tender/${id}/status`,
        { status: "completed" },
        { withCredentials: true }
      );
      setIsCompleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        API_URL + "/rating/add",
        {
          userId: tenders.find((tender) => tender.tenderer._id)
            .tendererId,
          rating: rating,
        },
        { withCredentials: true }
      );
      setIsCompleted(false);
      setRating(0);
      alert("Thank you for your rating!");
    } catch (error) {
      console.error(error);
    }
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
            {tenders.map((tenderee, index) => (
              <tr key={tenderee.id}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>{tenderee.title}</td>
                <td>{tenderee.body}</td>
                <td>
                  <Link to={`/mytender/${tenderee.id}`}>View Details</Link>
                </td>
                <td style={{ alignItems: "center", textAlign: "center" }}>
                  {tenderee.status === "active" ? (
                    <Dropdown>
                      <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        {tenderee.status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            handleCompleted(tenderee.id);
                            setIsCompleted(true);
                          }}
                          style={{ color: "black" }}
                        >
                          Completed
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <MDBBtn
                      color={
                        tenderee.status === "pending"
                          ? "danger"
                          : tenderee.status === "approved"
                          ? "success"
                          : tenderee.status === "completed"
                          ? "success"
                          : tenderee.status === "rejected"
                          ? "danger"
                          : ""
                      }
                      className={
                        tenderee.status === "approved" ||
                        tenderee.status === "pending"
                          ? "opacity-70"
                          : {}
                      }
                    >
                      {tenderee.status}
                    </MDBBtn>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={isCompleted} onHide={() => setIsCompleted(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rate the Tenderer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please rate the tenderer out of 5 stars:</p>
          <div className="rating-stars">
            <Rating
              count={5}
              onChange={(rating) => setRating(rating)}
              size={24}
              activeColor="#ffd700"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={handleRatingSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
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

export default MyTenders;
