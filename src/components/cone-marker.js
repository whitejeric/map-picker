import React, {PropTypes, Component} from 'react';

const K_WIDTH = 20;
const K_HEIGHT = 20;

const ConeMarkerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  boxShadow: '0 2px 6px rgba(116, 164, 188, 0.4)',
  borderRadius: K_HEIGHT,
  backgroundColor: 'rgba(70, 90, 210, 1)',
  textAlign: 'center',
  padding: 1
};

export default class ConeMarker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div style={ConeMarkerStyle}>
          {this.props.text}
       </div>
    );
  }
}

ConeMarker.propTypes = {
  text: PropTypes.string
};

ConeMarker.defaultProps = {};
