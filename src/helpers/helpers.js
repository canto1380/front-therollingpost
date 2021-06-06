import { Redirect} from 'react-router-dom';

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

export const campoRequerido = (value) =>{
    if(value.trim() === ''){
        return false
    } else {
        return true
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