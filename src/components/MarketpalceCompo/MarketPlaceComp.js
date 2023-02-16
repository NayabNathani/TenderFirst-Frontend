import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MarketPlaceComp = () => {

    const [isAvailable, setIsAvailable] = useState(false);

    const handleClick = () => {
        setIsAvailable(!isAvailable);
      };

    const buttonClass = isAvailable ? 'btn btn-success' : 'btn btn-danger';

  return (
    <>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Category Type</th>
            <th scope="col">User</th>
            <th scope="col">Status</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>
              <button onClick={handleClick} type="button" class={buttonClass}>
                {isAvailable ? "Available" : "Not Available"}
              </button>
            </td>
            <td>LOL</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MarketPlaceComp;
