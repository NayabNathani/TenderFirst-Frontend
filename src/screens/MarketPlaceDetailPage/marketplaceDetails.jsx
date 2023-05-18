import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import API_URL from "../../config";
// import { Bs} from 'react-icons/bs'

const MarketPlaceDetails = () => {
  const [Tenders, setTenders] = useState([]);
  const [estimatedCost, setEstimatedCost] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [experience, setExperience] = useState("");
  const [contractAgreement, setContractAgreement] = useState("");
  const [comments, setComments] = useState("");
  const { id } = useParams();
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [isBidAvailable, setIsBidAvailable] = useState(true);

  const { user } = useSelector((state) => state.user);

  const GreenTickIcon = () => (
    <FaCheckCircle
      color="green"
      size={90}
      style={{ marginBottom: "1rem", marginTop: "2rem" }}
    />
  );

  useEffect(() => {
    axios
      .get(API_URL + `/tender?_id=${id}`, { withCredentials: true })
      .then((response) => {
        setTenders(response.data.result.data);
      })
      .catch((error) => {
        console.error(`Error fetching Tenders: ${error.message}`);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + "/tender/add-bid",
        {
          tenderId: id,
          estimatedCost,
          estimatedDays,
          experience,
          contractAgreement,
          comments,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setBidSubmitted(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(API_URL + `/tender/specific-bid?tenderId=${id}&key=${user._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.result.length > 0) {
          console.log("Bid exists");
          setIsBidAvailable(false);
        } else {
          console.log("Bid does not exist");
          setIsBidAvailable(true);
        }
      })
      .catch((error) => {
        console.error(`Error checking Tender Bid: ${error.message}`);
      });
  }, []);

  return (
    <>
      <h1 style={{ marginTop: "1rem" }}>Tender Details</h1>
      <Row>
        <Col md={8}>
          {Tenders.map((Tender) => (
            <Card key={Tender._id} className="my-3">
              <Card.Body>
                <Card.Title>{Tender.title}</Card.Title>
                <hr />
                <Card.Text>{Tender.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <hr />
                <ListGroupItem>
                  Category:
                  <ul style={{ listStyleType: "none" }}>
                    {Tender.category.map((category) => (
                      <li key={category._id}>{category.title}</li>
                    ))}
                  </ul>
                </ListGroupItem>

                <ListGroupItem>Quantity: {Tender.quantity}</ListGroupItem>
                <ListGroupItem>
                  Pool: {Tender.pool.title} (Rs. {Tender.pool.minimumCost} - Rs.{" "}
                  {Tender.pool.maximumCost})
                </ListGroupItem>
                <ListGroupItem>
                  Time Limit: {Tender.timeLimit} Days
                </ListGroupItem>
                <ListGroupItem>Start Date: {Tender.startDate}</ListGroupItem>
                <ListGroupItem>End Date: {Tender.endDate}</ListGroupItem>
              </ListGroup>
            </Card>
          ))}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Place Your Bid</Card.Title>
              {
              isBidAvailable === false ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <GreenTickIcon />
                  <h2> You Have Already Submitted Bid</h2>
                </div>
              ) : 
              bidSubmitted ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <GreenTickIcon />
                  <h2> Your Bid has been submitted</h2>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Estimated Cost</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Enter Estimated Cost"
                      value={estimatedCost}
                      onChange={(event) => setEstimatedCost(event.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Estimated Days</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Enter Estimated Days"
                      value={estimatedDays}
                      onChange={(event) => setEstimatedDays(event.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Enter your Experience"
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      required
                      label="I agree to the contract agreement"
                      checked={contractAgreement === "agree"}
                      onChange={(event) =>
                        setContractAgreement(
                          event.target.checked ? "agree" : "disagree"
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      rows={3}
                      placeholder="Enter your message"
                      value={comments}
                      onChange={(event) => setComments(event.target.value)}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    {Tenders.some(
                      (Tender) => Tender.tenderee._id === user._id
                    ) || Tenders.some((Tender) => new Date(Tender.startDate) >= new Date()) ? (
                      <Button variant="warning" type="submit" disabled>
                        Submit Bid
                      </Button>
                    ) : (
                      <Button variant="warning" type="submit">
                        Submit Bid
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div style={{ marginBottom: "5rem" }}></div>
      <div style={{ bottom: 0, width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};

export default MarketPlaceDetails;
