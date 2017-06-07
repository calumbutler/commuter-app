//Vendor
import {Button, Tab} from 'muicss/react'
import React, {Component} from 'react';
//Locals
import {weatherStore} from 'js/components/weather/WeatherStore';
import {promptStore} from 'js/components/prompt/PromptStore';
import {weatherActions} from 'js/components/weather/WeatherActions';
import WeatherCard from 'js/components/weather/WeatherCard';
import {getApiData} from 'js/utils/api';
import {viewOptions} from 'js/config';

export default class Body extends Component {
  constructor(props){
		super(props);
		this.state = weatherStore.getState();
		weatherStore.listen(this.storeDidUpdate.bind(this));
	}

  /*
    get api data when the component mounts
  */
  componentDidMount() {
    // Subscribe to the store for updates
    let apiData = getApiData('darkSky');
    //requet api data
    apiData.onreadystatechange = function(request){

        if(request.target.readyState === 4){
          let data = JSON.parse(request.target.response);
          weatherActions.initialize(data); //initialize store
        }
    };

  }

  storeDidUpdate = () => {
    this.setState(weatherStore.getState());//triggers re-render when store updates
  }
  /*
    param {array}
      return an array of filtered data based on selected times
    return (array of )
  */
  _formatDayData = (hourly) =>{

    let userSelectedHours = weatherStore.getState().times;
    //user array.filter to get unique array
    let filteredHoursArray = hourly.filter((hourData, index) => {
        //get time object for hoursData
        let time = new Date();
        time.setSeconds(hourData.time);
        //check if time has been selcted by user
        if((userSelectedHours.indexOf(time.getHours()) > -1)){
          return hourData;
        }
    });

    return filteredHoursArray;
  }

  render () {
    //set data for hourly and daily if store has been initiated
    let hourly = this.state.init ? this._formatDayData(this.state.darkSkyData.hourly.data) : [];
    let daily = this.state.init ? this.state.darkSkyData.daily.data : [];
    //set display state for views
    let displayToday = this.state.view === 'Today' ? 'flex': 'none';
    let displayWeekly = this.state.view === 'Weekly' ? 'flex': 'none';

    return (
      <div key='weather__container' ref='weather__container' className='weather__container' ref='appView'>
        <div key='weather__button-container' className='weather__button-container'>
          <Button key='today-button' ref='today-button' variant={'Raised'} color={this.state.view === 'Today' ? 'accent' : 'default'} onClick={weatherActions.updateView.bind(this, 'Today')}>2 Days</Button>
          <Button key='weekly-button' ref='weekly-button' variant={'Raised'} color={this.state.view === 'Weekly' ? 'accent' : 'default'} onClick={weatherActions.updateView.bind(this, 'Weekly')}>Weekly</Button>
        </div>
        <div className='weather__view-container'>
          <div key={'today'} ref={'today'} className={'weather__view flex flex-row justify-between'} style={{display: displayToday}}>
            {
                hourly.map((data, index) => {
                  return(<WeatherCard key={'today-' + data.time} ref={'today' + index} timeArray={hourly} data={data} index={index} view={'Today'}/>)
                })
            }
          </div>
          <div key='weekly' ref={'weekly'} className={'weather__view flex flex-row justify-between'} style={{display: displayWeekly}}>
            {
                daily.map((data, index) => {
                  return(<WeatherCard key={'weekly-' + index} ref={'weekly' + index} timeArray={daily} data={data} index={index} view={'Weekly'}/>)
                })
            }
          </div>
        </div>
      </div>
    );
  }
}
