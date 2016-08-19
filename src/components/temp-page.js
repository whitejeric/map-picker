import React from 'react';
import MapPicker from './map-picker'
import HotSearch from './hot-search'

export default class Page extends React.Component{
  constructor(){
    super();
    this.state={
      show_picker: false,
      lat: 49.2827,
      long: -123.1207
    }
  }

  changeCoords(lat, long){
    this.setState({lat, long});
  }

  floorFigure(figure, decimals){
    if (!decimals) decimals = 2;
    var d = Math.pow(10,decimals);
    return (parseInt(figure*d)/d).toFixed(decimals);
  }

  render(){
    const open = () => this.setState({show_picker: true});
    const close = () => this.setState({show_picker: false});
    var cur_loc = [this.state.lat, this.state.long];
    return(
      <div style={bodystyle}>
        <h3>Map Picker App</h3>
        <hr/>
        <p>Hit open, select a location using left click or drag around. When you type into the address bar and hit enter it automatically
        sets the lat and longs to the value of that location and also moves the marker there. Otherwise the lat and longs are only changed
        once you exit the modal/click off it. <a href='#' onClick={open}>Open</a>.</p>

        <MapPicker show={this.state.show_picker} callBack={this.changeCoords.bind(this)} center={cur_loc} hide={close}/>
        <h3>lat: {this.floorFigure(cur_loc[0], 2)} long: {this.floorFigure(cur_loc[1], 2)}</h3>

        <p>The library I used to create this app is called google-map-react and has a <a href='https://github.com/istarkov/google-map-react'>git</a>
        &nbsp;and <a href='https://www.npmjs.com/package/google-map-react'>npm</a> page.</p>

        <p>Side note: there is a small .css file (/resources/styles/style.css) coupled in here as the interactions between the modal and
        the map/search bar called for new z-index values.</p>



      </div>
    )
  }
}

const bodystyle = {
  marginLeft: '20px',
  marginRight: '20px',
  position: 'relative'
}
