import cloudOneImage from 'images/cloud-1.svg';
import cloudTwoImage from 'images/cloud-2.svg';
import cloudImage from 'images/cloud.svg';
import moonImage from 'images/moon.svg';
import rainOneImage from 'images/rain-1.svg';
import rainTwoImage from 'images/rain-2.svg';
import rainThreeImage from 'images/rain-3.svg';
import rainImage from 'images/rain.svg';
import snowOneImage from 'images/snow-1.svg';
import snowImage from 'images/snow.svg';
import stormImage from 'images/storm.svg';
import sunImage from 'images/sun.svg';


export const initialState = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const text = {
  title: 'Should I bike to work?',
};

export const viewOptions = {
  ui: { components: ['logo', 'attribution'] }
};


//image lookup for cards
export const images = {
    'clear-day': sunImage,
    'clear-night': moonImage,
    'rain': rainImage,
    'snow': snowImage,
    'sleet': snowOneImage,
    'wind': stormImage,
    'fog': snowOneImage,
    'cloudy': sunImage,
    'partly-cloudy-day': cloudTwoImage,
    'partly-cloudy-night': cloudImage
};
// day lookup for date format
export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//months lookup
export const months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let latitude = 38.9072;
let longitude = 77.0369
//defaults for store
export const defaultTemperature = [32, 90];
export const defaultTime = [8, 17];
export const defaultPrecipitation = 0;

export const urls = {
  itemInfo: appid => 'https://1miudhz7a9.execute-api.us-east-1.amazonaws.com/dev/forecast/' + latitude + ',' + longitude
};
