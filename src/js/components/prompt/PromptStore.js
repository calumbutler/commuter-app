/*eslint-disable */
//Locals
import {promptActions} from 'js/components/prompt/PromptActions';
import {dispatcher} from 'js/dispatcher';
import {defaultTemperature, defaultTime, defaultPrecipitation} from 'js/config';

class PromptStore {
	constructor () {
    this.init = false
    this.temperatureValues = defaultTemperature; //low, high
    this.preciptationValue = defaultPrecipitation;
    this.times = defaultTime;
		this.bindListeners({
			initialize: promptActions.initialize,
      updateTemperatureValues: promptActions.updateTemperatureValues,
      updatePreciptationValue: promptActions.updatePreciptationValue,
      updateTimes: promptActions.updateTimes
		});
	}

	initialize(){
    this.init = true;
	}
  updateTemperatureValues(newTemperatureValues){
    this.temperatureValues = newTemperatureValues;
  }
  updatePreciptationValue(newPreciptationValue){
    this.preciptationValue = newPreciptationValue
  }
  updateTimes(time){
    this.times[time.index] = time.newTime;
  }
}

export const promptStore = dispatcher.createStore(PromptStore, 'PromptStore');
