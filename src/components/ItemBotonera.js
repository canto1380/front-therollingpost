import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrashAlt,faEye } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import "./Botones.css";

const ItemBotonera = (props) => {
  const { noticia, setBanderaNoticia, tok} = props
  const eliminarProductos = (id) => {
    Swal.fire({
      title: "Estas seguro de borrar esta noticia?",
      text: "Una vez eliminado no se puede volver atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //aqui se borra el producto
        const url = `${process.env.REACT_APP_API_URL}/noticias/${id}`;
        try {
          const respuesta = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "authorization": tok.token
            },
          });
          if (respuesta.status === 200) {
            Swal.fire(
              "Noticia Eliminada!",
              "La noticia seleccionada se borro correctamente",
              "success"
            );
            //actualizar los datos de la lista
            setBanderaNoticia(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const publicarNoticia = async(id, publicado) => {

    const urll = process.env.REACT_APP_API_URL;
  try {
    const respuesta = await fetch(urll + "/noticias/" + id);
        if (respuesta.status === 200) {
          const resp = await respuesta.json();
          if(resp.categoria?.nombreCategoria === undefined){
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un problema',
              text: 'Defina una categoria a la noticia para poder publicarla',
            })
          } else {
            Swal.fire({
              title: `Estas seguro de ${publicado ? "quitar la publicación de" : "publicar"} esta noticia?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: noticia.publicado ? "Quitar publicación" : "Publicar",
              cancelButtonText: "Cancelar",
            }).then(async (result) => {
              if (result.isConfirmed) {
                const url = `${process.env.REACT_APP_API_URL}/noticias/${id}`;
                try {
                  const noticiaPublicada = {
                    publicado: !publicado
                  }
                  const respuesta = await fetch(url, {
                    method: "PUT",
                    headers: { 
                      "Content-Type": "application/json",
                      "authorization": tok.token
                     },
                    body: JSON.stringify(noticiaPublicada),
                  });
                  if (respuesta.status === 200) {
                    Swal.fire({
                      title: `Noticia ${publicado ? "removida" : "publicada"}!`,
                      icon: "success"
                    });
                    //actualizar los datos de la lista
                  setBanderaNoticia(true);
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }).catch(()=>Swal.close());
          }
        }
  } catch (error) {
    console.log(error)
  }
  };

  return (
    <div className="d-flex justify-content-evenly">
      <Button
        as={Link}
        type="button"
        className="btn limon border-0 me-1 text-dark "
        to={`/editar-noticia/${noticia?._id}`}
        title="Editar noticia"
      >
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </Button>
      <Button
        className="me-1 rouge border-0"
        onClick={() => eliminarProductos(noticia?._id)}
        title="Eliminar noticia"
      >
        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
      </Button>
      <Link
        className="btn sky nubes me-1 text-light "
        to={`/preview/${noticia?._id}`}
        title="Preview"
      >
        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
      </Link>
      <Button
        className={`${noticia?.publicado ? 'mar border-0' : 'sad border-0'}`}
        title={noticia?.publicado ? "Quitar publicación" : "Publicar"}
        onClick={() => publicarNoticia(noticia?._id, noticia?.publicado)}
      >
        <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>
      </Button>
    </div>
  );
};

export default ItemBotonera;
