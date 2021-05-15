import React from "react";
import { ListGroup } from "react-bootstrap";

const SelectCategoria = (props) => {
  return (
    <ListGroup.Item>
      <div>{props.cat.nombreCategoria}</div>;
    </ListGroup.Item>
  );
};

export default SelectCategoria;
