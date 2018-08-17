import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Container,
  Row,
  Col,
} from 'reactstrap'
import MapView from './containers/MapView'
import ControlPanel from './containers/ControlPanel'
import style from './style'
import './App.css'

class App extends Component {
  getNavBar() {
    return (
      <Navbar color="primary" light expand="md">
        <NavbarBrand>Transport Dashboard</NavbarBrand>
      </Navbar>
    )
  }
  getMapComponent() {
    return <MapView />
  }
  getControlPanelComponent() {
    return <ControlPanel />
  }
  render() {
    return (
      <div className="App">
        {this.getNavBar()}
        <Container fluid style={style.main.container}>
          <Row>
            <Col md={6} xs={12}>
              {this.getMapComponent()}
            </Col>
            <Col md={6} xs={12}>
              {this.getControlPanelComponent()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
