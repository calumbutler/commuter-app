import {dispatcher} from 'js/dispatcher';

class WeatherActions {


	initialize(darkSkyData){
		return darkSkyData
	}
	darkSkyData(darkSkyData){
		return darkSkyData;
	}
  updateView(view){
    return view
  }
  updateTimes(index, newTime){
    let time = {index: index, newTime}
    return time
  }

}
export const weatherActions = dispatcher.createActions(WeatherActions);
