const dkCurrentTemp = document.getElementById('dk-ct');
const ukCurrentTemp = document.getElementById('uk-ct');
const dkChanceToRain = document.getElementById('dk-rain-chance');
const ukChanceToRain = document.getElementById('uk-rain-chance');
const dkCloud = document.getElementById('dk-cloud');
const ukCloud = document.getElementById('uk-cloud');
const dkSun = document.getElementById('dk-sun');
const ukSun = document.getElementById('uk-sun');
const dkRain = document.getElementById('dk-rain');
const ukRain = document.getElementById('uk-rain');
const dkShowers = document.getElementById('dk-showers');
const ukShowers = document.getElementById('uk-showers');
const dkSnow = document.getElementById('dk-snow');
const ukSnow = document.getElementById('uk-snow');
const dkWindSpeed = document.getElementById('dk-wind-speed');
const ukWindSpeed = document.getElementById('uk-wind-speed');
const dkWeatherIcon = document.getElementById('dk-weather-icon');
const ukWeatherIcon = document.getElementById('uk-weather-icon');

function displayCurrentTemp(dktemp, uktemp) {
  dkCurrentTemp.textContent = `Current Temp: ${dktemp}`;
  ukCurrentTemp.textContent = `Current Temp: ${uktemp}`;
}

function displayChanceToRain(dkRChance, ukRChance, unit) {
  dkChanceToRain.textContent = `Chance to rain: ${dkRChance}${unit}`;
  ukChanceToRain.textContent = `Chance to rain: ${ukRChance}${unit}`;
}

function displayCurrentDetails(countries) {
  let groundConditions = [];
  for (let country of countries) {
    // [country:[[0] = cloud, [1] = sun, [2] = rain, [3] = showers, [4] = snowfall, [5] = windspeed, [6] = windgusts]]
    let countryDetails = [
      country.current.cloud_cover,
      100 - country.current.cloud_cover,
      country.current.rain,
      country.current.showers,
      country.current.snowfall,
      country.current.wind_speed_10m,
      country.current.wind_gusts_10m,
    ];
    groundConditions.push(countryDetails);
  }

  dkWeatherIcon.src = weatherIconCondition(countries[0]);
  ukWeatherIcon.src = weatherIconCondition(countries[1]);
  dkCloud.textContent = `Cloud Cover: ${groundConditions[0][0]}`;
  ukCloud.textContent = `Cloud Cover: ${groundConditions[1][0]}`;
  dkSun.textContent = `Sunshine Strength: ${groundConditions[0][1]}`;
  ukSun.textContent = `Sunshine Strength: ${groundConditions[1][1]}`;
  dkRain.textContent = `Rain Strength: ${groundConditions[0][2]}`;
  ukRain.textContent = `Rain Strength: ${groundConditions[1][2]}`;
  dkShowers.textContent = `Rain Showers: ${groundConditions[0][3]}`;
  ukShowers.textContent = `Rain Showers: ${groundConditions[1][3]}`;
  dkSnow.textContent = `Snow Strength: ${groundConditions[0][4]}`;
  ukSnow.textContent = `Snow Strength: ${groundConditions[1][4]}`;
  dkWindSpeed.textContent = `Wind Speed: ${groundConditions[0][5]}`;
  ukWindSpeed.textContent = `Wind Speed: ${groundConditions[1][5]}`;
}

function weatherIconCondition(country) {
  const isRaining = country.current.rain > 0;
  const isSnowing = country.current.snowfall > 0;
  const isLightRain = country.current.rain < 2.5;
  const isModerateRain = country.current.rain < 7.6;
  const isHeavyRain = country.current.rain < 51;
  const isLightSnow = country.current.snowfall < 1;
  const isModerateSnow = country.current.snowfall < 2.6;
  const isHeavySnow = country.current.snowfall > 2.6;
  const isLightCloud = country.current.cloud_cover < 12.5;
  const isModerateCloud = country.current.cloud_cover < 50;
  const isNotFullCloud = country.current.cloud_cover < 100;
  const isDay = country.current.is_day;
  let imageName = `Images/Animated/`;

  //If it's not raining or snowing use the cloud only images:
  if (!isRaining && !isSnowing) {
    if (
      country.current.cloud_cover < 1 &&
      country.current.cloud_cover < 1
    ) {
      return isDay ? `${imageName}day.svg` : `${imageName}night.svg`;
    } else if (isLightCloud) {
      return isDay
        ? `${imageName}cloudy-day-1.svg`
        : `${imageName}cloudy-night-1.svg`;
    } else if (isModerateCloud) {
      return isDay
        ? `${imageName}cloudy-day-2.svg`
        : `${imageName}cloudy-night-2.svg`;
    } else if (isNotFullCloud) {
      return isDay
        ? `${imageName}cloudy-day-3.svg`
        : `${imageName}cloudy-night-3.svg`;
    } else {
      return `${imageName}cloudy.svg`;
    }
    // IF WE HAVE SOME FORM OF PRECIPITATION:
  } else {
    //Edge cases. If lightning likely: Need to understand why we have 288 data points before adding this option.Would show thunder.svg. Check for hail too (rainy-7)...otherwise:
    // If we have light cloud in the daytime, use the less cloud icons.
    if (isLightCloud && isDay) {
      return isSnowing
        ? `${imageName}snowy-1.svg`
        : `${imageName}rainy-1.svg`;
      // As long as cloud cover isn't total we have to consider day time.
    } else if (
      (isRaining && isLightRain) ||
      (isSnowing && isLightSnow)
    ) {
      if (isDay && isNotFullCloud) {
        // Snow or rain?
        return isSnowing
          ? `${imageName}snowy-2.svg`
          : `${imageName}rainy-2.svg`;
      } else {
        return isSnowing
          ? `${imageName}snowy-4.svg`
          : `${imageName}rainy-4.svg`;
      }
    } else if (
      (isRaining && isModerateRain) ||
      (isSnowing && isModerateSnow)
    ) {
      if (isDay && isNotFullCloud) {
        return isSnowing
          ? `${imageName}snowy-3.svg`
          : `${imageName}rainy-3.svg`;
      } else {
        return isSnowing
          ? `${imageName}snowy-5.svg`
          : `${imageName}rainy-5.svg`;
      }
      //Only one heavy option, probably basically full cloud cover anyway.
    } else if (
      (isRaining && isHeavyRain) ||
      (isSnowing && isHeavySnow)
    ) {
      return isSnowing
        ? `${imageName}snowy-6.svg`
        : `${imageName}rainy-6.svg`;
    }
  }
}

async function fetchData(
  displayCurrentTemp,
  displayChanceToRain,
  displayCurrentDetails
) {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=56.4532,52.1534&longitude=9.402,-0.702&current=temperature_2m,apparent_temperature,is_day,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&minutely_15=lightning_potential&daily=precipitation_probability_max&timezone=Europe%2FLondon',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length >= 2) {
      const denmark = data[0];
      const britain = data[1];
  
      // Handle data
      displayCurrentTemp(
        denmark.current.temperature_2m,
        britain.current.temperature_2m
      );
      displayChanceToRain(
        denmark.daily.precipitation_probability_max[0],
        britain.daily.precipitation_probability_max[0],
        denmark.daily_units.precipitation_probability_max
      );
      displayCurrentDetails(data);
      console.log(data);
      return data;
    } else {
      console.error(
        'Data is not an array or does not have enough records.'
      );
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle any errors
  }
}

fetchData(
  displayCurrentTemp,
  displayChanceToRain,
  displayCurrentDetails
);

// rain:
// light <2.5  moderate <7.6  heavy <=50 violent >50

//snow:
// light: <1cm moderate < 2.6 else heavy

//cloudcover:
//1okta <12.5 4oktas <50 7oktas <100 total-cover: 100
