export const consultarMedioDePagos = async () => {
  try {
    const urlMediosDePago = "https://api.mercadopago.com/v1/payment_methods";
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer APP_USR-4896519279617724-090611-b47690be738981c1fb94036d0896ad96-260406757",
      },
    };
    const res = await fetch(urlMediosDePago, config);
    const infoMediosDePago = await res.json();
    console.log(infoMediosDePago);
    if (res.status === 200) {
      return infoMediosDePago;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

export const crearCaja = async () => {
  try {
    const urlNuevaCaja = "https://api.mercadopago.com/pos";
    const nuevaCaja = {
      name: "Caja Suscriptos",
      fixed_amount: true,
      store_id: 1234567,
      external_store_id: "SUC001",
      external_id: "SUC001POS001",
      category: 621102,
    };
    const config = {
      method: "POST",
      headers: {
        authorization:
          "Bearer APP_USR-4896519279617724-090611-b47690be738981c1fb94036d0896ad96-260406757",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCaja),
    };
    const response = await fetch(urlNuevaCaja, config);
    console.log(response);
  } catch (error) {
    return error;
  }
};

export const crearUsuarioPrueba = async() => {
  try {
    const data = {
      site_id: "MLA1",
      description: "description"
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer APP_USR-4896519279617724-090611-b47690be738981c1fb94036d0896ad96-260406757",
      },
      body: JSON.stringify(data)
    }
    const url = 'https://api.mercadopago.com/users/test_user'
    const response = await fetch(url, config)
    const infoMediosDePago = await response.json();
    console.log(infoMediosDePago)
  } catch (error) {
    return error
  }
}
