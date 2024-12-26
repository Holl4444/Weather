const dkCurrentTemp = document.getElementById('dk-ct');
const ukCurrentTemp = document.getElementById('uk-ct');
const dkFeelsLike = document.getElementById('dk-apparent');
const ukFeelsLike = document.getElementById('uk-apparent');
const dkChanceToRain = document.getElementById('dk-rain-chance');
const ukChanceToRain = document.getElementById('uk-rain-chance');
const dkWindSpeed = document.getElementById('dk-wind-speed');
const ukWindSpeed = document.getElementById('uk-wind-speed');
const dkWindDir = document.getElementById('dk-wind-dir');
const ukWindDir = document.getElementById('uk-wind-dir');
const dkWeatherIcon = document.getElementById('dk-weather-icon');
const ukWeatherIcon = document.getElementById('uk-weather-icon');

function displayCurrentTemp(
  dktemp,
  uktemp,
  feelsLikeDk,
  feelsLikeUk,
  units
) {
  dkCurrentTemp.textContent = `Current Temp: ${dktemp}${units}`;
  ukCurrentTemp.textContent = `Current Temp: ${uktemp}${units}`;
  dkFeelsLike.textContent = `Feels like: ${feelsLikeDk}${units}`;
  ukFeelsLike.textContent = `Feels like: ${feelsLikeUk}${units}`;
}

function displayChanceToRain(dkRChance, ukRChance, unit) {
  dkChanceToRain.textContent = `Chance to rain: ${dkRChance}${unit}`;
  ukChanceToRain.textContent = `Chance to rain: ${ukRChance}${unit}`;
}

function displayWind(
  windSpeed1,
  windSpeed2,
  windDir1,
  windDir2,
  units
) {
  // Wind direction image is rotated 60deg initially.
  dkWindSpeed.textContent = `Wind speed: ${windSpeed1}${units}`;
  ukWindSpeed.textContent = `Wind speed: ${windSpeed2}${units}`;
  dkWindDir.style.transform = `rotate(${windDir1 + 180 - 60}deg)`;
  ukWindDir.style.transform = `rotate(${windDir2 + 180 - 60}deg)`;
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

async function displayIcon(country1, country2) {
  dkWeatherIcon.src = weatherIconCondition(country1);
  ukWeatherIcon.src = weatherIconCondition(country2);
}

async function fetchData(
  displayCurrentTemp,
  displayChanceToRain,
  displayWind,
  displayIcon
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
      displayIcon(denmark, britain);

      displayCurrentTemp(
        denmark.current.temperature_2m,
        britain.current.temperature_2m,
        denmark.current.apparent_temperature,
        britain.current.apparent_temperature,
        denmark.current_units.temperature_2m
      );
      displayChanceToRain(
        denmark.daily.precipitation_probability_max[0],
        britain.daily.precipitation_probability_max[0],
        denmark.daily_units.precipitation_probability_max
      );
      displayWind(
        denmark.current.wind_speed_10m,
        britain.current.wind_speed_10m,
        denmark.current.wind_direction_10m,
        britain.current.wind_direction_10m,
        denmark.current_units.wind_speed_10m
      );
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
  displayWind,
  displayIcon
);

// rain:
// light <2.5  moderate <7.6  heavy <=50 violent >50

//snow:
// light: <1cm moderate < 2.6 else heavy

//cloudcover:
//1okta <12.5 4oktas <50 7oktas <100 total-cover: 100
