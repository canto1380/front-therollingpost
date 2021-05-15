import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  DropdownButton,
  Dropdown,
  ListGroup,
} from "react-bootstrap";
import SelectCategoria from "./SelectCategoria";

const AgregarNoticia = (props) => {
  const [tituloNoticia, setTituloNoticia] = useState("");
  const [subtituloNoticia, setSubtituloNoticia] = useState("");
  const [autor, setAutor] = useState("");
  const [resumenNoticia, setResumenNoticia] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  const { setConsultarCat, categorias } = props;

  const cambioCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Form className="my-5" onSubmit={handleSubmit}>
        <h1 className="text-center">Agregar Noticia</h1>
        <Form.Group className="mb-3">
          <Form.Label>*Titulo de la Noticia:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Balacera en la Costanera"
            onChange={(e) => setTituloNoticia(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>*Subtitulo:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enfrentamiento policial"
            onChange={(e) => setSubtituloNoticia(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>*Autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Alejandro Poviña"
            onChange={(e) => setAutor(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>*Resumen</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            onChange={(e) => setResumenNoticia(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="my-3">*Categoria</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Seleccionar una Categoria......"
            onChange={cambioCategoria}
          >
            {/* Aqui van los option */}
            <option>Seleccione una Categoria...</option>
            <option>
              <ListGroup.Item>
                {categorias.map((cat) => (
                  <SelectCategoria
                    cat={cat}
                    key={cat.id}
                    setConsultarCat={props.setConsultarCat}
                  />
                ))}
              </ListGroup.Item>
            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>*Imagen</Form.Label>
          <Form.File onChange={(e) => setImagen(e.target.value)}></Form.File>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button className="w-75" variant="success" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default AgregarNoticia;
