import React from 'react';
import {Image} from "react-bootstrap";
import edit from './../assets/icons/edit3.png'; 
import pepe from './../assets/pepe.jpg'; 

const TransactionItem = (props) => {

  return (
    <tr className="item">
      <td><a>00000</a></td>
      <td><a>Sofia Vidal</a></td>
      <td><a>0101010101</a></td>  
      <td><a>2021-01-01</a></td>     
      <td><Image alt={'edit'} src={edit} height="40" width="40" ></Image></td>
    </tr>
  );
};
export default TransactionItem;

/*
<td><a>{props.transaction.InvoiceNo}</a></td>
      <td><a>{props.customer.CusotmerID}</a></td>  
      <td><a>{props.customer.Date}</a></td>
*/