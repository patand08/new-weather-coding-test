const dateBuilder = (unixTimestamp) => {
  var date = new Date(unixTimestamp * 1000);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

const weatherDecoder = (num) => {
  var res = "error";
  if (200 <= num && 250 >= num) {
    res = "thunder";
  } else if (300 <= num && 350 >= num) {
    res = "wind";
  } else if (500 <= num && 550 >= num) {
    res = "rain";
  } else if (600 <= num && 650 >= num) {
    res = "snow";
  } else if ((803 <= num && 804 >= num) || (700 <= num && 799 >= num)) {
    res = "cloud";
  } else if (800 <= num && 802 >= num) {
    res = "sun";
  }
  return res;
};

export const forecastHandler = (data, today, city) => {
  var forecast = {
    name: null,
    reports: null,
  };
  forecast.name = city;

  var day1 = {
    date: dateBuilder(today.dt),
    humid: today.main.humidity,
    avgTemp: today.main.temp,
    minTemp: today.main.temp_min,
    maxTemp: today.main.temp_max,
    img: weatherDecoder(today.weather[0].id),
  };

  var day2 = {
    date: dateBuilder(data.list[5].dt),
    humid: data.list[4].main.humidity,
    morTemp: data.list[3].main.temp,
    eveTemp: data.list[5].main.temp,
    nitTemp: data.list[7].main.temp,
    img: weatherDecoder(data.list[5].weather[0].id),
  };

  var day3 = {
    date: dateBuilder(data.list[13].dt),
    humid: data.list[14].main.humidity,
    morTemp: data.list[12].main.temp,
    eveTemp: data.list[14].main.temp,
    nitTemp: data.list[17].main.temp,
    img: weatherDecoder(data.list[13].weather[0].id),
  };

  var day4 = {
    date: dateBuilder(data.list[21].dt),
    humid: data.list[22].main.humidity,
    morTemp: data.list[20].main.temp,
    eveTemp: data.list[22].main.temp,
    nitTemp: data.list[25].main.temp,
    img: weatherDecoder(data.list[21].weather[0].id),
  };

  var day5 = {
    date: dateBuilder(data.list[29].dt),
    humid: data.list[30].main.humidity,
    morTemp: data.list[28].main.temp,
    eveTemp: data.list[30].main.temp,
    nitTemp: data.list[33].main.temp,
    img: weatherDecoder(data.list[29].weather[0].id),
  };

  var daysRest = [day2, day3, day4, day5];

  var days = [day1, daysRest];

  forecast.reports = days;

  return forecast;
};
