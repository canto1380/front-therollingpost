export const consultarCategoriasAPI = async(setBanderaCategoria, page, limit, search) => {
    try {
      const urlCategorias = `/categorias/listCategoria?page=${page}&search=${search}&limit=${limit}`
      const res = await fetch(process.env.REACT_APP_API_URL + urlCategorias);
      const infoCategorias = await res.json();
      if (res.status === 200) {
        setBanderaCategoria(false)
        return {categorias: infoCategorias.categoria, totalPages: infoCategorias.totalPages, count: infoCategorias.totalRegister};
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };

  export const consultarCategoriasPublicadasAPI = async(setConsultarNoticias) => {
    try {
      const urlCategorias = `/categorias/listTodasCategorias`
      const res = await fetch(process.env.REACT_APP_API_URL + urlCategorias);
      const infoCategorias = await res.json();
      if (res.status === 200) {
        setConsultarNoticias(false)
        return infoCategorias
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };