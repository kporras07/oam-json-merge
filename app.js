var fs = require('fs');
var worldData = require('./world.json');
var ccFips = require('./cc_fips.json');
var countriesEs = require('./countries_es.json');

var geometries = worldData.objects.world.geometries;
var defaultDestCode = 'ISO3166-1-Alpha-3';
var alpha2 = 'ISO3166-1-Alpha-2';

var convertCountryCode = function (sourceValue, sourceCode, destCode) {
  sourceCode = sourceCode || 'FIPS';
  destCode = destCode || defaultDestCode;
  var countryCodes = {};

  if (sourceCode === 'FIPS' && sourceValue === 'DQ' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to UMI):', 'DQ (Jarvis Island)');
    countryCodes[destCode] = 'UMI';
    countryCodes[alpha2] = 'UM';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'HQ' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to UMI):', 'HQ (Howland Island)');
    countryCodes[destCode] = 'UMI';
    countryCodes[alpha2] = 'UM';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'JQ' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to UMI):', 'JQ (Johnston Atoll)');
    countryCodes[destCode] = 'UMI';
    countryCodes[alpha2] = 'UM';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'MQ' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to UMI):', 'MQ (Midway Islands)');
    countryCodes[destCode] = 'UMI';
    countryCodes[alpha2] = 'UM';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'WQ' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to UMI):', 'WQ (Wake Island)');
    countryCodes[destCode] = 'UMI';
    countryCodes[alpha2] = 'UM';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'GZ' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to PSE):', 'GZ (Gaza Strip)');
    countryCodes[destCode] = 'PSE';
    countryCodes[alpha2] = 'PS';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'WE' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to PSE):', 'WE (West Bank)');
    countryCodes[destCode] = 'PSE';
    countryCodes[alpha2] = 'PS';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'JN' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to SJM):', 'JN (Jan Mayen)');
    countryCodes[destCode] = 'SJM';
    countryCodes[alpha2] = 'SJ';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'SV' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to SJM):', 'SV (Svalbard)');
    countryCodes[destCode] = 'SJM';
    countryCodes[alpha2] = 'SJ';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'JU' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to ATF):', 'JU (Juan De Nova Island)');
    countryCodes[destCode] = 'ATF';
    countryCodes[alpha2] = 'TF';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'MW' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to MNE):', 'MW (Montenegro)');
    countryCodes[destCode] = 'MNE';
    countryCodes[alpha2] = 'ME';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'NT' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to ANT):', 'NT (Netherlands Antilles)');
    countryCodes[destCode] = 'ANT';
    countryCodes[alpha2] = 'AN';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'SR' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to SRB):', 'SR (Serbia)');
    countryCodes[destCode] = 'SRB';
    countryCodes[alpha2] = 'RS';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'TC' && destCode === defaultDestCode) {
    console.log('Debug (Mapped to ARE):', 'TC (United Arab Emirates)');
    countryCodes[destCode] = 'ARE';
    countryCodes[alpha2] = 'AE';
    return countryCodes;
  }
  else if (sourceCode === 'FIPS' && sourceValue === 'PG' && destCode === defaultDestCode) {
    console.log('Debug (No mapped (skipped)):', 'PG (Spratly Islands)');
    return countryCodes;
  }

  for (var index = 0; index < ccFips.length; index++) {
    if (ccFips[index][sourceCode] !== undefined && ccFips[index][sourceCode] === sourceValue) {
        countryCodes[destCode] = ccFips[index][destCode];
        countryCodes[alpha2] = ccFips[index][alpha2];
        return countryCodes;
    }
  }
};

for (var index = 0; index < geometries.length; index++) {
  var geometry = geometries[index];
  var countryCodes = convertCountryCode(geometry.properties.id);
  if (countryCodes === undefined || countryCodes[defaultDestCode] === undefined) {
      geometries.splice(index, 1);
  }
  else {
    geometry.id = countryCodes[defaultDestCode];
    delete geometry.properties.id;
    geometry.properties.name = countriesEs[countryCodes[alpha2]];
  }
}

fs.writeFile('./result/result.json', JSON.stringify(worldData), 'utf-8');
