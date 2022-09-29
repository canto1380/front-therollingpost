import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import suscripcion from "../../img/suscripcion.png";
import { withRouter } from "react-router-dom";
import { consultarSuscripcionesAPI, consultarSuscripcionPorIDAPI } from "../../utils/queryAPI/suscripciones";
import { consultarMedioDePagos, crearCaja, crearUsuarioPrueba } from "./mercadoPago/Querys";

const Suscripcion = (props) => {
  const { setSuscripcionElegida, tok } = props
  const [suscripciones, setSuscripciones] = useState([])

  const [mediosDePagos, setMediosDePagos] = useState([])

  const handleSuscribirme = async(id) => {
    // setSuscripcionElegida( await consultarSuscripcionPorIDAPI(id, tok))
    props.history.push(`/suscripcion/suscribirse/${id}`)
  }
  useEffect(() => {
    consultarAPI()
  }, [])
  const consultarAPI = async() => {
    setSuscripciones(await consultarSuscripcionesAPI())
  }

  useEffect(() => {
    consultarMedioDEPagoAPI()
  },[])
  const consultarMedioDEPagoAPI = async() => {
    setMediosDePagos( await crearUsuarioPrueba())
    // const aa = await crearCaja()
    // console.log(aa)
    // console.log(mediosDePagos)
  }

  return (
    <Container className="my-4">
      <div className="text-center my-5 ">
        <h1 className="py-1 px-2">
          <i>Mantente al día con las noticias del mundo</i>
        </h1>
        <h5>
          <i>Accedé sin límite a información de la mejor calidad</i>
        </h5>
      </div>
      <div className="row justify-content-evenly my-5">
        {suscripciones?.map((susc) => (
          <div key={susc._id}  className="col-sm-12 col-md-6 col-lg-4 border border-secondary rounded herencia">
            <div className="text-center my-3 mx-1">
              <div className="my-3">
                <h2>{susc.nombre}</h2>
              </div>
              <div className="my-3">
                <h5>{susc.descripcion}</h5>
              </div>
              <div className="my-3">
                <h3 className="text-primary">
                  <span>$</span>
                  {susc.precio}
                  <span>/mes</span>
                </h3>
              </div>
              <div className="my-5 cont-img-susc">
                <img src={suscripcion} className="w-100 img-susc" alt="" />
              </div>
              <div className="my-4 cont-btn-susc">
                <button type="button" className="w-100 btn-susc" onClick={()=> handleSuscribirme(susc._id)}>
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </Container>
  );
};

export default withRouter(Suscripcion);
