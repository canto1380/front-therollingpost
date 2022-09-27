export const consultarSuscripcionesAPI = async() => {
    try {
      const urlSuscripcion = '/suscripciones/suscripcionesNoEliminadas'
      const res = await fetch(process.env.REACT_APP_API_URL + urlSuscripcion);
      const infoSuscripcion = await res.json();
      if (res.status === 200) {
        return infoSuscripcion
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };

  export const consultarSuscripcionPorIDAPI = async(id, tok) => {
    try {
      const urlSuscripcion = `/suscripciones/${id}`
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": tok.token
        }
      };
      const res = await fetch(process.env.REACT_APP_API_URL + urlSuscripcion, config);
      const infoSuscripcion = await res.json();
      if (res.status === 200) {
        return infoSuscripcion
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };