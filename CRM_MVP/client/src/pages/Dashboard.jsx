import React, {Component} from 'react';
import api from '../api'

import InfoBoxes from "../components/Graphs/InfoBoxes";
import Graph_1 from "../components/Graphs/Graph_1";
import Graph_2 from "../components/Graphs/Graph_2";
import Graph_3 from "../components/Graphs/Graph_3";
import Graph_4 from "../components/Graphs/Graph_4";

import { Container, Row, Col} from "react-bootstrap";


class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      monthlyRev: [],
      isLoading: false,
      }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getMonthlyRevenue().then(monthlyRev => {
        this.setState({
          monthlyRev: monthlyRev.data.data,
            isLoading: false,
        })
        //console.log("COMPONENT DID MOUNT")
        //console.log(monthlyRev.data.data)
    })
  }

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
          <Col><Graph_2 data={this.state.monthlyRev}/></Col>
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


