import React from 'react';
import ReactDOM from 'react-dom';

export default class HotSearch extends React.Component{
  constructor(){
    super();
    this.state={
      places: []
    }
  }

  componentDidMount(){
    var input = ReactDOM.findDOMNode(this.refs.googleinput); //have to access DOM for this, there's work arounds thru npm etc. but seemed very skrewy
    this.searchBox = new google.maps.places.SearchBox(input);
    google.maps.event.addListener(this.searchBox, 'places_changed', () => {
      var places = this.searchBox.getPlaces();
      if (places.length > 0){ //because searchbox.getplaces() returns an array, if it's empty it means it couldn't find a location
        this.props.searchCallBack(places[0].geometry.location.lat(), places[0].geometry.location.lng())
        /*right now I've only cared about the location but there's a lot of properties in the places object that could be useful if you
        wanted to have more verbose feedback to the user*/
      }
    })


  }

  render(){
    return(
      <div style={controls}>
        <input style={pacInput}
          ref='googleinput'
          type="text"
          placeholder="Enter a location" />
      </div>
    )
  }
}
//I just pulled these stylings from the google example searchbox but it's easily restyleable.

const controls = {
  marginTop: '10px',
  border: '1px solid transparent',
  borderRadius: '2px 0 0 2px',
  font: 'Roboto',
  outline: 'none',
  marginLeft: '12px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  position: 'absolute',
  height: '36px',
  zIndex: '1000'
}

const pacInput ={
  backgroundColor: '#fff',
  fontFamily: 'Roboto',
  fontSize: '15px',
  fontWeight: '300',
  padding: '0 11px 0 13px',
  textOverflow: 'ellipsis',
  width: '300px',
  height: '100%',
  border: 'none',
  zIndex: '1000'
}
propTypes: {
  submitFunc:  React.PropTypes.func.isRequired
}
