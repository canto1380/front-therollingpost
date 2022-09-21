import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import EditarProvincia from "./EditarProvincia";

const ItemProvincias = (props) => {
  const { p, tok, setBanderaProv } = props
  const [ modalShow, setModalShow ] = useState(false)

  const eliminarProvincia = (id) => {
    Swal.fire({
      title: "¿Esta seguro de eliminar la provincia?",
      //   text: "Las noticias con esta categoria no podran ser publicadas hasta que se les defina una nueva categoria",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `${process.env.REACT_APP_API_URL}/provincia/${id}`;
        try {
          const config = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: tok.token,
            },
          };
          const res = await fetch(url, config);
          if (res.status === 200) {
            Swal.fire(
              "Provincia eliminada",
              "El Provincia seleccionada fue borrada correctamente",
              "success"
            );
            setBanderaProv(true)
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  const restaurarProvincia = async(id, deleted) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/provincia/restaurarProvincia/${id}`;
      const provinciaRestaurada = {
        deleted: !deleted,
      };
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
          authorization: tok.token,
        },
        body: JSON.stringify(provinciaRestaurada),
      });
      if (response.status === 200) {
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: 'Provincia reestablecida',
          showConfirmButton: false,
          timer: 1500
        })
        setBanderaProv(true)
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center border border-secondary rounded herencia">
      <h5>
        <i>{p.provincia}</i>
      </h5>
      <div>
        <Button
          className="btn limon text-light border-0 mx-3"
          onClick={() => setModalShow(true)}
        >
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </Button>
        {modalShow ? (
          <EditarProvincia
            show={modalShow}
            onHide={() => setModalShow(false)}
            tok={props.tok}
            setBanderaProv={setBanderaProv}
            setModalShow={setModalShow}
            idProv={p._id}
          />
        ) : null}
        {p.deleted ? (
          <Button
            className="text-light border-0"
            title="Restaurar Provincia"
            onClick={() => restaurarProvincia(p._id, p.deleted)}
          >
            <FontAwesomeIcon icon={faTrashRestore}></FontAwesomeIcon>
          </Button>
        ) : (
          <Button
            className="rouge text-light border-0"
            onClick={() => eliminarProvincia(p._id)}
            title="Eliminar Provincia"
          >
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </Button>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default ItemProvincias;
