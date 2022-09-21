export const consultarPaisesAPI = async(setBanderaPais, page, limit, search) => {
    try {
      const urlPais = `/pais/listPaises?page=${page}&search=${search}&limit=${limit}`
      const res = await fetch(process.env.REACT_APP_API_URL + urlPais);
      const infoPaises = await res.json();
      if (res.status === 200) {
          setBanderaPais(false)
        return {paises: infoPaises.paises, totalPages: infoPaises.totalPages, count: infoPaises.totalRegister};
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };
  
  export const consultarTodosLosPaisesAPI = async(setBanderaPais) => {
    try {
      const urlPais = '/pais/paisesNoEliminados-todos'
      const res = await fetch(process.env.REACT_APP_API_URL + urlPais);
      const infoPaises = await res.json();
      if (res.status === 200) {
          setBanderaPais(false)
        return infoPaises
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };
  