const dkCurrentTemp = document.getElementById('dk-ct');
const ukCurrentTemp = document.getElementById('uk-ct');

async function fetchData(displayCurrentTemp) {
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
    // Handle your datadisplay(data[0].current.temperature_2m);
    displayCurrentTemp(
      data[0].current.temperature_2m,
      data[1].current.temperature_2m
    );
    console.log(data);
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

// function getCurrentCloudCover(clouds) {
//   dkCurren;
// }

fetchData(displayCurrentTemp);
