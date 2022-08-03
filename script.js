const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const defcity = document.querySelector('.defcity')

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=13fca1e85e5b1412df447ba08bf4c3fb";
const API_UNISTS = "&units=metric";

let dc = localStorage.getItem("city")

const getWeather = () => {
	const city = input.value || dc
	console.log(dc)
	const URL = API_LINK + city + API_KEY + API_UNISTS;

	fetch(URL)
		.then(response => response.json())
		.then(data => {
			const temp = data.main.temp;
			const hum = data.main.humidity;
			const status = Object.assign({}, ...data.weather);

			input.value = ''
			warning.textContent = "";

			if (status.id >= 200 && status.id <= 232) {
				photo.setAttribute("src", "./img/thunderstorm.png");
			} else if (status.id >= 300 && status.id <= 321) {
				photo.setAttribute("src", "./img/drizzle.png");
			} else if (status.id >= 500 && status.id <= 531) {
				photo.setAttribute("src", "./img/rain.svg");
			} else if (status.id >= 600 && status.id <= 622) {
				photo.setAttribute("src", "./img/ice.svg");
			} else if (status.id >= 701 && status.id <= 781) {
				photo.setAttribute("src", "./img/fog.png");
			} else if ((status.id = 800)) {
				photo.setAttribute("src", "./img/sun.svg");
			} else if (status.id >= 801 && status.id <= 803) {
				photo.setAttribute("src", "./img/cloud.svg");
			}

			cityName.textContent = data.name;
			temperature.textContent = Math.floor(temp) + "℃";
			humidity.textContent = hum + "%";
			weather.textContent = status.main;
		})
		.catch(() => {
			warning.textContent = "Wpisz poprwaną nazwę miasta!";
		});
}
const enterKayCheck = e => {
	if (e.key === "Enter") {
		getWeather();
	}
};

getWeather();
input.addEventListener("keyup", enterKayCheck);
button.addEventListener("click", getWeather);

defcity.addEventListener('click', () => {
	let city = input.value
	localStorage.setItem('city', city)
})