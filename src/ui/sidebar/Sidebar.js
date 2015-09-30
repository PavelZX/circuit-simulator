import React from 'react';
import ComponentSelector from './ComponentSelector.js';

const { PropTypes } = React;

export default class Sidebar extends React.Component {
  render() {
    return (
      <div style={ this.props.style }>
        <ComponentSelector {...this.props} style={{flexGrow: 1}} />
          <div style={{alignSelf: 'center'}} >
            <span>
              Made by <a href='http://thomwright.co.uk'>Thom Wright</a> - <a href='https://github.com/circuitsim'><span className='octicon octicon-mark-github'></span></a>
            </span>
          </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  theme: PropTypes.object.isRequired,
  style: PropTypes.object
};
