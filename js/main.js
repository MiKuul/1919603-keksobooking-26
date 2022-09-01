import './util.js';
import './form.js';
import './form-validate.js';
import {generateAds} from './data.js';
import './card.js';
import './slider.js';
import {showMarkers} from './map.js';

const data = generateAds(10); // eslint-disable-line
showMarkers(data);

