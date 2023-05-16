import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from "react-redux";
import API_URL from "../../config";

const MarketPlaceComp = () => {
  const [tenders, setTenders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useSelector(state => state.user);
  const userPool = user.pool._id;

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      const categoriesStr = user.categories.map(category => category._id).join(",");
      setCategory(categoriesStr);
    } else {
      setCategory("");
    }
  }

  useEffect(() => {
    const fetchTenders = async () => {
      setIsLoading(true);
      const limit = 10;

      const response = await axios.get(
        API_URL + `/tender/users`, {
        params: {
          limit: limit,
          page: currentPage,
          pool: userPool,
          category: category,
          status: "approved",
          title: title,
        },
        withCredentials: true
      }
      );
      const responseData = response.data.result.data;
      setTotalPages(response.data.result.totalPages);

      if (Array.isArray(responseData) && responseData.length > 0) {
        const mappedTenders = responseData.map((tender) => ({
          _id: tender._id,
          user: tender.title,
          category: tender.category.map((cat) => cat.title),
          price: tender.price,
          createdAt: tender.createdAt,
          startDate: tender.startDate,
          endDate: tender.endDate,
          isActive: new Date() <= new Date(tender.endDate),
          poolTitle: tender.pool.title
        }));

        setTenders(mappedTenders);
      }
      setIsLoading(false);
    };

    fetchTenders();
  }, [currentPage,category,title,userPool]);


  useEffect(() => {
    const newFilteredTenders = searchText ? tenders.filter(tender =>
      tender.user.toLowerCase().includes(searchText.toLowerCase())
    ) : tenders;
    setFilteredTenders(newFilteredTenders);
  }, [searchText, tenders]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const handleCheckboxChange = (e) => {
  //   const isChecked = e.target.checked;
  //   setCategory(isChecked ? (user.categories._id ? user.categories._id.join(",") : "") : "");
  //   console.log(category)
  // };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '5px', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '45%' }}>
          <input
            type="text"
            placeholder="Search by Title"
            value={searchText}
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
            className="form-control me-2"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <label htmlFor="filterCheckbox" style={{ marginRight: '0.5rem' }}>Show Related Categories</label>
          <input
            type="checkbox"
            id="filterCheckbox"
            onChange={handleCheckboxChange}
            style={{ height: '1.2rem', width: '1.2rem' }}
          />
        </div>
      </div>


      {!isLoading && filteredTenders.length === 0 && <div>No tenders found.</div>}
      {!isLoading && filteredTenders.length > 0 && (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Pool</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTenders.map((tender, index) => (
                <tr key={tender._id}>
                  <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                  <td>{tender.user}</td>
                  <td style={{listStyleType:"none"}}>{tender.category.map((title, index) => (<li key={index}>{title}</li>))}</td>
                  <td>{tender.poolTitle}</td>
                  <td>{new Date(tender.startDate).toLocaleString()}</td>
                  <td>
                    {new Date(tender.endDate) > new Date() ? (
                      new Date(tender.endDate).toLocaleString()
                    ) : (
                      <span className="text-danger">{new Date(tender.endDate).toLocaleString()}</span>
                    )}
                  </td>
                  <td>
                    {tender.isActive ? (
                      <Button variant="success" disabled>
                        Active
                      </Button>
                    ) : (
                      <Button variant="danger" disabled>
                        Ended
                      </Button>
                    )}
                  </td>
                  <td>
                    <Link to={`/marketplace/${tender._id}`} className="btn btn-primary">
                      View Details
                    </Link>
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