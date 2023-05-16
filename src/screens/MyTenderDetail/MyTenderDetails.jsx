import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Pagination,
} from "react-bootstrap";
import { FaSadTear } from "react-icons/fa";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_URL from "../../config";

const TenderBids = () => {
  const [bids, setBids] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bidsPerPage = 10;

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(API_URL + `/tender/bids?tenderId=${id}`, { withCredentials: true })
      .then((response) => {
        setBids(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Get current bids
  const indexOfLastBid = currentPage * bidsPerPage;
  const indexOfFirstBid = indexOfLastBid - bidsPerPage;
  const currentBids = bids.slice(indexOfFirstBid, indexOfLastBid);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // console.log(bids);

  return (
    <>
      <Container>
        <h1>Tender Bids</h1>
        <hr />
        {bids.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <h1>No Bids Yet</h1>
            <FaSadTear size={48} style={{ color: "#6c757d" }} />
          </div>
        ) : (
          currentBids.map((bid) => (
            <Card key={bid.id} className="my-3">
              <Card.Body>
                <Card.Title>Wallet Address: {bid.publishers[0]}</Card.Title>
                <hr />
                <Card.Text>Message:</Card.Text>
                <Card.Text>{bid.data.comments}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <hr />
                <ListGroupItem>
                  Estimated Cost: {bid.data.estimatedCost}
                </ListGroupItem>
                <ListGroupItem>
                  Estimated Days: {bid.data.estimatedDays}
                </ListGroupItem>
                <ListGroupItem>
                  Experience: {bid.data.experience}
                </ListGroupItem>
              </ListGroup>
              {bid.key && bid.key[0] === "winner" ? (
                <div className="bg-success p-2 text-dark bg-opacity-25">
                  Winner Bid
                </div>
              ) : null}
            </Card>
          ))
        )}
        {bids.length > 0 && (
          <Pagination className="my-3">
            {[...Array(Math.ceil(bids.length / bidsPerPage)).keys()].map(
              (pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        )}
      </Container>
      <div style={{ marginBottom: "5rem" }}></div>
      <Footer />
    </>
  );
};

export default TenderBids;
