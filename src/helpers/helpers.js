
export const setToken = (token) =>{
    return localStorage.setItem('jwt',token)
}

export const getToken =()=>{
    return localStorage.getItem('jwt')
}

export const deleteToken = ()=>{
    localStorage.removeItem('jwt')
}

/* Si el admin esta logueado */
export const isAuthenticated =() =>{
    if(localStorage.getItem('jwt')){
        return true
    } else {
        return false
    }
}

/* SignIn */
const url = process.env.REACT_APP_API_URL+"/user/signin"
export const signin = user => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user) // user: 
    })
      .then(response => {
        if(response.status !== 201){
          throw Error("Error de credenciales")
        }
        return response.json();
      })
  };

/* Crea Token */
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data));
      next();
    }
  }

export const emailValidacion = (value) =>{
    let expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if(value.trim() === expresion){
        return true
    } else {
        return false
    }
}

export const editarNoticia = async ( id, nott) => {
  const urll = process.env.REACT_APP_API_URL;
    try {
      const noticiaModificada = {
        publicado: false,
        titulo: nott.titulo,
        descripcion: nott.descripcion,
        descripNoticia: nott.descripNoticia,
        autor: nott.autor,
        foto: nott.foto,
        categoria: undefined,
        pieDeFoto: nott.pieDeFoto,
        hora: nott.hora,
        fecha: nott.fecha
      };
      const respuesta = await fetch(urll + "/noticias/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticiaModificada),
      });
      if (respuesta.status === 200) {
        console.log('ee')
      }
    } catch (error) {
      console.log(error);
    }
};