//Vendor
import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {MuiThemeProvider} from 'material-ui'; //needed to wrap app for material-ui components

//Locals
import Weather from 'js/components/weather/Weather';
import Prompt from 'js/components/prompt/Prompt';
import Header from 'js/components/Header';
import {text} from 'js/config';

export default class App extends Component {
  displayName: 'App';

  render () {
    return (
      <MuiThemeProvider>
        <div className='root'>
          <Header title={text.title} subtitle={text.subtitle} />
          <Prompt />
          <Weather />
        </div>
      </MuiThemeProvider>
    );
  }

}
