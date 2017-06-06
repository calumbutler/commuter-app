/*eslint-disable */
import {promptActions} from 'js/components/prompt/PromptActions';
import {dispatcher} from 'js/dispatcher';
import {defaultTemperature, defaultTime, defaultPrecipitation} from 'js/config';

class PromptStore {
	constructor () {
    this.init = false
    this.temperatureValues = defaultTemperature; //low, high
    this.perciptationValue = 0;
    this.times = defaultTime;
		this.bindListeners({
			initialize: promptActions.initialize,
      updateTemperatureValues: promptActions.updateTemperatureValues,
      updatePerciptationValue: promptActions.updatePerciptationValue,
      updateTimes: promptActions.updateTimes
		});
	}

	initialize(darkSkyData){
    this.init = true;
	}
  updateTemperatureValues(newTemperatureValues){
    this.temperatureValues = newTemperatureValues;
  }
  updatePerciptationValue(newPerciptationValue){
    this.perciptationValue = newPerciptationValue
  }
  updateTimes(time){

    this.times[time.index] = time.newTime;
  }
}

export const promptStore = dispatcher.createStore(PromptStore, 'PromptStore');
