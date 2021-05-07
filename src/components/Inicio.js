import React from "react";
import {Container, Card} from "react-bootstrap";
import LogoNR from "../img/Logo-NR.png";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'


const Inicio = () => {
  return (
    
    <Container>
      <section className="my-5">
        <h4>Destacados</h4>
        <hr />
        <Row>
    <Col sm={8} className="h-100" >

    {/* <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
  </Card> */}

      <div className="card tarjetaNoticia w-100">
        <img className="card-img-top w-100" src={LogoNR}  alt="" />
        <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
      </div> 
     
      
</Col>
    <Col sm={4}>
      
    {/* <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
         This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer. 
      </Card.Text>
    </Card.Body>
  </Card>

  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
  </Card> */}

    <div className="card tarjetaNoticia">
        <img className="card-img-top w-100" src={LogoNR}  alt="" />
        <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
      </div>
      <div className="card tarjetaNoticia">
        <img className="card-img-top w-100" src={LogoNR}  alt="" />
        <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
      </div>

     

</Col>
  </Row>
      </section>
      <section className="my-5">
        <h4>Politica</h4>
        <hr />
        <CardDeck className="cardDeck">
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer. */}
      </Card.Text>
    </Card.Body>
  </Card>
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This card has supporting text below as a natural lead-in to additional
        content.{' '} */}
      </Card.Text>
    </Card.Body>
  </Card>
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action. */}
      </Card.Text>
    </Card.Body>
    
  </Card>
</CardDeck>
      </section>
      <section className="my-5">
        <h4>Deportes</h4>
        <hr />
        <CardDeck className="cardDeck">
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer. */}
      </Card.Text>
    </Card.Body>
   
  </Card>
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This card has supporting text below as a natural lead-in to additional
        content.{' '} */}
      </Card.Text>
    </Card.Body>
    
  </Card>
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action. */}
      </Card.Text>
    </Card.Body>
    
  </Card>
</CardDeck>
      </section>
      <section className="my-5">
        <h4>Economia</h4>
        <hr />
        <CardDeck className="cardDeck">
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer. */}
      </Card.Text>
    </Card.Body>
    
  </Card>
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This card has supporting text below as a natural lead-in to additional
        content.{' '} */}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        {/* This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action. */}
      </Card.Text>
    </Card.Body>
    
  </Card>
</CardDeck>
      </section>
      

    </Container>
  );
};

export default Inicio;
