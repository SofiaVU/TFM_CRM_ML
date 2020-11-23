import React, {Component} from 'react';
import api from '../api'

import InfoBoxes from "../components/Graphs/InfoBoxes";
import Graph_1 from "../components/Graphs/Graph_1";
import Graph_2 from "../components/Graphs/Graph_2";
import Graph_3 from "../components/Graphs/Graph_3";
import Graph_4 from "../components/Graphs/Graph_4";

import { Container, Row, Col, Spinner, Button} from "react-bootstrap";


class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      monthlyRev: [],
      infoBoxesData: [],
      isLoading: true,
      }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getMonthlyRevenue().then(monthlyRev => {
        this.setState({
          monthlyRev: monthlyRev.data.data,
          //  isLoading: false,
        })
        //console.log("COMPONENT DID MOUNT")
        //console.log(monthlyRev.data.data)
    })

    await api.getInfoBoxes().then(infoBoxesData => {
      this.setState({
        infoBoxesData: infoBoxesData.data.data,
        //isLoading: false,
      })
      //console.log("COMPONENT DID MOUNT")
      //console.log(monthlyRev.data.data)
    })

    if(this.state.monthlyRev.length != 0 && this.state.infoBoxesData.length !=0){
      this.setState({
        isLoading: false
      })
    }

  }

  render(){
    if(this.state.isLoading == true) {
      return(
        <div>
          <Button  size="lg" variant="Link" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>{' '}
          <Button size="lg" variant="Link" disabled>
            Loading Data ...
          </Button>
        </div>
      ); 
    }
    return (
      <Container fluid>
        <h1>Dashboard Page</h1><br />
        <Row>
          <InfoBoxes data={this.state.infoBoxesData}/><br/>
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


