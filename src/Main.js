import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import db from './firebaseInit';
import colours from './colours';
import fonts from './fonts';
import './Main.css';

class Main extends Component {

  constructor (props) {
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.state = {
      index: 0,
      transition: false,
      quotes: [],
    }
  }

  componentDidMount () {
    this.fetchQuotes();
  }

  transition () {
    this.setState({ transition: true });
  }

  previous () {
    const { index } = this.state;
    this.setState({
      index: index - 1,
      transition: false,
    }, this.transition);
  }

  next () {
    const { index } = this.state;
    this.setState({
      index: index + 1,
      transition: false,
    }, this.transition);
  }

  async fetchQuotes () {
    const quotes = [];
    const querySnapshot = await db.collection(`quotes`).get();
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
      quotes.push({
        ...doc.data(),
        key: doc.id
      });
    });
    this.setState({ quotes }, this.transition);
  }

  render() {
    const { index, quotes, transition } = this.state;
    const crdm = Math.round(Math.random() * colours.length);
    const frdm = Math.round(Math.random() * fonts.length);
    const [ backgroundColor, color ] = colours[crdm];
    const style = { backgroundColor, color };
    return (
      <div className={'main ' + fonts[frdm]} style={style}>
        <CSSTransition
          in={transition}
          timeout={500}
          classNames="transi">
            <div className="main-trans-wrapper">
              <div className='topbar'>
                {index > 0 && quotes[index] && (
                  <span className='left' onClick={this.previous}>
                    <i className="material-icons arrow">arrow_back</i>
                    <span>Previous</span>
                  </span>
                )}
                {quotes[index + 1] && (
                  <span className='right' onClick={this.next}>
                    <span>Next</span>
                    <i className="material-icons arrow">arrow_forward</i>
                  </span>
                )}
              </div>
              <div className='content'>
                {quotes[index] && (
                  <span>{ quotes[index].content }</span>
                )}
              </div>
            </div>
          </CSSTransition>
      </div>
    );
  }
}

export default Main;
