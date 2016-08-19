import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import GoogleMap from 'google-map-react'; /*https://github.com/istarkov/google-map-react
                                            https://www.npmjs.com/package/google-map-react*/
import HotSearch from './hot-search';

import ConeMarker from './cone-marker';

export default class MapPicker extends Component{

    constructor(props) {
      super(props);
      this.state = {lat: 49.2827, lng: -123.1207, zoom: 7};
      /*I stored the location of the marker as local state, an alternative would be to store it
      using a callback and props but I wanted to keep to just one callback and it also moves the map arounds
      which is really disorienting if you're clicking.*/
    }

    mapClicked({x, y, lat, lng, event}){
      this.setState({lat, lng})
    }

    handleExit(){
      this.props.callBack(this.state.lat, this.state.lng)
      this.props.hide()
    }

    handleSearch(lat, lng){
      this.setState({lat, lng})
      this.props.callBack(this.state.lat, this.state.lng)
    }

    render() {
      return (
        <Modal show={this.props.show} onHide={this.handleExit.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Map Picker</Modal.Title>
          </Modal.Header>
          <div style= {{height: '500px', position: 'relative'}}>
              <HotSearch searchCallBack={this.handleSearch.bind(this)}/>
             <GoogleMap
                onClick={this.mapClicked.bind(this)}
                bootstrapURLKeys={{key: 'AIzaSyDhPvOWKUk2CeJxbkvS4zWA_hbZ_B5SbsI'}/*That's my key from my google account with ewhite@conetec.com*/}
                center={this.props.center}
                zoom={this.state.zoom}>
              <ConeMarker lat={this.state.lat} lng={this.state.lng} text={''}/>
            </GoogleMap>
          </div>
      </Modal>
      );
    }
}

MapPicker.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  callBack: PropTypes.func
};
MapPicker.defaultProps = {
  center: [49.2827, -123.1207]
};
