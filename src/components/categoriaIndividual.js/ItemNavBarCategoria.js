import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemNavBarCategoria = ({ categorias = [] }) => {
  return (
    <ListGroup.Item className="herencia border-0">
     <div className="d-flex flex-wrap">
      {categorias.map((cat) => (
        <Link
          key={cat._id}
          to={`${cat.nombreCategoria}`}
          className="text-decoration-none fw-bold btn cielo nubes mx-1 mb-2 flex-grow-1"
          style={{maxWidth:"15em"}}
        ><i>
          {cat.nombreCategoria}</i>
        </Link>
      ))}</div>
    </ListGroup.Item>
  );
};

export default ItemNavBarCategoria;
