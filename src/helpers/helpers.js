/* Si el admin esta logueado */
export const isAuthenticated =() =>{
    if(localStorage.getItem('jwt')){
        return true
    } else {
        return false
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