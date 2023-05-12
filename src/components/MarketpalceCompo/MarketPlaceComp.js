import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';

const MarketPlaceComp = () => {
  const [tenders, setTenders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTenders = async (page) => {
    setIsLoading(true);
    const limit = 10;
    const response = await axios.get(
      `http://localhost:8000/tender?limit=${limit}&page=${page}`
    );
    const responseData = response.data.result.data;
    setTotalPages(response.data.result.totalPages);

    if (Array.isArray(responseData) && responseData.length > 0) {
      const mappedTenders = responseData.map((tender) => ({
        _id: tender._id, // Changed 'id' to '_id' to match the response data
        user: tender.tenderee.firstName,
        category: tender.category[0].title, // Access the title property from category array
        price: tender.price, // Assuming 'price' is present in the response
        createdAt: tender.createdAt,
        startDate: tender.startDate,
        endDate: new Date(new Date(tender.startDate).getTime() + (tender.timeLimit * 60 * 1000)),
        isActive: new Date() <= new Date(new Date(tender.startDate).getTime() + (tender.timeLimit * 60 * 1000)),
      }));
      setTenders(mappedTenders);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTenders(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const newFilteredTenders = searchText ? tenders.filter(tender =>
      tender.category.toLowerCase().includes(searchText.toLowerCase())
    ) : tenders;
    setFilteredTenders(newFilteredTenders);
  }, [searchText, tenders]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {!isLoading && filteredTenders.length === 0 && <div>No tenders found.</div>}
      {!isLoading && filteredTenders.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '5px', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
              <input
                type="text"
                placeholder="Search by category"
                value={searchText}
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                className="form-control me-2"
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Details</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTenders.map((tender, index) => (
                <tr key={tender._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{tender.user}</td>
                  <td>{tender.category}</td>
                  <td>{tender.price}</td>
                  <td>{new Date(tender.startDate).toLocaleString()}</td>
                  <td>
                    {new Date(tender.endDate) > new Date() ? (
                      new Date(tender.endDate).toLocaleString()
                    ) : (
                      <span className="text-danger">{new Date(tender.endDate).toLocaleString()}</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/tender/${tender._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </td>
                  <td>
                    {tender.isActive ? (
                      <Button variant="secondary" disabled>
                        Active
                      </Button>
                    ) : (
                      <Button variant="danger" disabled>
                        Ended
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '2rem' }}>
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </>
      )}
    </>
  );
}

export default MarketPlaceComp;