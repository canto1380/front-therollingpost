export const consultarProvinciasAPI = async(setBanderaProv, page, limit, search) => {
    try {
        const urlProvincia = `/provincia/listProvincias?page=${page}&search=${search}&limit=${limit}`
        const res = await fetch(process.env.REACT_APP_API_URL + urlProvincia)
        const infoProvincias = await res.json()
        if(res.status === 200) {
            setBanderaProv(false)
            return {provincias: infoProvincias.provincias, totalPages: infoProvincias.totalPages, count: infoProvincias.totalRegister}
        } else {
            return null
        }
    } catch (error) {
        return error
    }
}

export const consultarTodasLasProvinciasAPI = async(setBanderaProv) => {
    try {
      const urlProvincia = '/provincia//provinciasNoEliminadas-todas'
      const res = await fetch(process.env.REACT_APP_API_URL + urlProvincia);
      const infoProvincias = await res.json();
      if (res.status === 200) {
          setBanderaProv(false)
        return infoProvincias
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };
  