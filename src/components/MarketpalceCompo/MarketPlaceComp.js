import React from "react";
import Button from 'react-bootstrap/Button';


const MarketPlaceComp = () => {

  const users = [

    {
      _id:"1",
      name:"Ali Nayab",
      catType: 'Table',
      price: 3000,
      subscription:{
        status:"active"
      },
      isAvailable:'Available'
    },
    {
      _id:"2",
      name:"Tuaha",
      catType: 'Chair',
      price: 2000,
      subscription:{
        status:"active"
      },
      isAvailable:'Available'
    },
    {
      _id:"3",
      name:"Abu Bakr",
      catType: 'Laptop',
      price: 10000,
      subscription:{
        status:"active"
      },
     isAvailable:'Available'
    },
    {
      _id:"4",
      name:"Shahbaz",
      catType: 'Bottles',
      price: 20,
      subscription:{
        status:"active"
      },
      isAvailable:'UnAvailable'
    },
    {
      _id:"5",
      name:"Nawaz",
      catType: 'Perfumes',
      price: 50,
      subscription:{
        status:"active"
      },
      isAvailable:'UnAvailable'
    },
];
    // const [isAvailable, setIsAvailable] = useState(false);
    const handleClick = (userId) => {
        console.log(userId)
      };
    


  

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Category Type</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
        {
            users.map(item=>(
              <Row 
              handleClick={handleClick}
              key={item._id} 
              item={item} 
              />
            ))
          }
        </tbody>
      </table>

                <br/><br/><br/><br/><br/>
    </>
  );
};

export default MarketPlaceComp;

function Row({item, handleClick}){
  const buttonClass = item.isAvailable === 'Available' ? 'btn btn-success' : 'btn btn-danger';
  return(
    <tr>
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td>{item.catType}</td>
      <td>${item.price}</td>
      <td>{item.subscription.status==='active' ? 'Active' : 'Not Active'}</td>
      <td>
        <Button onClick={()=>handleClick(item._id)} className={buttonClass}>
        {item.isAvailable}
        </Button>
      </td>
    </tr>
  )
}