//Vendors
import React, {Component} from 'react';
import {Card} from 'material-ui';
//Locals
import {promptStore} from 'js/components/prompt/PromptStore';
import {images, days, months} from 'js/config';
//Images
import bicycleImage from 'images/bicycle.svg';
import metroImage from 'images/metro.svg';

export default class WeatherCard extends Component {
  displayName: 'Card';

  constructor(props){
    super(props);
    this.state = promptStore.getState();
    promptStore.listen(this.storeDidUpdate.bind(this));
  }

  componentDidMount() {
    // Subscribe to the store for updates
  }

  componentWillUnmount() {
  }

  storeDidUpdate = () => {
    this.setState(promptStore.getState());
  };
  /*
    param {num}
      multiply then round for percentage
    return (num)
  */
  _round = (num) =>{
    return Math.round(num * 100)
  }
  /*
    param {num, num}
      get date for card
    return (string time message)
  */
  _getDay = (time, firstDate) =>{
      let date = new Date();
      date.setSeconds(time - firstDate);

      return days[date.getDay()] + ', ' +  months[date.getMonth()] + ' ' + date.getDate() + 'th'
  }
  /*
    param {num}
      get current selected time for card
    return (string time message)
  */
  _getTime = (time) =>{
      let date = new Date();
      date.setSeconds(time);

      return  (date.getHours() > 12 ? (date.getHours() - 12) + ':00 pm' : date.getHours() + ':00 am');
  }
  /*
    param {object}
      check if temperature max and min are within range
    return (true || false)
  */
  _withinTemperatureRangeWeekly = (data) => {
    let maxLess = data.temperatureMax < promptStore.getState().temperatureValues[1] ? true : false;
    let maxGreater = data.temperatureMax > promptStore.getState().temperatureValues[0] ? true : false;
    let minLess = data.temperatureMin < promptStore.getState().temperatureValues[1] ? true : false;
    let minGreater = data.temperatureMin > promptStore.getState().temperatureValues[0] ? true : false;

    return (maxLess && maxGreater && minLess && minGreater)
  }
  /*
    param {object}
      check if temperature is within range
    return (jsx bike message || jsx metro message)
  */
  _withinTemperatureRangeDaily(data){
    let temperatureLess = data.temperature < promptStore.getState().temperatureValues[1] ? true : false;
    let temperatureGreater = data.temperature > promptStore.getState().temperatureValues[0] ? true : false;

    return (temperatureLess && temperatureGreater)
  };
  /*
    param {object}
      check if users values are within range for biking
    return (jsx bike message || jsx metro message)
  */
  _getUserCommuteMessage = (data) => {
    let withinTempRange = (this.props.view === 'Weekly')? this._withinTemperatureRangeWeekly(data) : this._withinTemperatureRangeDaily(data);
    let belowPreciptationValue = promptStore.getState().preciptationValue >= (data.precipProbability * 100);

    let message = withinTempRange && belowPreciptationValue ?
    (<div>
      <h3>Bike</h3>
      <img className="bike-image" src={bicycleImage} alt="app-logo" />
    </div>) :
    (<div>
      <h3>Metro</h3>
      <img className="bike-image" src={metroImage} alt="app-logo" />
    </div>);

    return message
  }

  render () {

    let time = this.props.data.time;
    let firstDate = this.props.timeArray[0].time;
    let timeDateMessage = this.props.view === 'Weekly' ? this._getDay(time, firstDate) : this._getDay(time, firstDate) + ' ' + this._getTime(time);

    return (
      <div className='weather__view-card text-center'>
        <Card>
          <h3>{timeDateMessage}</h3>
          <div>
          {this._getUserCommuteMessage(this.props.data)}
          </div>
          <img height='256' width='256' src={images[this.props.data.icon]}/>
          <h4>{this.props.data.summary}</h4>
          <p>{this._round(this.props.data.precipProbability) + '% chance of rain'}</p>
        </Card>
      </div>
    );
  }
}
