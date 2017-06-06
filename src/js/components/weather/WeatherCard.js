import React, {Component} from 'react';
import {promptStore} from 'js/components/prompt/PromptStore';
import {images, days} from 'js/config';
import {Card} from 'material-ui';
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

    if (this.refs){
      this.setState(promptStore.getState());
    }
  };

  _round = (num) =>{
    return Math.round(num * 100)
  }
  //get day date and month from api time
  _getDay = (time, firstDate) =>{
      let date = new Date();
      date.setSeconds(time - firstDate);

      return days[date.getDay()] + ' '+ date.getDate() + '/' + date.getMonth()
  }
  //get day date and month from api time
  _getTime = (time) =>{
      let date = new Date();
      date.setSeconds(time);

      return  (date.getHours() > 12 ? (date.getHours() - 12) + ':00 pm' : date.getHours() + ':00 am');
  }
  //check if temperature is within range
  _withinTemperatureRange = (data) => {
    let maxLess = data.temperatureMax < promptStore.getState().temperatureValues[1] ? true : false;
    let maxGreater = data.temperatureMax > promptStore.getState().temperatureValues[0] ? true : false;
    let minLess = data.temperatureMin < promptStore.getState().temperatureValues[1] ? true : false;
    let minGreater = data.temperatureMin > promptStore.getState().temperatureValues[0] ? true : false;

    return (maxLess && maxGreater && minLess && minGreater)
  }
  //check if users values are within range for biking
  _getUserBikeWeekly = (data) => {
    let withinTempRange = this._withinTemperatureRange(data);
    let belowPreciptationValue = promptStore.getState().perciptationValue > (data.precipProbability * 100);
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

  _withinTemperatureRangeDaily(data){
    let temperatureLess = data.temperature < promptStore.getState().temperatureValues[1] ? true : false;
    let temperatureGreater = data.temperature > promptStore.getState().temperatureValues[0] ? true : false;

    return (temperatureLess && temperatureGreater)
  };

  //check if user should bike today
  _getUserBikeDaily = (data) => {

    let withinTempRange = this._withinTemperatureRangeDaily(data);
    let belowPreciptationValue = promptStore.getState().perciptationValue >= (data.precipProbability * 100);
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

  _renerWeekly = () => {
    let time = this.props.data.time;
    let firstDate = this.props.timeArray[0].time;
    return (
      <div className='weather__view-card text-center'>
        <Card>
          <h3>{this._getDay(time, firstDate)}</h3>
          <div>
          {this._getUserBikeWeekly(this.props.data)}
          </div>
          <img height='256' width='256' src={images[this.props.data.icon]}/>
          <h4>{this.props.data.summary}</h4>
          <p>{this._round(this.props.data.precipProbability) + '% chance of rain'}</p>
        </Card>
      </div>
    );
  }
  _renerToday = () => {
    let time = this.props.data.time;
    let firstDate = this.props.timeArray[0].time;
    return (
      <div className='weather__view-card text-center'>
        <Card>
          <h3>{this._getDay(time, firstDate) + ' ' + this._getTime(time)}</h3>
          <div>
          {this._getUserBikeDaily(this.props.data)}
          </div>

          <img height='256' width='256' src={images[this.props.data.icon]}/>
          <h4>{this.props.data.summary}</h4>
          <p>{this._round(this.props.data.precipProbability) + '% chance of rain'}</p>
        </Card>
      </div>
    );
  }

  render () {

    if(this.props.view === 'Weekly'){

      return this._renerWeekly()
    }else{
      return this._renerToday()
    }
  }
}
