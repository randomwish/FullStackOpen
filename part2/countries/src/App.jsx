import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY
//hack way

const OutputPage = (props) => {
  const { setInputText, inputText, filteredData } = props;
  const [countryTemp, setCountryTemp] = useState(0)
  const [countryWindSpeed, setCountryWindSpeed] = useState(0)
  const [weatherIcon, setWeatherIcon] = useState("")
  const showCountry = (countryName) => {
    setInputText(countryName);
  };

  if (inputText.length == 0 || inputText == null) {
    return <p>Type in something!</p>;
  } else {
    if (filteredData.length >= 10) {
      return <p>Too many entries! Try to be more specific.</p>;
    } else if (filteredData.length > 1) {
      return (
        <ul>
          {filteredData.map((country) => (
            <>
              <p key={country.cca2}>{country.name.common}</p>
              <button
                onClick={() => showCountry(country.name.common.toLowerCase())}
              >
                show
              </button>
            </>
          ))}
        </ul>
      );
    } else if (filteredData.length == 0) {
      return <p>No entries found!</p>;
    } else {
      const targetCountry = filteredData[0];
      const languagesOfCountry = targetCountry.languages;
      const languages = [];
      for (let x in languagesOfCountry) {
        console.log(x);
        languages.push(targetCountry.languages[x]);
      }
      const countryLat = targetCountry.latlng[0]
      const countryLong = targetCountry.latlng[1]

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryLat}&units=metric&lon=${countryLong}&appid=${api_key}`)
          .then((response) =>  {
             console.log(response)
              setCountryTemp(response.data.main.temp)
              setCountryWindSpeed(response.data.wind.speed)
              setWeatherIcon(response.data.weather[0].icon)
              console.log(response.data.weather[0].icon)
          })
          .catch((err) => {
            console.log(err)
          })
      return (
        <>
          <h1>{targetCountry.name.common}</h1>

          <p>capital: {targetCountry.capital}</p>

          <p>area: {targetCountry.area}</p>

          <p>languages:</p>
          <ul>
            {" "}
            {languages.map((language) => (
              <li>{language}</li>
            ))}
          </ul>

          <img src={targetCountry.flags.svg} alt={targetCountry.flags.alt}
          width = "350" height="200"></img>

          <h2>Weather in {targetCountry.capital}</h2>
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}></img>
          <p>Temperature is {countryTemp} celcius</p>
          <p>Wind Speed is {countryWindSpeed} m/s</p>
        </>
      );
    }
  }
};

function App() {
  const [inputText, setInputText] = useState("");
  const [retrievedData, setRetrievedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const handleInputChange = (event) => {
    event.preventDefault();
    setInputText(event.target.value);
  };

  useEffect(() => {
    console.log("fetching relevant countries...");
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then((response) => {
        console.log(response);
        setRetrievedData(response.data);
      });
  }, []);
  useEffect(() => {
    setFilteredData(
      retrievedData.filter((country) =>
        country.name.common.toLowerCase().includes(inputText)
      )
    );
    console.log(
      retrievedData.filter((country) =>
        country.name.common.toLowerCase().includes(inputText)
      )
    );
  }, [inputText]);

  return (
    <>
      <p>
        find countries <input value={inputText} onChange={handleInputChange} />
      </p>
      <OutputPage
        filteredData={filteredData}
        setInputText={setInputText}
        inputText={inputText}
      />
    </>
  );
}

export default App;
