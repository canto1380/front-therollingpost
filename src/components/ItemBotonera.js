import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrashAlt,faEye } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

const ItemBotonera = (props) => {
  const eliminarProductos = (id) => {
    Swal.fire({
      title: "Estas seguro de borrar esta noticia?",
      text: "Una vez eliminado no se puede volver atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      CancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //aqui se borra el producto
        const url = `${process.env.REACT_APP_API_URL}/noticias/${id}`;
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

  const publicarNoticia = (id) => {
    Swal.fire({
      title: "Estas seguro de publicar esta noticia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Publicar",
      CancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `${process.env.REACT_APP_API_URL}/noticias/${id}`;
        try {
          const noticiaPublicada = {
            publicado: true
          }
          const respuesta = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(noticiaPublicada),
          });
          if (respuesta.status === 200) {
            Swal.fire(
              "Noticia publicada!",
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
      <Button
        as={Link}
        type="button"
        className="btn btn-warning me-1 text-light "
        to={`/editar-noticia/${props.noticia.id}`}
        title="Editar noticia"
      >
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </Button>
      <Button
        className="me-1"
        variant="danger"
        onClick={() => eliminarProductos(props.noticia.id)}
        title="Eliminar noticia"
      >
        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
      </Button>
      <Link
        className="btn btn-info me-1 text-light "
        to={`/preview/${props.noticia.id}`}
        title="Preview"
      >
        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
      </Link>
      <Button variant="primary" title="Publicar" onClick={() =>publicarNoticia(props.noticia.id)} disabled={props.noticia.publicado}>
        <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>
      </Button>
    </div>
  );
};

export default ItemBotonera;
