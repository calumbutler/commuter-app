/*eslint-disable */
import {weatherActions} from 'js/components/weather/WeatherActions';
import {dispatcher} from 'js/dispatcher';

class WeatherStore {
	constructor () {
    this.init = false
    this.darkSkyData = {};
    this.view = 'Today';
    this.times = [8, 17];
		this.bindListeners({
			initialize: weatherActions.initialize,
      updateDarkSkyData: weatherActions.darkSkyData,
      updateView: weatherActions.updateView,
      updateTimes: weatherActions.updateTimes
		});
	}

	initialize(darkSkyData){
    this.init = true;
    this.darkSkyData = darkSkyData;
	}

  updateDarkSkyData(darkSkyData){
    this.darkSkyData = darkSkyData;
  }

  updateView(view){
    this.view = view;
  }

  updateTimes(time){
    this.times[time.index] = time.newTime;
  }
}

export const weatherStore = dispatcher.createStore(WeatherStore, 'WeatherStore');
