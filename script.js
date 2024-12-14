const dkCurrentTemp = document.getElementById('dk-ct');
const ukCurrentTemp = document.getElementById('uk-ct');
const dkChanceToRain = document.getElementById('dk-rain-chance');
const ukChanceToRain = document.getElementById('uk-rain-chance');

async function fetchData(displayCurrentTemp, displayChanceToRain) {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=56.4532,52.1534&longitude=9.402,-0.702&current=temperature_2m,is_day,precipitation,cloud_cover,wind_speed_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto',
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

// function getCurrentCloudCover(clouds) {
//   dkCurren;
// }

fetchData(displayCurrentTemp, displayChanceToRain);
