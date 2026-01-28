// app/weather-demo/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function WeatherDemoPage() {
  // State management
  const [city, setCity] = useState('Delhi'); // Changed default to India
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Function to fetch weather by city name
  const fetchWeatherByCity = async (cityName: string) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // SECURITY NOTE: For a real app, create a Next.js API route to hide your key.
      // For this demo, using a public key in .env.local is acceptable.
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key is not configured. Please check your .env.local file.');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=${unit}`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        // OpenWeather provides user-friendly error messages in the response[citation:6]
        throw new Error(data.message || `API Error: ${response.status}`);
      }
      
      setWeather(data);
      setCity(data.name); // Update input with the city name returned by API (good for corrections like "Mumbai" -> "Mumbai, IN")
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch weather by user's geolocation
  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    
    setLoading(true);
    setError('');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
          const { latitude, longitude } = position.coords;
          
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
          );
          const data = await response.json();
          
          if (response.ok) {
            setWeather(data);
            setCity(data.name);
          } else {
            throw new Error(data.message);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Could not retrieve your location. Please search for a city instead.");
        setLoading(false);
      }
    );
  };

  // Load initial weather for default city
  useEffect(() => {
    fetchWeatherByCity('Delhi');
  }, []); // Runs once on mount

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherByCity(city);
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    if (weather) {
      // Refetch for the current city with the new unit
      fetchWeatherByCity(weather.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Branding */}
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">🌤️ Real-Time Weather API Demo</h1>
              <p className="text-blue-100">
                A practical example of REST API integration for enterprise applications.
              </p>
            </div>
            {/* Powered By Branding */}
            <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-sm text-blue-200">Powered by</p>
              <p className="text-xl font-bold text-white">Rishab Informatica Group</p>
              <p className="text-xs text-blue-200 mt-1">Industry Connect Program</p>
            </div>
          </div>
          <nav className="text-sm mt-6">
            <a href="/" className="opacity-80 hover:opacity-100 hover:underline">Home</a> &gt;
            <a href="/job-support" className="mx-2 opacity-80 hover:opacity-100 hover:underline">Industry Connect</a> &gt;
            <span className="ml-2 font-medium">Weather API Demo</span>
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Weather Panel - Left 2/3 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Weather Dashboard</h2>
              
              {/* Search and Controls */}
              <div className="space-y-4 mb-6">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name (e.g., Mumbai, Chennai, London)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Loading...' : 'Search'}
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={fetchWeatherByLocation}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    📍 Use My Location
                  </button>
                  <button
                    onClick={toggleUnit}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Switch to {unit === 'metric' ? '°F' : '°C'}
                  </button>
                </div>

                {/* Quick City Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-gray-600">Popular:</span>
                  {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'].map((quickCity) => (
                    <button
                      key={quickCity}
                      type="button"
                      onClick={() => {
                        setCity(quickCity);
                        fetchWeatherByCity(quickCity);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    >
                      {quickCity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
                  <p className="text-red-700 font-medium">⚠️ {error}</p>
                </div>
              )}

              {/* Weather Display */}
              {weather && !loading && (
                <div className="border rounded-xl p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {weather.name}, {weather.sys.country}
                      </h3>
                      <p className="text-gray-600">
                        {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="w-16 h-16"
                      />
                      <div className="ml-4">
                        <p className="text-4xl font-bold text-gray-800">
                          {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                        </p>
                        <p className="text-lg text-gray-600 capitalize">
                          {weather.weather[0].description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Weather Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">Feels Like</p>
                      <p className="text-xl font-bold">
                        {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">Humidity</p>
                      <p className="text-xl font-bold">{weather.main.humidity}%</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">Wind Speed</p>
                      <p className="text-xl font-bold">
                        {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">Pressure</p>
                      <p className="text-xl font-bold">{weather.main.pressure} hPa</p>
                    </div>
                  </div>
                </div>
              )}

              {/* API Response (Educational - for demo purposes) */}
              {weather && (
                <details className="mt-8 bg-gray-900 text-gray-300 rounded-xl p-4">
                  <summary className="cursor-pointer text-lg font-medium text-white">📡 View Raw API Response (Educational)</summary>
                  <p className="text-sm text-gray-400 mt-2 mb-4">
                    This is the actual JSON response from OpenWeatherMap API[citation:6]. In CAI, you would map these fields in your process.
                  </p>
                  <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm max-h-60">
                    {JSON.stringify(weather, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>

          {/* CAI Info Panel - Right 1/3 */}
          <div className="lg:col-span-1 space-y-6">
            {/* IICS CAI Integration Info */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">🔗 Connect This to IICS CAI</h3>
              <p className="mb-4">
                This frontend calls an API. In <strong>Informatica IICS Cloud Application Integration (CAI)</strong>, you would build the backend integration.
              </p>
              
              <h4 className="font-bold mt-4 mb-2">Key Learning Steps for Your Students:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Create a <strong>Service Connector</strong> for the OpenWeather REST API[citation:7].</li>
                <li>Design a <strong>Process</strong> that accepts a city name as input.</li>
                <li>Use a <strong>Call Service</strong> step to invoke the API with the input parameter.</li>
                <li>Map the JSON response to process variables (temp, humidity, etc.).</li>
                <li>Use the <strong>API Manager</strong> to expose this process as a secure, managed API.</li>
                <li>Your React app would then call <em>your CAI API</em>, not OpenWeather directly.</li>
              </ol>
              
              <div className="mt-6 pt-4 border-t border-white/20">
                <a
                  href="/industry-connect/join"
                  className="block w-full text-center bg-white text-indigo-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors mb-3"
                >
                  Learn CAI with Real Projects
                </a>
                <p className="text-xs text-center text-indigo-200">
                  Part of the Rishab Informatica Group Industry Connect curriculum.
                </p>
              </div>
            </div>

            {/* API Documentation Reference */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📖 API Reference</h3>
              <p className="text-gray-600 mb-4">
                This demo uses the <strong>OpenWeatherMap Current Weather API</strong>[citation:6][citation:10].
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Endpoint:</p>
                  <code className="bg-gray-100 p-2 rounded block">/data/2.5/weather</code>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Method:</p>
                  <p>GET</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Key Parameters:</p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li><code>q={city}</code> <em>(City name)</em></li>
                    <li><code>appid=API_KEY</code> <em>(Your API key)</em></li>
                    <li><code>units=metric</code> <em>(For °C)</em>[citation:3]</li>
                  </ul>
                </div>
                <a 
                  href="https://openweathermap.org/current" 
                  target="_blank" 
                  className="inline-block mt-2 text-blue-600 hover:underline font-medium"
                >
                  View Full API Docs →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t text-center text-gray-600 text-sm">
          <p>
            <strong>Demo Objective:</strong> To teach practical API integration and IICS CAI development. Data provided by 
            <a 
              href="https://openweathermap.org" 
              target="_blank" 
              className="text-blue-600 hover:underline mx-1"
            >
              OpenWeatherMap
            </a>.
          </p>
          <p className="mt-2">
            A training project by <strong>Rishab Informatica Group</strong> • 
            <a href="/courses" className="text-blue-600 hover:underline mx-2">Explore our IICS & CAI Courses</a>
          </p>
        </footer>
      </div>
    </div>
  );
}