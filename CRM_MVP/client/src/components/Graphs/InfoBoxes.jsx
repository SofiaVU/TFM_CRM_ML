import React from 'react';
import {Col, Container, Row, Toast} from "react-bootstrap";
import {IconContext} from "react-icons";
import {MdFace,MdAttachMoney,MdShoppingCart,MdShowChart} from "react-icons/md";
import api from '../../api'

class InfoBoxes extends React.Component {
  render () {
    if(this.props.data === null || this.props.data === undefined){
      return(
        <p> Cargando... </p>
      );
    }
    //var RevM = Math.round((Math.round(this.state.data.TotalRevenue)/1000000)*100)/100;
    console.log(this.props.data.TotalRevenue)
    var RevM = Math.round((Math.round(this.props.data.TotalRevenue)/1000000)*100)/100;
    var niceRev = String(RevM).concat(" M");

    //var itemsM = Math.round((Math.round(this.state.data.TotalSoldItems)/1000000)*100)/100;
    var itemsM = Math.round((Math.round(this.props.data.TotalSoldItems)/1000000)*100)/100;
    var niceItems = String(itemsM).concat(" M");

    return (
      <Container fluid>        
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
                    <h3>{this.props.data.TotalTransactions}</h3>
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
                    <h4>Total Revenue </h4>
                    <h3>{niceRev}</h3>
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
                    <h4>Total Sold Items </h4>
                    <h3>{niceItems}</h3>
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
                    <h3>{this.props.data.TotalCustomers}</h3>
                  </div>
                </Col>
              </Row>
            </Toast.Body></Toast>
          </Col>
  
        </Row>
      </Container>
  
    );
  }
  
}
export default InfoBoxes;

