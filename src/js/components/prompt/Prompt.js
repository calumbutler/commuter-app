//Vendor
import React, {Component} from 'react';
import {Input, Form, Button} from 'muicss/react';
import {TimePicker} from 'material-ui';
import Slider, {Range} from 'rc-slider';
//Local
import {viewOptions} from 'js/config';
import {promptStore} from 'js/components/prompt/PromptStore';
import {weatherActions} from 'js/components/weather/WeatherActions';
import {promptActions} from 'js/components/prompt/PromptActions';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Prompt extends Component {
  constructor(props){
		super(props);
    //bind state to store
		this.state = promptStore.getState();
		promptStore.listen(this.storeDidUpdate.bind(this));
	}

  componentDidMount() {

    //initialize store
    promptActions.initialize();
  }

  storeDidUpdate = () => {
    this.setState(promptStore.getState());
  }
  //update temperatures in promptStore
  _updateTemperatureValues = (values) => {
    promptActions.updateTemperatureValues(values)
  }
  /*
    param {num}
      update p
    return (array of )
  */
  _updatePreciptationValue = (value) => {
    promptActions.updatePreciptationValue(value)
  }
  /*
    param {num, event}
      update time in stores
    return (array of )
  */
  _updateTime(index, e){
    let hour = e.getHours();
    promptActions.updateTimes(index, hour);
    weatherActions.updateTimes(index, hour);
  }

  render () {
    //create a random array for rain drops [[left, top],....]
    let nbDrop = this.state.preciptationValue * 5;
    let rainCoordsArray = [];
    for(let i=1; i<nbDrop; i++) {
        var dropLeft = randRange(0,1600);
        var dropTop = randRange(-1000,1400)
        rainCoordsArray.push([dropLeft, dropTop])
    }

    // function to generate a random number range.
    function randRange( minNum, maxNum) {
      return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }

    // function to generate drops
    return (
      <div id='rain' ref='appView' className='prompt-body flex flex-row rain'>
        {
          rainCoordsArray.map((values, index) => {
            return (<div className={'drop'} id={'drop'+ index} style={{left: values[0], top: values[1]}}></div>)
          })
        }
        <div className='range-slider--container flex flex-column'>
          <h3 className='prompt__header--text-size text-center'>Temperature Range</h3>
          <Range defaultValue={this.state.temperatureValues} min={-40} max={130} onChange={this._updateTemperatureValues} />
          <ul className='prompt__slider--text-size flex flex-row justify-between'>
            <li>
            {this.state.temperatureValues[0] + ' °F'}
            </li>
            <li>
            {this.state.temperatureValues[1] + ' °F'}
            </li>
          </ul>
        </div>
        <div className='basic-slider--container flex flex-column'>
          <h3 className='prompt__header--text-size text-center'>Chance of Rain</h3>
          <Slider defaultValue={this.state.preciptationValue} min={0} max={100}  onAfterChange={this._updatePreciptationValue} onChange={this._updatePreciptationValue}/>
          <ul className='prompt__slider--text-size flex flex-row justify-around'>
            <li>{this.state.preciptationValue + '%'}</li>
          </ul>
        </div>
        <div className='flex flex-column'>
         <TimePicker defaultTime={new Date(2007, 11, 5, this.state.times[0], 0, 0)} id={'to--work'} onChange={(x,e) => {this._updateTime(0, e)}}/>
         <TimePicker defaultTime={new Date(2007, 11, 5, this.state.times[1], 0, 0)} id={'from--work'} onChange={(x,e) => {this._updateTime(1, e)}}/>
        </div>
      </div>
    );
  }
}
