import Footer from "../../components/Footer/footer";
import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Container, Table, Pagination, Dropdown, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../../config";
import Rating from "react-rating-stars-component";
import { toast } from "react-hot-toast";

const MyTenders = ({ user }) => {
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tendererIds, setTendererIds] = useState("");
  const [rating, setRating] = useState(0);
  const [flag, setFlag] = useState(false);
  const [expandedTenders, setExpandedTenders] = useState([]);

  const fetchTenders = async (page) => {
    setIsLoading(true);
    const limit = 10;
    const response = await axios.get(
      API_URL + `/tender?limit=${limit}&page=${page}&tenderee=${user._id}`,
      { withCredentials: true }
    );
    const responseData = response.data.result.data; // Access the nested array of tenders
    // console.log(response.data.result.data);
    setTotalPages(response.data.result.totalPages);

    if (Array.isArray(responseData) && responseData.length > 0) {
      const mappedTenders = responseData.map((tender) => {
        const tendererId = tender.tenderer && tender.tenderer._id;
        return {
          id: tender._id,
          title: tender.title,
          body: tender.description,
          status: tender.status,
          tendererId: tendererId || null, 
        };
      });
      // console.log(mappedTenders)
      setTenders(mappedTenders);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTenders(currentPage);
  }, [currentPage, flag]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCompleted = async (id) => {
    try {
      await axios.post(
        API_URL + `/tender/completed`,
        { 
          tenderId: id,
          status: "completed" 
        },
        { 
          withCredentials: true 
        }
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
          userId: tendererIds,
          rating: rating,
        },
        { withCredentials: true }
      );
      setIsCompleted(false);
      setRating(0);
      setFlag(!flag)
      toast.success("Thank You For Your Rating!!");
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
                <td>
                  {tenderee.body.length > 100 &&
                  !expandedTenders.includes(tenderee.id)
                    ? tenderee.body.substring(0, 100) + "..."
                    : tenderee.body}
                  {tenderee.body.length > 100 && (
                    <button
                      className="btn btn-link p-0 ms-2"
                      onClick={() =>
                        setExpandedTenders((prevState) =>
                          prevState.includes(tenderee.id)
                            ? prevState.filter((id) => id !== tenderee.id)
                            : [...prevState, tenderee.id]
                        )
                      }
                    >
                      {expandedTenders.includes(tenderee.id)
                        ? "See less"
                        : "See more"}
                    </button>
                  )}
                </td>
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
                            setTendererIds(tenderee.tendererId);
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
              onChange={(rating) => {setRating(rating)}}
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
