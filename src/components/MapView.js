import React from 'react'
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline
} from 'react-leaflet'
export default class MapView extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  onClick(e) {
    this.props.addDestination(

      this.eventToCoordinate(e)
    )
  }
  onContextMenu(e) {
    this.props.addSink(
      this.eventToCoordinate(e)
    )
  }
  eventToCoordinate(event) {
    let res = [
      event.latlng.lat,
      event.latlng.lng
    ]
    return res
  }
  render() {
    return (
      <Map
        center={[48.13333, 11.56667]}
        zoom={13}
        onClick={this.onClick.bind(this)}
        onContextMenu={this.onContextMenu.bind(this)}
        style={{height: '80vh'}}
        zoomControl={false}
      >
        <TileLayer
          url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png'
        />
        {
          this.props.sinks.map(sink =>
            <Marker draggable={false} position={sink.location}>
              <Tooltip permanent>
               Sink
              </Tooltip>
            </Marker>
          )
        }
        {
          this.props.destinations.map(dest =>
            <Marker draggable={false} position={dest.location} />
          )
        }
        {
          this.props.results.map(({routes}) =>
            <Polyline positions={routes.map(p => p.location)} />
          )
        }

      </Map>

    )
  }
}
