import React, {Component} from 'react';

import InfoBoxes from "../components/Graphs/InfoBoxes";
import Graph_1 from "../components/Graphs/Graph_1";
import Graph_2 from "../components/Graphs/Graph_2";
import Graph_3 from "../components/Graphs/Graph_3";
import Graph_4 from "../components/Graphs/Graph_4";

import { Container, Row, Col} from "react-bootstrap";


class Dashboard extends Component {
  render(){
    return (
      <Container fluid>
        <h1>Dashboard Page</h1><br />
        <Row>
          <InfoBoxes /><br/>
        </Row><br />
        <Row>
          <InfoBoxes /><br/>
        </Row><br />
        <Row>
          <Col><Graph_1/></Col>
          <Col><Graph_2/></Col>
        </Row><br />
        <Row>
          <Col><Graph_3/></Col>
          <Col><Graph_4/></Col>
        </Row>
      </Container>
    );
  }
};
export default Dashboard; 


