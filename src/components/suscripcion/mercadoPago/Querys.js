export const consultarMedioDePagos = async(tok) => {
    try {
      const urlMediosDePago = 'https://api.mercadopago.com/v1/payment_methods'
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: tok.token
        }
      };
      console.log('aaaaa')
      const res = await fetch(urlMediosDePago, config);
      const infoMediosDePago = await res.json();
      console.log(infoMediosDePago)
      if (res.status === 200) {
        return infoMediosDePago
      } else {
          return null
      }
    } catch (error) {
      return error
    }
  };