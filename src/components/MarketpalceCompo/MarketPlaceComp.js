import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const dummyUsers = [
  {
    _id: 1,
    name: 'John Doe',
    catType: ['Category Z', 'Category B'],
    pool: 100,
    price: 50,
    startDate: '2022-01-01',
    endDate: '2022-01-31',
    isAvailable: 'active'
  },
  {
    _id: 2,
    name: 'Jane Smith',
    catType: ['Category C', 'Category D'],
    pool: 200,
    price: 75,
    startDate: '2022-02-01',
    endDate: '2022-02-28',
    isAvailable: 'inactive'
  },
  {
    _id: 3,
    name: 'Bob Johnson',
    catType: ['Category E'],
    pool: 50,
    price: 25,
    startDate: '2022-03-01',
    endDate: '2022-03-31',
    isAvailable: 'active'
  },
  {
    _id: 4,
    name: 'Alice Lee',
    catType: ['Category F', 'Category G'],
    pool: 150,
    price: 100,
    startDate: '2022-04-01',
    endDate: '2022-04-30',
    isAvailable: 'inactive'
  },
  {
    _id: 5,
    name: 'Tom Brown',
    catType: ['Category H', 'Category I', 'Category J'],
    pool: 300,
    price: 150,
    startDate: '2022-05-01',
    endDate: '2022-05-31',
    isAvailable: 'active'
  },
  {
    _id: 6,
    name: 'John Doe',
    catType: ['Category A', 'Category B'],
    pool: 100,
    price: 50,
    startDate: '2022-01-01',
    endDate: '2022-01-31',
    isAvailable: 'active'
  },
  {
    _id: 7,
    name: 'Jane Smith',
    catType: ['Category C', 'Category D'],
    pool: 200,
    price: 75,
    startDate: '2022-02-01',
    endDate: '2022-02-28',
    isAvailable: 'inactive'
  },
  {
    _id: 8,
    name: 'Bob Johnson',
    catType: ['Category E'],
    pool: 50,
    price: 25,
    startDate: '2022-03-01',
    endDate: '2022-03-31',
    isAvailable: 'active'
  },
  {
    _id: 9,
    name: 'Alice Lee',
    catType: ['s F', 'Category G'],
    pool: 150,
    price: 100,
    startDate: '2022-04-01',
    endDate: '2022-04-30',
    isAvailable: 'inactive'
  },
  {
    _id: 10,
    name: 'Tom Brown',
    catType: ['d Z', 'Category I', 'Category J'],
    pool: 300,
    price: 150,
    startDate: '2022-05-01',
    endDate: '2022-05-31',
    isAvailable: 'active'
  },
];


const MarketPlaceComp = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(dummyUsers);
  

  // useEffect(() => {
  //   axios.get(`https://example.com/api/users?page=${currentPage}&limit=10`)
  //     .then(res => {
  //       setUsers([...users, ...res.data]);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })

  // }, [currentPage]);

  useEffect(() => {
    setUsers([...users, ...dummyUsers]);

  }, [currentPage]);

  // const filteredUsers = searchText ? users.filter(user =>
  //   user.catType.some(cat => cat.toLowerCase().includes(searchText.toLowerCase()))
  // ) : users;
   
  useEffect(() => {
    const newFilteredUsers = searchText ? users.filter(user =>
      user.catType.some(cat => cat.toLowerCase().includes(searchText.toLowerCase()))
    ) : users;
    setFilteredUsers(newFilteredUsers);
  }, [searchText, users]);
  

  return (
    <>
      {
      users.length === 0 ?
        <div>No users found.</div>
        :
        <>
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', paddingTop: '5px', paddingBottom:'2rem' }}>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'50%'}}>
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

        <InfiniteScroll
          dataLength={filteredUsers.length}
          next={() => setCurrentPage(currentPage + 1)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Category</th>
                <th scope="col">Pool</th>
                <th scope="col">Price</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Details</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                filteredUsers.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                  />
                ))
              }
            </tbody>
            </table>
            </InfiniteScroll></>
}
    </>
  );
};

export default MarketPlaceComp;

function Row({item}) {
  const buttonClass = item.isAvailable === 'active' ? 'btn btn-success' : 'btn btn-danger';
  const linkTo = `/details/${item._id}`; // set the link to the detail page


  return (
    <tr>
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td>{item.catType.map(item => item + " ")}</td>
      <td>${item.pool}</td>
      <td>${item.price}</td>
      <td>{item.startDate}</td>
      <td>{item.endDate}</td>
      <td>
        <Button className={buttonClass}>
          {item.isAvailable === 'active' ? 'Active' : 'Not Active'}
        </Button>
      </td>
      <td>
        <Link to={linkTo}>View Details</Link>
      </td>
    </tr>
  )
}