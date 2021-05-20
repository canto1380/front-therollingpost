import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ItemBotonera = (props) => {
  // const eliminarProductos = (id) => {
  //   Swal.fire({
  //     title: "Estas seguro de Borrar esta noticia?",
  //     text: "Una vez elminado no se puede volver atras!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Eliminar",
  //     CancelButtonText: "Cancelar",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       //aqui se borra el producto
  //       const url = `${process.env.REACT_APP_API_URL + "/noticias"}/${id}`;
  //       try {
  //         const respuesta = await fetch(url, {
  //           method: "DELETE",
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         if (respuesta.status === 200) {
  //           Swal.fire(
  //             "Noticia Eliminado!",
  //             "La noticia seleccionada se borro correctamente",
  //             "success"
  //           );
  //           //actualizar los datos de la lista
  //           props.consultarAPIN();
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   });
  // };

  //
  const eliminarProductos = (id) => {
    Swal.fire({
      title: "Estas seguro de Borrar esta noticia?",
      text: "Una vez elminado no se puede volver atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      CancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //aqui se borra el producto
        const url = `${process.env.REACT_APP_API_URL + "/noticias"}/${id}`;
        try {
          const respuesta = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          if (respuesta.status === 200) {
            Swal.fire(
              "Noticia Eliminado!",
              "La noticia seleccionada se borro correctamente",
              "success"
            );
            //actualizar los datos de la lista
            props.consultarAPI();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="d-flex justify-content-evenly">
      <Link
        className="btn btn-warning me-1 text-light botones"
        to={`/editar-noticia/${props.noticia.id}`}
      >
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </Link>
      <Button
        className="me-1 botones"
        variant="danger"
        onClick={() => eliminarProductos(props.noticia.id)}
      >
        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
      </Button>
      <Link
        className="btn btn-info me-1 text-light botones"
        to={`/preview/${props.noticia.id}`}
      >
        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
      </Link>
      <Button variant="primary" className="botones">
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </Button>
    </div>
  );
};

export default ItemBotonera;
