function fixDate(date) {
                let hours = date.getHours();
                if (hours < 10) {
                    hours = `0${hours}`;
                }
                let minutes = date.getMinutes();
                if (minutes < 10) {
                    minutes = `0${minutes}`;
                }

                let dayIndex = date.getDay();
                let days = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ];
                let day = days[dayIndex];

    return `${day} ${hours}:${minutes}`;
  }
    
            function showForecast(response) {
                console.log(response);
                let forecastTest = response.data.daily;
                let forecastElement = document.querySelector("#forecast");
                forecastElement.innerHTML = `${forecastTest}`;
                console.log(forecastTest);
            }

            
             
function getForecast(coordinates) {
                let apiKey = "460o1d9aabc77058c9eaa29tf43930e4";
                let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`
    axios.get(apiUrl).then(showForecast);
    
            }             
        
                

            function displayWeather(response) {
                
                let currentCity = document.querySelector("#city");
                let current = response.data.city;
                currentCity.innerHTML = `${current}`;

                let newTemp = document.querySelector("#temp-one");
                let temp = Math.round(response.data.temperature.current);
                newTemp.innerHTML = `${temp}`;

                let descrip = document.querySelector("#condition");
                let conditions = response.data.condition.description;
                descrip.innerHTML = `${conditions}`;

                let humid = document.querySelector("#humidity");
                let hum = response.data.temperature.humidity;
                humid.innerHTML = `${hum}%`;

                let windSpeed = document.querySelector("#wind");
                let winds = Math.round(response.data.wind.speed);
                windSpeed.innerHTML = `${winds} KMPH`;

                let feelsLike = document.querySelector("#feels");
                let feeling = Math.round(response.data.temperature.feels_like);
                feelsLike.innerHTML = `${feeling}°C`;

                let emojie = document.querySelector("#emo");                
                emojie.setAttribute("src", `${response.data.condition.icon_url}`);
                
                
                getForecast(response.data.coordinates);

            }             
           

            

            function searchCity(city) {
                let apiKey = "460o1d9aabc77058c9eaa29tf43930e4";
                let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
                axios.get(apiUrl).then(displayWeather);
            }

            function searchCity_event(event) {
                event.preventDefault();
                let city = document.querySelector("#search-city").value;
                let newCity = document.querySelector("#city");
                newCity.innerHTML = `${city}`;
                searchCity(city);
            }
            
            function displayFahrenheitTemperature(event) {
                event.preventDefault();
                let temperatureElement = document.querySelector("#temp-one");

                celsius.classList.remove("active");
                fahrenheit.classList.add("active");
                let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
                temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
            }
            
            function displayCelsiusTemperature(event) {
                event.preventDefault();
                celsius.classList.add("active");
                fahrenheit.classList.remove("active");
                let temperatureElement = document.querySelector("#temp-one");
                temperatureElement.innerHTML = Math.round(celsiusTemperature);
            }

             let celsiusTemperature = null;


            function searchPosition(position) {
                let apiKey = "460o1d9aabc77058c9eaa29tf43930e4";
                let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`
                axios.get(apiUrl).then(displayWeather);
            }

            function getCurrentLocation(event) {
                event.preventDefault();
                navigator.geolocation.getCurrentPosition(searchPosition);
            }



            let dateElement = document.querySelector("#current-date");
            let currentTime = new Date();
            dateElement.innerHTML = fixDate(currentTime);

            let Form2 = document.querySelector("#form1");
            Form2.addEventListener("submit", searchCity_event);
            let currentLocation = document.querySelector("#current-location");
            currentLocation.addEventListener("click", getCurrentLocation);
            

             let fahrenheit = document.querySelector("#fahrenheit-link");
             fahrenheit.addEventListener("click", displayFahrenheitTemperature);

             let celsius = document.querySelector("#celsius-link");
             celsius.addEventListener("click", displayCelsiusTemperature);            
  

//searchCity(Pretoria);

//showForecast();