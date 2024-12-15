// Get sunrise/set time or find way to set Day Night accurately suntimes package on NPM getSunriseDateTimeUtc?
// Think how to use details to update icon
//find icons to use
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
const dkWindGusts = document.getElementById('dk-gusts');
const ukWindGusts = document.getElementById('uk-gusts');

let dataLength;

async function fetchData(
  displayCurrentTemp,
  displayChanceToRain,
  displayCurrentDetails
) {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=56.4532,52.1534&longitude=9.402,-0.702&current=temperature_2m,is_day,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto',
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
    // Handle your data
    console.log(data);
    displayCurrentTemp(
      data[0].current.temperature_2m,
      data[1].current.temperature_2m
    );
    displayChanceToRain(
      data[0].daily.precipitation_probability_max[0],
      data[1].daily.precipitation_probability_max[0],
      data[0].daily_units.precipitation_probability_max
    );
    displayCurrentDetails(data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle any errors
  }
}

function displayCurrentTemp(dktemp, uktemp) {
  dkCurrentTemp.textContent = `Current Temp: ${dktemp}`;
  ukCurrentTemp.textContent = `Current Temp: ${uktemp}`;
}

function displayChanceToRain(dkRChance, ukRChance, unit) {
  dkChanceToRain.textContent = `Chance to rain: ${dkRChance}${unit}`;
  ukChanceToRain.textContent = `Chance to rain: ${ukRChance}${unit}`;
}

function displayCurrentDetails(countries) {
  let precipitation = [];
  for (let country of countries) {
    let csrw = [];
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
    precipitation.push(countryDetails);
  }
  console.log(precipitation);
  dkCloud.textContent = `Cloud Cover: ${precipitation[0][0]}`;
  ukCloud.textContent = `Cloud Cover: ${precipitation[1][0]}`;
  dkSun.textContent = `Sunshine Strength: ${precipitation[0][1]}`;
  ukSun.textContent = `Sunshine Strength: ${precipitation[1][1]}`;
  dkRain.textContent = `Rain Strength: ${precipitation[0][2]}`;
  ukRain.textContent = `Rain Strength: ${precipitation[1][2]}`;
  dkShowers.textContent = `Rain Showers: ${precipitation[0][3]}`;
  ukShowers.textContent = `Rain Showers: ${precipitation[1][3]}`;
  dkSnow.textContent = `Snow Strength: ${precipitation[0][4]}`;
  ukSnow.textContent = `Snow Strength: ${precipitation[1][4]}`;
  dkWindSpeed.textContent = `Wind Speed: ${precipitation[0][5]}`;
  ukWindSpeed.textContent = `Wind Speed: ${precipitation[1][5]}`;
  dkWindGusts.textContent = `Wind Gusts: ${precipitation[0][6]}`;
  ukWindGusts.textContent = `Wind Gusts: ${precipitation[1][6]}`;
}

fetchData(
  displayCurrentTemp,
  displayChanceToRain,
  displayCurrentDetails
);
