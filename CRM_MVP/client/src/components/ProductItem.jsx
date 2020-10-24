import React from 'react';

const ProductItem = (props) => {
  return (
    <tr className="item">
      <td><a>{props.product.split(',')[0]}</a></td>
      <td><a>{props.product.split(',')[1]}</a></td>  
      <td><a>{props.product.split(',')[2]}</a></td> 
    </tr>
  );
};
export default ProductItem;