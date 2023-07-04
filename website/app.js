
/* Global Variables */
const apiKey = 'bd4b11692b741db4494630360479251a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document
  .getElementById("generate")
  .addEventListener("click", generateBtnHandler);

function generateBtnHandler() {
  const country = document.getElementById("country").value;
  const zip = document.getElementById("zip").value;

  getWeatherByZibCode(apiUrl, zip, country, apiKey);
}
const getWeatherByZipCode = async (apiUrl, zipCode, countryCode, apiKey) => {
  const res = await fetch(`${apiUrl}${zipCode},${countryCode}&appid=${apiKey}`);

  try {
    const data = await res.json();
    data.date = new Date(); // Assuming newDate is a typo and should be new Date()
    data.feelings = document.getElementById("feelings").value;

    const temperature = data.main.temp; // Extract the temperature from the API response

    UpdateData(data, temperature);
  } catch (error) {
    console.log(error);
  }
};

const UpdateData = async (data, temperature) => {
  const res = await fetch("/weather/save", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async () => {
    const res = await fetch("/weather");
    try {
      const weatherData = await res.json();
      console.log(weatherData);
      document.getElementById("date").innerHTML = weatherData.date;
      document.getElementById("temp").innerHTML = temperature; // Display the temperature
      document.getElementById("content").innerHTML = weatherData.feelings;
    } catch (error) {
      console.log(error);
    }
  });
};
