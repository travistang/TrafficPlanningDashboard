import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,

  Pagination,
  PaginationItem,
  PaginationLink,

  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'
import * as Utils from '../utils'
export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.paginationSize = 2
    this.state = {
      sinksPage: 0,
      destsPage: 0,
      resultsPage: 0,
    }
  }
  displayLatLng(item) {
    return (
      null
    )
  }
  getResultComponent() {
    if(!this.props.results.length && !this.props.computing) {
      return (
        this.placeholderComponent("There are no results")
      )
    }
    if(!this.props.results.length && this.props.computing) {
      return (
        this.placeholderComponent("Computing results")
      )
    }
    return (
      [
        ...this.props.results
          .slice(
            this.state.resultsPage * this.paginationSize,
            (1 + this.state.resultsPage) * this.paginationSize
          )
          .map((routes,i) =>
            <ListGroupItem>
              <ListGroupItemHeading>
                Route {this.state.resultsPage * this.paginationSize + i}
              </ListGroupItemHeading>
              <ListGroup>
              {
                this.props
                .results[this.state.resultsPage * this.paginationSize + i]
                .routes.map(dest =>
                <ListGroupItem>
                  {dest.name}
                </ListGroupItem>
              )}
              </ListGroup>
            </ListGroupItem>
          )
        ,

        <Pagination>
          {
            Utils.listOfN(Math.ceil(this.props.results.length / this.paginationSize))
            .map(i =>
              <PaginationItem>
                <PaginationLink onClick={(() => this.setState({...this.state,resultsPage: i})).bind(this)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          }
        </Pagination>
      ]

    )
  }
  placeholderComponent(text) {
    return (
      <div style={{height: '100%',width: '100%',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        {text}
      </div>
    )
  }
  getComputeButton() {
    let color,text
    if(this.props.computing) {
      color="warning"
      text="Computing..."
    } else {
      color="success"
      text="Compute Solution"
    }
    return (
      <Button onClick={this.computeSolution.bind(this)} block size="lg" color={color}>
        {text}
      </Button>
    )
  }
  computeSolution() {
    if(!this.props.computing) this.props.computeSolution()
  }
  render() {
    return (
      <div style={{display: 'flex',flexDirection: 'column'}}>
        <div style={{flex: 2}}>
          {this.getComputeButton()}

        </div>
        <div style={{flex: '0 5 40vh',display: 'flex'}}>
          <div style={{flex: 1}}>
            <h4> Sinks </h4>
            {
              this.props.sinks.length?(
                [
                  <ListGroup>
                    {
                      this.props.sinks.slice(
                        this.state.sinksPage * this.paginationSize,
                        (1 + this.state.sinksPage) * this.paginationSize
                      ).map(sink =>
                        <ListGroupItem>
                          <ListGroupItemHeading>
                            {sink.name}
                          </ListGroupItemHeading>
                          {
                            this.displayLatLng(sink)
                          }
                        </ListGroupItem>
                      )
                    }
                  </ListGroup>,

                  <Pagination>
                    {
                      Utils.listOfN(Math.ceil(this.props.sinks.length / this.paginationSize))
                      .map(i =>
                        <PaginationItem>
                          <PaginationLink onClick={(() => this.setState({...this.state,sinksPage: i})).bind(this)}>
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }
                  </Pagination>

                ]

              ):
              this.placeholderComponent("There are no sinks")
            }

          </div>
          <div style={{flex: 1}}>
            <h4> Destinations </h4>
            {
              this.props.destinations.length?(
                [
                  <ListGroup>
                    {
                      this.props.destinations.slice(
                        this.state.destsPage * this.paginationSize,
                        (1 + this.state.destsPage) * this.paginationSize

                      ).map(dest =>
                        <ListGroupItem>
                          <ListGroupItemHeading>
                            {dest.name}
                          </ListGroupItemHeading>
                          {
                            this.displayLatLng(dest)
                          }
                        </ListGroupItem>
                      )
                    }
                  </ListGroup>,

                  <Pagination>
                    {
                      Utils.listOfN(Math.ceil(this.props.destinations.length / this.paginationSize))
                      .map(i =>
                        <PaginationItem>
                          <PaginationLink onClick={(() => this.setState({...this.state,destsPage: i})).bind(this)}>
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }
                  </Pagination>
                ]

              ):
              this.placeholderComponent("There are no destinations")
            }

          </div>
        </div>
        <div style={{flex: 5}}>
          <h4> Results </h4>
          {this.getResultComponent()}
        </div>
      </div>
    )
  }
}
