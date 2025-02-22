# $${\color{#e8a71a}One Day}$$ $${\color{#2d7cad}Weather App}$$

![image](https://github.com/user-attachments/assets/dcc5bc55-65fc-44f6-b501-30367baee2cb)


## Contents
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Process](#the-process)
* [Built With](#built-with)
* [What I learnt](#what-i-learnt)
* [Continued development](#continued-development)

## Overview
Taking data from a weather API and using it to compare weather in two points in Europe.\
Creating a simple weather app that will compare two locations.
Keeping the information simple and clear.

## Screenshots
![](weatherVid.gif)
![image](https://github.com/user-attachments/assets/0cc75957-1340-492a-8212-5790004f793a)

## The Process
I found the brilliant [open-meteo API](https://open-meteo.com ) and looked through the documentation. I initially pulled lots of information, as I wasn't certain what I would ultimately end up using. The site is brilliant because it automates query parameters for you based on your selections. It was much less complicated than the API I had used previously.
Once I had the information available I started by checking I could access the data and showing a few details in the browser. With each revisit I wittled down the information I wanted, realising that what was needed when showing two areas was only the really relevant data. There was an option to pull weather code which would have worked really well for me if I had spotted it initially, making setting up the weathericons easier. I'm pleased I didn't though as I enjoyed the challenge of the substantial if else block that controls which icon to show.

When I first looked at using icons I didn't intend for them to be animated. When I found the animated icons I ultimately used, it helped streamline the project as they conveyed weather conditions so clearly and draw the eye.

Finally I  tried to make the browser look clean and clear, without being dull and to be responsive. I decided to have the background of each place change colour with the weather in a simple way to make it easy to tell conditions at a glance and to make the app look a little more varied and interesting. I added opacity to these colourful backdrops however as they were detrimental to the overall look when they were too strong.

### Built with
JS - HTML - CSS

### What I learnt
- This project solidified the knowledge I had from School of Code classes. It was fantastic practice to continually go back to the API and update my fetch URL.
- Refractoring functions to their simplest forms was useful for keeping the main async function clear and focusing on how the whole was working.
- Keeping variable names clear with so much information to handle.
- A chance to recall what I have learnt so far about DOM manipulation.
- Planning how the project would look was really enjoyable for this app: playing around with a new way of importing fonts from google fonts for example and working to keep it clear but not boring.
- I also looked a little into transform: rotate in order to make the wind direction arrows functional:

  ![windDisplay](https://github.com/user-attachments/assets/a866041a-1185-4ad2-a303-da0bd01ead2f)

### Continued development
Returning to this project in the future I will add an overview of the week ahead and more importantly allow the user to pick which two places to compare, as well as making a mobile friendly version.
Now I have some experience with next.js/React it seems logical to transition this project over before expanding it.

### Useful resources
Open-meteo API: https://open-meteo.com/en/docs/

Source of weather icons: https://www.amcharts.com/free-animated-svg-weather-icons/

Background Image by Yuriy Kovalev at Unsplash.com: https://unsplash.com/photos/mountain-covering-with-clouds-nN1HSDtKdlw
