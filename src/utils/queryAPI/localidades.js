export const consultarLocalidadesAPI = async(setBanderalocalidad, page, limit, search) => {
    try {
      const urlLocalidad = `/localidad/listaLocalidades?page=${page}&search=${search}&limit=${limit}`
      const res = await fetch(process.env.REACT_APP_API_URL + urlLocalidad);
      const infoLocalidades = await res.json();
      
      if (res.status === 200) {
        setBanderalocalidad(false)
        return {localidades: infoLocalidades.localidad, totalPages: infoLocalidades.totalPages, count: infoLocalidades.totalRegister};
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };
  
  export const consultarTodasLasLocalidadesAPI = async(setBanderalocalidad) => {
    try {
      const urlLocalidad = '/localidad/localidadesNoEliminadas-todas'
      const res = await fetch(process.env.REACT_APP_API_URL + urlLocalidad);
      const infoLocalidades = await res.json();
      if (res.status === 200) {
          setBanderalocalidad(false)
        return infoLocalidades
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };
  