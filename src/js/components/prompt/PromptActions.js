import {dispatcher} from 'js/dispatcher';

class PromptActions {

	initialize(){
		return;
	}

  updateTemperatureValues(newTemperatureValues){
    return newTemperatureValues;
  }
  updatePreciptationValue(newPreciptationValue){
    return newPreciptationValue
  }
  updateTimes(index, newTime){
    let time = {index: index, newTime}
    return time
  }

}
export const promptActions = dispatcher.createActions(PromptActions);
