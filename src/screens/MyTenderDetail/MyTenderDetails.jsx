import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Pagination,
} from "react-bootstrap";
import { FaSadTear, FaUserTie } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { GrOrganization } from "react-icons/gr";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_URL from "../../config";

const TenderBids = () => {
  const [bids, setBids] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bidsPerPage = 10;
  const { id } = useParams();

  // const dummy = [
  //   {
  //     publishers: ["19N47SuW48xfikz7hMGJ6V1T5o37vBprPnDBA6"],
  //     keys: ["644d336c1f435c204a181378"],
  //     data: {
  //       estimatedCost: 1100000,
  //       estimatedDays: 60,
  //       experience: 5,
  //       contractAgreement: "agree",
  //       comments: "Lorum Ipsum",
  //     },
  //     confirmations: 46,
  //     blockhash:
  //       "0068a2e87161d2a745a80507aa2a466273c7fb575931c2693695b018ca2cf5c2",
  //     blockindex: 1,
  //     blocktime: 1684087664,
  //     txid: "bc5dba332baa2f40260dc56fafa9131fa5ea8dd9ac0cc8192a8c97c1fcde73aa",
  //     vout: 0,
  //     valid: true,
  //     time: 1684087647,
  //     timereceived: 1684087647,
  //   },
  //   {
  //     publishers: ["19N47SuW48xfikz7hMGJ6V1T5o37vBprPnDBA7"],
  //     keys: ["644d336c1f435c204a181378"],
  //     data: {
  //       estimatedCost: 1000000,
  //       estimatedDays: 50,
  //       experience: 5,
  //       contractAgreement: "agree",
  //       comments: "Lorum Ipsum",
  //     },
  //     confirmations: 9,
  //     blockhash:
  //       "00ea94a85a02cd098ebb98293d9158259c4d75c7d3b95f196e1122935c2b2134",
  //     blockindex: 1,
  //     blocktime: 1684260579,
  //     txid: "5226f220a552e588fa505f716691f744d7f24e1f61b5d8b845280118d0fb7764",
  //     vout: 0,
  //     valid: true,
  //     time: 1684260567,
  //     timereceived: 1684260567,
  //   },
  //   {
  //     publishers: ["19N47SuW48xfikz7hMGJ6V1T5o37vBprPnDBA8"],
  //     keys: ["644d336c1f435c204a181378"],
  //     data: {
  //       estimatedCost: 900000,
  //       estimatedDays: 70,
  //       experience: 5,
  //       contractAgreement: "agree",
  //       comments: "Lorum Ipsum",
  //     },
  //     confirmations: 4,
  //     blockhash:
  //       "00be6bbb655e24f73d8f0a08644e6b1a444ec23742289a847d9bf69e01e7c804",
  //     blockindex: 1,
  //     blocktime: 1684260655,
  //     txid: "c59aed54bcec8864c6322a6e04adde49c6431f4719ab2f98b506ac611a71c7db",
  //     vout: 0,
  //     valid: true,
  //     time: 1684260655,
  //     timereceived: 1684260655,
  //   },
  //   {
  //     publishers: ["12oqu6nHwoAimn9a5Ys2WRKn2x8v9XMK8VgAHP"],
  //     keys: ["winner"],
  //     data: {
  //       estimatedCost: 1100000,
  //       estimatedDays: 60,
  //       experience: 5,
  //       contractAgreement: "agree",
  //       comments: "Lorum Ipsum",
  //       user: {
  //         categories: [],
  //         _id: "644d336c1f435c204a181378",
  //         email: "k190257@nu.edu.pk",
  //         password:
  //           "$2b$10$5nhQ.ZWMM/JlxljSAq89Vu8Y7jYBS4GHwF9Sd0/owEggdT05Z924q",
  //         firstName: "Tuaha",
  //         lastName: "Ajaz",
  //         organizationName:"Tatti Pishi",
  //         isAdmin: false,
  //         isTenderee: false,
  //         isVerified: false,
  //         contactNumber: "+923323518516",
  //         walletAddress: "19N47SuW48xfikz7hMGJ6V1T5o37vBprPnDBA9",
  //         rating: 0,
  //         workExperience: 0,
  //         createdAt: "2023-04-29T15:10:36.674Z",
  //         updatedAt: "2023-05-15T17:22:33.657Z",
  //         __v: 0,
  //         pool: {
  //           _id: "644fa3f556af673a48bd3917",
  //           title: "P-1",
  //           minimumCost: 1000000,
  //           maximumCost: 5000000,
  //           createdAt: "2023-05-01T11:35:17.784Z",
  //           updatedAt: "2023-05-01T11:35:17.784Z",
  //           __v: 0,
  //           stage: 1,
  //         },
  //       },
  //       score: 0.9266666666666667,
  //     },
  //     confirmations: 1,
  //     blockhash:
  //       "00bf986e9be4e92071a9a3aafb753dc50a9f319f6187630a56ad6f1ebaeb5b75",
  //     blockindex: 1,
  //     blocktime: 1684260706,
  //     txid: "36f37e26dcc7b39dc07802e880de83afff582617d9e04012b13f951c39d31c49",
  //     vout: 0,
  //     valid: true,
  //     time: 1684260695,
  //     timereceived: 1684260695,
  //   },
  // ];

  useEffect(() => {
    axios
      .get(API_URL + `/tender/bids?tenderId=${id}`, { withCredentials: true })
      .then((response) => {
        setBids(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
    // setBids(dummy)
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
            <Card key={bid.publishers[0]} className="my-3">
              {bid.keys[0] && bid.keys[0] === "winner" ? (
                <div
                  className="bg-warning p-2 text-dark bg-opacity-50"
                  style={{ textAlign: "center", fontWeight:"bold", letterSpacing:"10px" }}
                >
                  <GiPodiumWinner/>
                  Winner Bid
                </div>
              ) : null}
              <Card.Body>
                <Card.Title>Wallet Address: {bid.publishers[0]}</Card.Title>
                <hr />
                <Card.Text>Message:</Card.Text>
                <Card.Text>{bid.data.comments}</Card.Text>
              </Card.Body>

              <ListGroup className="list-group-flush">
                <hr />
                <ListGroupItem>
                  Estimated Days: {bid.data.estimatedDays}
                </ListGroupItem>
                <ListGroupItem>
                  Estimated Cost: {bid.data.estimatedCost}
                </ListGroupItem>
                <ListGroupItem>Experience: {bid.data.experience}</ListGroupItem>
                {bid.keys[0] && bid.keys[0] === "winner" ? (
                  <>
                    <ListGroupItem
                      className="bg-warning p-2 text-dark bg-opacity-25"
                      style={{ textAlign: "center" }}
                    >
                      <GrOrganization />
                      Organization Name: {bid.data.user.organizationName}
                    </ListGroupItem>
                    <ListGroupItem
                      className="bg-warning p-2 text-dark bg-opacity-25"
                      style={{ textAlign: "center" }}
                    >
                      <MdEmail />
                      Email: {bid.data.user.email}
                    </ListGroupItem>
                    <ListGroupItem
                      className="bg-warning p-2 text-dark bg-opacity-25"
                      style={{ textAlign: "center" }}
                    >
                      <HiPhone />
                      Contact Number: {bid.data.user.contactNumber}
                    </ListGroupItem>
                  </>
                ) : null}
              </ListGroup>
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
