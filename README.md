# Coding take home task: OpenWeatherMap

Using OpenWeatherMap API, Next.js, Tailwindcss and Zustand, I made as requested and created a 5 day weather forecast app.

Vercel: https://new-weather-coding-test-849nk0gmx-patrux08.vercel.app/

To used it you must set an environment variable called **API_KEY** with value equal to a OpenWeatherMap API key.

###### **Notes**:

The challenge said:

```
Frontend logic requirements:
1. The page should show 5-day weather forecast for given city including:
a. Morning temperature
b. Day temperature
c. Night temperature
d. Humidity

2. The page should also show following stats relevant to weather forecast:
a. Minimum value
b. Maximum value
c. Mean value
d. Mode value
```

But neither the Weather or Forecast OpenWeatherMap's API would return an object with night and morning temperature. (Maybe it's due to the Free version being different from the documentation) Said so, I improvised using both API, the result is:

**Today's Forecast**

Returns Weather (as image background), minimum, maximum and mean temperatures (as in the Weather API) and Humidity.

**Next 4 days Forecast**

Returns Weather (as image background), Morning, Day and Night _approximately_ temperatures (the Forecast API returns 8 different forecasts for each day, I _approximately_ selected the positions that would represent said time periods. I changes throught the day because de API _may or may not_ retur today's forecast _partialy or not_, what made it not so precise. A better sorting is possible but would take much more time) and Humidity.
