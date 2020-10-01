import React from 'react';
import {Col, Container, Row, Toast} from "react-bootstrap";
import {IconContext} from "react-icons";
import {MdFace,MdAttachMoney,MdShoppingCart,MdShowChart} from "react-icons/md";


const InfoBoxes = (props) => {
  return (
    <Container fluid>
      <h1>Dashboard Page</h1><br />
      <Row>
        <Col>
          <Toast><Toast.Body>
            <Row>
              <Col xs={5}>
                <div style={{background:'#92D050', padding:'8px', width: '90%', height: '100%', textAlign:'center'}}>
                  <IconContext.Provider style={{textAlign: 'center', Top:'8px'}} value={{color:'#fff', size:"65%"}}>
                    <MdShoppingCart style={{height:'100%'}}/>
                  </IconContext.Provider>
                </div>
              </Col>
              <Col>
                <div style={{textAlign:'center'}}>
                  <h4>Total Sales </h4>
                  <h3>450</h3>
                </div>
              </Col>
            </Row>
          </Toast.Body></Toast>
        </Col>

        <Col>
          <Toast><Toast.Body>
            <Row>
              <Col xs={5}>
                <div style={{background:'#BC74FF', padding:'8px', width: '90%', height: '100%', textAlign:'center'}}>
                  <IconContext.Provider style={{textAlign: 'center', Top:'8px'}} value={{color:'#fff', size:"65%"}}>
                    <MdAttachMoney style={{height:'100%'}}/>
                  </IconContext.Provider>
                </div>
              </Col>
              <Col>
                <div style={{textAlign:'center'}}>
                  <h4>Total Profit </h4>
                  <h3>1K</h3>
                </div>
              </Col>
            </Row>
          </Toast.Body></Toast>
        </Col>

        <Col>
          <Toast><Toast.Body>
            <Row>
              <Col xs={5}>
                <div style={{background:'#41CDDF', padding:'8px', width: '90%', height: '100%', textAlign:'center'}}>
                  <IconContext.Provider style={{textAlign: 'center', Top:'8px'}} value={{color:'#fff', size:"65%"}}>
                    <MdShowChart style={{height:'100%'}}/>
                  </IconContext.Provider>
                </div>
              </Col>
              <Col>
                <div style={{textAlign:'center'}}>
                  <h4>Total Profit </h4>
                  <h3>1K</h3>
                </div>
              </Col>
            </Row>
          </Toast.Body></Toast>
        </Col>

        <Col>
          <Toast><Toast.Body>
            <Row>
              <Col xs={5}>
                <div style={{background:'#FA80C2', padding:'8px', width: '90%', height: '100%', textAlign:'center'}}>
                  <IconContext.Provider style={{textAlign: 'center', Top:'8px'}} value={{color:'#fff', size:"65%"}}>
                    <MdFace style={{height:'100%'}}/>
                  </IconContext.Provider>
                </div>
              </Col>
              <Col>
                <div style={{textAlign:'center'}}>
                  <h4>Members </h4>
                  <h3>380</h3>
                </div>
              </Col>
            </Row>
          </Toast.Body></Toast>
        </Col>

      </Row>
    </Container>

  );
};
export default InfoBoxes;

