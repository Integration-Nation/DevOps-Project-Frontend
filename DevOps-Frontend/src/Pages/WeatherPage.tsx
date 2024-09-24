import { useEffect, useState } from "react";
import { getWeather, Weather } from "../api/api.ts";

export default function WeatherPage() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude.toString();
            const longitude = position.coords.longitude.toString();
            setLocation({ latitude, longitude });

            getWeather(latitude, longitude).then((weatherRes) => {
              setWeather(weatherRes.weather);
            });
          },
          (error) => {
            setError("Error getting location: " + error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  // Function to get highest temperature for the next 7 days
  const getMaxTemperatureForNextSevenDays = () => {
    if (weather && weather.hourly) {
      const dailyTemperatures = [];
      const today = new Date();

      // Loop through the next 7 days
      for (let i = 0; i < 7; i++) {
        const start = i * 24; // Start index for the day
        const end = start + 24; // End index for the day
        const maxTemp = Math.max(...weather.hourly.temperature_2m.slice(start, end));

        // Create date string for the next 7 days
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

        dailyTemperatures.push({ date: dateString, maxTemp });
      }

      return dailyTemperatures;
    }
    return null;
  };

  // Function to get hourly temperatures for today
  const getHourlyTemperaturesToday = () => {
    if (weather && weather.hourly) {
      const todayTemperatures = weather.hourly.temperature_2m.slice(0, 24); // Current day
      return todayTemperatures.map((temp, index) => (
        <li key={index} className="flex justify-between p-1 border-b border-gray-200">
          <span>{weather.hourly.time[index].slice(11, 16)}</span>
          <span>{temp.toFixed(1)}°C</span>
        </li>
      ));
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">🌧️ Nuværende vejr ☀️</h1>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <div className="text-center max-w-lg w-full">
          {location.latitude && location.longitude ? (
            <p className="text-xl text-gray-700 mb-4">
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </p>
          ) : (
            <p className="text-xl text-gray-700 mb-4">Henter placering...</p>
          )}
          {weather ? (
            <>
              <p className="text-2xl text-blue-600 font-semibold mb-4">Nuværende temperatur: {weather.current.temperature_2m.toFixed(1)}°C</p>
              <h2 className="text-xl font-bold mt-6">Højeste temperaturer for de næste 7 dage</h2>
              <ul className="text-lg text-gray-700 mb-4">
                {getMaxTemperatureForNextSevenDays()?.map((item, index) => (
                  <li key={index} className="flex justify-between p-1 border-b border-gray-200">
                    {index === 0 ? "I dag" : <span>{item.date}</span>} <span>{index === 0 ? item.maxTemp.toFixed(1) + "°C" : item.maxTemp.toFixed(1) + "°C"}</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-xl font-bold mt-6">Vejret i dag</h2>
              <ul className="text-lg text-gray-700 mb-4">{getHourlyTemperaturesToday()}</ul>
            </>
          ) : (
            <p className="text-xl text-gray-500">Henter vejroplysninger...</p>
          )}
        </div>
      )}
    </div>
  );
}
