$("#submit").click(function () {
    let city = $("#city").val();
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=5d066958a60d315387d9492393935c19",
        context: document.body,
        success: function (result) {
            $(this).addClass("done");
            let weather = new Weather(
                result.name,
                Math.round(result.main.temp),
                result.main.pressure,
                result.main.humidity,
                result.wind.speed,
                result.wind.deg,
                result.weather,

                ".weather-result"

            )

            weather.render();
            console.log(result)
        }
    });

})


class Weather {
    constructor(city, temp, pressure, humidity, speed, deg, icon, parent) {
        this.city = city;
        this.temp = temp;
        this.pressure = pressure;
        this.humidity = humidity;
        this.speed = speed;
        this.deg = deg;
        this.icon = icon;

        this.parent = document.querySelector(parent);
    }
    render() {
        let weather = document.createElement("weather");
        weather.classList.add("weather-container");
        weather.innerHTML = `<div class="city">${this.city}</div>`;
        for(let i=0; i<this.icon.length; i++){ 
            weather.innerHTML += `<div class="weather-icon"> <img src="https://openweathermap.org/img/w/${this.icon[i].icon}.png"></div>`;
            weather.innerHTML += `<div class="temperature-description">
                <p>${this.icon[i].description}</p>
            </div>`;
        } 
        weather.innerHTML += `<div class="temperature-value">
            <p>${this.temp}&deg;C</p>
        </div>
        <div class="speed">${this.speed}km/h</div>
        <div class="deg">${this.deg}</div>
        <div class="pressure">${this.pressure}hPa</div>`;
        
        console.log(this.parent)
        console.log(weather)
        $(this.parent).html(weather)
    }

}