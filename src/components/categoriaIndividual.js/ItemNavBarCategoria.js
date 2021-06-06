import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemNavBarCategoria = ({ categorias = [] }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between border-0">
      {categorias.map((cat) => (
        <Link
          key={cat._id}
          to={`${cat.nombreCategoria}`}
          className="text-decoration-none text-dark fw-bold"
        >
          {cat.nombreCategoria}
        </Link>
      ))}
    </ListGroup.Item>
  );
};

export default ItemNavBarCategoria;
