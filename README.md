# node-caniusejs

A node library to check current enabled APIs of a platform.

### Installing
    npm install caniusejs

### Usage

```js
var caniusejs = require('caniusejs'),
    result;

result = caniusejs.getIgnoreString();

//return BOM: ['document', 'navigator', 'history', 'location', 'screen', ...]

result = caniusejs.getCheckedSpecs();

//return supported specs: ['wac', 'phonegap', 'html5', ...]

result = caniusejs.getCheckedPlatforms();

//return supported specs: ['android', 'ios', 'bb', 'wp', ...]

result = caniusejs.getCheckedTypes();

// apiType result:
// first-level : the first sub-objects of window, eg: 'document', 'navigator', 'history', 'window.history'...
// second-level : the second sub-objects or properties of window, eg: 'navigator.getUserMedia(...)', 'deviceapis.pim', 'window.deviceapis.pim'...
// third-level : the third sub-objects or properties of window, eg: 'deviceapis.filesystem.resolve(...)', 'window.deviceapis.camera.getCameras(...)'...
// direct-property : the direct properties of window, eg: 'alert(...)', 'window.openDatabase(...)', 'screenX', 'window.screenX'...
// dynamic-object : dynamic applicate objects, eg: 'new FileReader', 'new Media(...)'...


result = caniusejs.getCheckedApis();

//return all the APIs as apiType.

result = caniusejs.checkIsSupported(...);

//check the input API is supported by the platform or not.
//status result:
// n : NOT supported
// y : IS supported
// quirks string : the API supported mostly, but there still some quirks in using. Return the quirks.

result = caniusejs.checkIsSupported('openDatabase', 'phonegap', 'direct-property', 'webos');
console.log(result);

### Usage

