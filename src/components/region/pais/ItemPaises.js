import React, {useState} from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import EditarPais from "./EditarPais";

const ItemCategoria = (props) => {
  const { p, tok, setBanderaPais } = props;
  const [modalShow, setModalShow] = useState(false);

  const eliminarPais = (id) => {
    Swal.fire({
      title: "¿Esta seguro de eliminar el pais?",
      //   text: "Las noticias con esta categoria no podran ser publicadas hasta que se les defina una nueva categoria",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `${process.env.REACT_APP_API_URL}/pais/${id}`;
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
              "Pais eliminado",
              "El Pais seleccionada fue borrada correctamente",
              "success"
            );
            setBanderaPais(true)
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const restaurarPais = async (id, deleted) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/pais/restaurarPais/${id}`;
      const paisRestaurado = {
        deleted: !deleted,
      };
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
          authorization: tok.token,
        },
        body: JSON.stringify(paisRestaurado),
      });
      if (response.status === 200) {
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: 'Pais reestablecido',
          showConfirmButton: false,
          timer: 1500
        })
        setBanderaPais(true)
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center border border-secondary rounded herencia">
      <h5>
        <i>{p.pais}</i>
      </h5>
      <div>
        <Button
            className="btn limon text-light border-0 mx-3"
            onClick={() => setModalShow(true)}
          >
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>

          </Button>
          {modalShow ? (
            <EditarPais
              show={modalShow}
              onHide={() => setModalShow(false)}
              tok={props.tok}
              setBanderaPais={setBanderaPais}
              setModalShow={setModalShow}
              idPais={p._id}
            />
          ): (
            null
          )}
        {p.deleted ? (
          <Button
            className="text-light border-0"
            title="Restaurar Pais"
            onClick={() => restaurarPais(p._id, p.deleted)}
          >
            <FontAwesomeIcon icon={faTrashRestore}></FontAwesomeIcon>
          </Button>
        ) : (
          <Button
            className="rouge text-light border-0"
            onClick={() => eliminarPais(p._id)}
            title="Eliminar Pais"
          >
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </Button>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default withRouter(ItemCategoria);
