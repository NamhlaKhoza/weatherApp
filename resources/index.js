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

            function displayWeather(response) {
                let currentCity = document.querySelector("#city");
                let current = response.data.name;
                currentCity.innerHTML = `${current}`;

                let newTemp = document.querySelector("#temp-one");
                let temperature = Math.round(response.data.main.temp);
                newTemp.innerHTML = `${temperature}`;

                let descrip = document.querySelector("#condition");
                let condition = response.data.weather[0].description;
                descrip.innerHTML = `${condition}`;

                let humid = document.querySelector("#humidity");
                let hum = response.data.main.humidity;
                humid.innerHTML = `${hum}%`;

                let windSpeed = document.querySelector("#wind");
                let wind = Math.round(response.data.wind.speed);
                windSpeed.innerHTML = `${wind} KMPH`;

                let feelsLike = document.querySelector("#feels");
                let feeling = Math.round(response.data.main.feels_like);
                feelsLike.innerHTML = `${feeling}°C`;
            }

            function searchCity(city) {
                let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
                axios.get(apiUrl).then(displayWeather);
            }

            function searchCity_event(event) {
                event.preventDefault();
                let city = document.querySelector("#search-city").value;
                let newCity = document.querySelector("#city");
                newCity.innerHTML = `${city}`;
                searchCity(city);
            }

            function searchPosition(position) {
                let apiKey = "2ff29bed3181c3526c35cc5408037f85";
                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

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

            searchCity("Pretoria");