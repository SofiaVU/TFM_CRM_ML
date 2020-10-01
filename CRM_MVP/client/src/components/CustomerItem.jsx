import React from 'react';
import {Image} from "react-bootstrap";
import edit from './../assets/icons/edit3.png'; 

const CustomerItem = (props) => {
  return (
    <tr className="item">
      <td>
        <Image className="ui small rounded image" alt={props.firstName} src={props.avatar} height="42" width="42" rounded />
      </td>
      <td><a>{props.customer.firstName}</a></td>
      <td><a>{props.customer.lastName}</a></td>
      <td><a>{props.customer.rewards}</a></td>
      <td><a>{props.customer.membership.toLocaleString()}</a></td>
      <td><Image alt={'edit'} src={edit} height="40" width="40" ></Image></td>
    </tr>
  );
};
export default CustomerItem;
