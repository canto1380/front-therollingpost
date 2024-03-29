const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const nombreApellido = /^[a-zA-ZÀ-ÿ\s]{4,60}$/;
const edad = /^[0-9]{1,3}$/;
const clave = /^[a-z0-9_-]{8,15}$/;
const paisExpReg = /^[a-zA-ZÀ-ÿ\s]{4,40}$/;
const textoER = /^[^\n]{12,}$/;
const autorER = /^[^\n]{12,}$/; // Letras y espacios, pueden llevar acentos.
const textoPieER = /^[^\n]{7,}$/; // Letras, numeros
const resumenER = /^[\s\S]{500,}$/;
const categoriaER = /^[a-zA-ZÀ-ÿ\s]{4,40}$/;
const cpER = /^[0-9]{4,8}$/;
const telER = /^[0-9]{10,15}$/;
const titularTarjetaER = /^[a-zA-ZÀ-ÿ\s]{10,70}$/;
const nroDocumentoER = /^[0-9]{7,11}$/;
const nroTarjetaER = /^[0-9]{16}$/;
const cvvER = /^[0-9]{3}$/;

export {
  email,
  nombreApellido,
  edad,
  clave,
  paisExpReg,
  textoER,
  autorER,
  textoPieER,
  resumenER,
  categoriaER,
  cpER,
  telER,
  titularTarjetaER,
  nroDocumentoER,
  nroTarjetaER,
  cvvER,
};
