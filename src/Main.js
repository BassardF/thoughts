import React, { Component } from 'react';
import colours from './colours';
import fonts from './fonts';
import './Main.css';

const input = ['This is a header And this is a paragraph', 'tete'];

class Main extends Component {
  render() {
    const crdm = Math.round(Math.random() * colours.length);
    const frdm = Math.round(Math.random() * fonts.length);
    const [ backgroundColor, color ] = colours[crdm];
    const style = { backgroundColor, color };
    return (
      <div className={'main ' + fonts[frdm]} style={style}>
        <div className='topbar'>
          <span className='left'>
            <i className="material-icons arrow">arrow_back</i>
            <span>Previous</span>
          </span>
          <span className='right'>
            <span>Next</span>
            <i className="material-icons arrow">arrow_forward</i>
          </span>
        </div>
        <div className='content'>
          {input}
        </div>
      </div>
    );
  }
}

export default Main;
