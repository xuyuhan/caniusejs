var fs = require('fs'),
    source = null;

var apiType = {
    'first-level': 'first-level',
    'second-level': 'second-level',
    'third-level':  'third-level',
    'direct-property': 'direct-property',
    'dynamic-object': 'dynamic-object'
};

var status = {
    'no': 'n', // NOT supported
    'quirk': 'q', // mostly supported, but there still some quirks in using.
    'yes': 'y' // supported
};

var ignoreString = ['document', 'navigator', 'history', 'location', 'screen'];

function checkIsSupported(keyword, spec, type, platform) {
    checkParser();

    //console.log('keyword: ' + keyword + ' spec: ' + spec + ' type: ' + ' platform: ' + platform);
    keyword = keyword || '';
    var key = keyword.split('.'), len = key.length, api;

    len = len > 4 ? 4 : len;

    if (!source.data[spec]
        || !source.data[spec][type]
        || !source.data[spec][type][key[len-1]]
        || !source.data[spec][type][key[len-1]].stats[platform]) {
            return status.no;
    }

    if (len == 4) {
        if ((key[0] != 'window') || (ignoreString.indexOf(key[1]) == -1)
            || !source.data[spec]['third-level'][key[3]].parent
            || key[2] !== source.data[spec]['third-level'][key[3]].parent
            || key[1] !== source.data[spec]['second-level'][key[2]].parent) {
                return status.no;
        }
    } else if (len == 3) {
        if (key[0] != 'window') {
            if (!source.data[spec]['third-level'][key[2]].parent
                || key[1] !== source.data[spec]['third-level'][key[2]].parent
                || (ignoreString.indexOf(key[1]) == -1 && key[0] !== source.data[spec]['second-level'][key[1]].parent)) {
                return status.no;
            }
        } else {
            if (ignoreString.indexOf(key[1]) == -1) {
                if (!source.data[spec]['second-level'][key[2]].parent
                    || key[1] !== source.data[spec]['second-level'][key[2]].parent
                    || key[0] !== source.data[spec]['first-level'][key[1]].parent) {
                    return status.no;
                }
            }
        }
    } else if (len == 2 && type === 'second-level') {
        if (!source.data[spec]['second-level'][key[1]].parent
            || key[0] !== source.data[spec]['second-level'][key[1]].parent) {
                return status.no;
        }
    }

    api = source.data[spec][type][key[len-1]];

    if (status.yes === api.stats[platform]) {
        return status.yes;
    } else if (status.no === api.stats[platform]) {
        return status.no;
    } else {
        return api.quirks[platform];
    }
}

function getCheckedApis() {
    var apis = {};

    checkParser();

    for (var spec in source.data) {
        apis[spec] = {};

        apis[spec]['first-level'] = [];
        apis[spec]['second-level'] = [];
        apis[spec]['third-level'] = [];
        apis[spec]['direct-property'] =  [];
        apis[spec]['dynamic-object'] = [];

        if (source.data[spec]['first-level']) {
            for (var key in source.data[spec]['first-level']) {
                apis[spec]['first-level'].push(key);
            }
        }

        if (source.data[spec]['second-level']) {
            for (var key in source.data[spec]['second-level']) {
                apis[spec]['second-level'].push(key);
            }
        }

        if (source.data[spec]['third-level']) {
            for (var key in source.data[spec]['third-level']) {
                apis[spec]['third-level'].push(key);
            }
        }

        if (source.data[spec]['direct-property']) {
            for (var key in source.data[spec]['direct-property']) {
                apis[spec]['direct-property'].push(key);
            }
        }

        if (source.data[spec]['dynamic-object']) {
            for (var key in source.data[spec]['dynamic-object']) {
                apis[spec]['dynamic-object'].push(key);
            }
        }
    }

    return apis;
}

function getCheckedPlatforms() {
    var platforms = [];

    checkParser();

    for (var key in source.platforms) {
        platforms.push(key);
    }

    return platforms;
}

function getCheckedSpecs() {
    var specs = [];

    checkParser();

    Object.keys(source.specs).forEach(function(spec) {
        Object.keys(source.data).forEach(function(data) {
            if (spec === data && specs.indexOf(spec) < 0) {
                specs.push(spec);
            }
        })
    })

    return specs;
}

function getCheckedTypes() {

    return apiType;
}
function getIgnoreString() {
    return ignoreString;
}

function checkParser() {
    if (!source) {
        try {
            //console.log('source: ' + __dirname + '/../data/data.json');
            source = JSON.parse(fs.readFileSync(__dirname + '/../data/data.json', 'utf-8'));
        } catch (e) {
            throw 'read data error!';
        }
    }
}

if (module && "exports" in module) {
    module.exports = {"getIgnoreString": getIgnoreString,
                      "getCheckedTypes": getCheckedTypes,
                      "getCheckedSpecs": getCheckedSpecs,
                      "getCheckedPlatforms": getCheckedPlatforms,
                      "getCheckedApis": getCheckedApis,
                      "checkIsSupported": checkIsSupported};
}
