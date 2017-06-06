import {dispatcher} from 'js/dispatcher';

class PromptActions {

	initialize(){
		return;
	}

  updateTemperatureValues(newTemperatureValues){
    return newTemperatureValues;
  }
  updatePerciptationValue(newPerciptationValue){
    return newPerciptationValue
  }
  updateTimes(index, newTime){
    let time = {index: index, newTime}
    return time
  }

}
export const promptActions = dispatcher.createActions(PromptActions);
