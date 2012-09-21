var caniusejs = require('../lib/caniusejs');

console.log('test started...');

console.log(caniusejs.getIgnoreString());
console.log(caniusejs.getCheckedTypes());
console.log(caniusejs.getCheckedSpecs());
console.log(caniusejs.getCheckedPlatforms());
console.log(caniusejs.getCheckedApis());

var api = caniusejs.checkIsSupported('openDatabase');
console.log(api);
api = caniusejs.checkIsSupported('openDatabase', 'phonegap', 'direct-property', 'bb');
console.log(api);
api = caniusejs.checkIsSupported('openDatabase', 'phonegap', 'direct-property', 'android');
console.log(api);
api = caniusejs.checkIsSupported('window.openDatabase', 'phonegap', 'direct-property', 'android');
console.log(api);
api = caniusejs.checkIsSupported('window.navigator.accelerometer', 'phonegap', 'second-level', 'bada');
console.log(api);
api = caniusejs.checkIsSupported('window.navigator.accelerometer.getCurrentAcceleration', 'phonegap', 'third-level', 'bada');
console.log(api);
api = caniusejs.checkIsSupported('navigator.accelerometer.getCurrentAcceleration', 'phonegap', 'third-level', 'bada');
console.log(api);

console.log('test ended.');