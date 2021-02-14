import React from 'react';
import {Image} from "react-bootstrap";
import edit from './../assets/icons/edit3.png'; 
import pepe from './../assets/pepe.jpg'; 

const TransactionItem = (props) => {
  //console.log(props)
  return (
    <tr className="item">
      <td><a>{props.transaction.InvoiceNo}</a></td>
      <td><a>{props.transaction.Date.split('T')[0]}</a></td>
      <td><a>{props.transaction.TotalItems}</a></td>  
      <td><a>{props.transaction.TotalRevenue}</a></td>     
    </tr>
  );
};
export default TransactionItem;

/*
<td><a>{props.transaction.InvoiceNo}</a></td>
      <td><a>{props.customer.CusotmerID}</a></td>  
      <td><a>{props.customer.Date}</a></td>
      <td><Image alt={'edit'} src={edit} height="40" width="40" ></Image></td>
*/