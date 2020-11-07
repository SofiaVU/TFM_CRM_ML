import React from 'react';
import {Image} from "react-bootstrap";
import edit from './../assets/icons/edit3.png'; 
import pepe from './../assets/pepe.jpg'; 

const CustomerItem = (props) => {
  console.log(props.customer)
  return (
    <tr className="item">
      <td>
        <Image className="ui small rounded image" alt="pepe" /*{props.firstName}*/ src={pepe} /*{props.avatar}*/ height="42" width="42" rounded />
      </td>
      <td><a>{props.customer.split(',')[2]}</a></td>
      <td><a>{props.customer.split(',')[3]}</a></td>  
      <td><a>{props.customer.split(',')[1]}</a></td>     
      <td><a>{props.customer.split(',')[0]}</a></td>
      <td><Image alt={'edit'} src={edit} height="40" width="40" ></Image></td>
    </tr>
  );
};

/**** USE THE ABOVE VERSION FOR SIMPLIFIED DB ****/
/*
const CustomerItem = (props) => {
  return (
    <tr className="item">
      <td>
        <Image className="ui small rounded image" alt="pepe" src={pepe} height="42" width="42" rounded />
      </td>
      <td><a>{props.customer.Name.split(" ")[0]}</a></td>
      <td><a>{props.customer.Name.split(" ")[1]}</a></td>  
      <td><a>{props.customer.Country}</a></td>     
      <td><a>{props.customer.CustomerId}</a></td>
      <td><Image alt={'edit'} src={edit} height="40" width="40" ></Image></td>
    </tr>
  );
};
*/
export default CustomerItem;
