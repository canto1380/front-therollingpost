export const consultarNoticiasAPI = async(setBanderalocalidad, page, limit, search) => {
    try {
      const urlNoticias = `/noticias/listNoticias?page=${page}&search=${search}&limit=${limit}`
      const res = await fetch(process.env.REACT_APP_API_URL + urlNoticias);
      const infoNoticias = await res.json();
      if (res.status === 200) {
        setBanderalocalidad(false)
        return {noticias: infoNoticias.noticia, totalPages: infoNoticias.totalPages, count: infoNoticias.totalRegister};
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };

  export const consultarNoticiasPublicadasAPI = async(setConsultarNoticias) => {
    try {
      const urlNoticias = `/noticias/listNoticiasPublicadas`
      const res = await fetch(process.env.REACT_APP_API_URL + urlNoticias);
      const infoNoticias = await res.json();

      if (res.status === 200) {
        setConsultarNoticias(false)
        return infoNoticias
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };