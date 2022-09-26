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