import './util.js';
import {blockform} from './form.js';
import {setOnFormSubmit, reset} from './form-validate.js';
import './card.js';
import'./slider.js';
import {showMarkers, mainAdress, mainPinMarker} from './map.js';
import {getData} from './download-data.js';
import {showErrorMessage, showSendSuccessMessage, showSendErrorMessage} from './system-messages.js';
import {getMainData, filterData} from './filter.js';
import {sendData} from './send-data.js';

const onLoadSuccess = (data) => {
  showMarkers(filterData(getMainData(data)));
};

const onLoadError = (error) => {
  blockform();
  showErrorMessage(error);
};

getData(onLoadSuccess, onLoadError);

const onSendDataSuccess = () => {
  const popup = document.querySelector('.leaflet-popup');
  if (popup !== null) {
    popup.remove();
  }
  reset();
  mainPinMarker.setLatLng([35.6895, 139.692]).update();
  mainAdress.value = '35.6895, 139.692';
  showSendSuccessMessage();
};

const onSendDataError = () => {
  showSendErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});
