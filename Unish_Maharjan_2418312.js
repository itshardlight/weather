let weather = {
    apiKey: "b61dc5463d87773078e943894d0d4699",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { pressure } = data.main;
       

        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C"; ///+ this.convertToFahrenheit(temp) + "°F"
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        let timestampOffset = data.timezone;
        const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
        const date = new Date(timestamp * 1000);

        const localDateTime = date.toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC'
        });
        document.querySelector(".dates").innerHTML = localDateTime;


    },
    
    search: function () {
        this.fetchWeather(document.querySelector(".cityInput").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".cityInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {

        weather.search();


    }


});

weather.fetchWeather("Hyderabad");



