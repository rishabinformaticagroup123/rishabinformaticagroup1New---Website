// app/weather-demo/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function WeatherDemoPage() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName: string = city) => {
    setLoading(true);
    setError('');
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      
      // Debug: Check if API key is loaded
      console.log('API Key loaded:', !!apiKey);
      if (apiKey) {
        console.log('Key first 5 chars:', apiKey.substring(0, 5));
      }
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`
      );
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (response.ok) {
        setWeather(data);
      } else {
        throw new Error(data.message || `Error: ${response.status}`);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Load initial weather
  useEffect(() => {
    fetchWeather('London');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {/* Header */}
        <header style={{ 
          background: 'linear-gradient(to right, #1e40af, #3730a3)',
          color: 'white',
          padding: '2rem',
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🌤️ Weather API Demo
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Industry Connect Program • Real-time REST API Integration
          </p>
          <nav style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            <a href="/" style={{ opacity: 0.8 }}>Home</a> &gt; 
            <a href="/job-support" style={{ margin: '0 0.5rem', opacity: 0.8 }}>Industry Connect</a> &gt; 
            <span style={{ marginLeft: '0.5rem' }}>Weather Demo</span>
          </nav>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }}>
          {/* Weather App Card */}
          <div style={{ 
            background: 'white',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Live Weather Dashboard
            </h2>
            
            {/* Search Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    background: loading ? '#9ca3af' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Loading...' : 'Search'}
                </button>
              </div>
              
              {/* Quick Cities */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ color: '#6b7280' }}>Try:</span>
                {['Paris', 'Tokyo', 'New York', 'Sydney', 'Dubai'].map((quickCity) => (
                  <button
                    key={quickCity}
                    type="button"
                    onClick={() => {
                      setCity(quickCity);
                      fetchWeather(quickCity);
                    }}
                    style={{
                      padding: '6px 12px',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    {quickCity}
                  </button>
                ))}
              </div>
            </form>

            {/* Error Display */}
            {error && (
              <div style={{
                background: '#fee2e2',
                borderLeft: '4px solid #dc2626',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '4px'
              }}>
                <p style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Error: {error}
                </p>
                <p style={{ color: '#991b1b', fontSize: '0.9rem' }}>
                  Make sure your API key is activated (takes 2-3 hours after creation)
                </p>
              </div>
            )}

            {/* Weather Display */}
            {weather && (
              <div style={{
                background: 'linear-gradient(to right, #dbeafe, #e0f2fe)',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af' }}>
                      {weather.name}, {weather.sys.country}
                    </h3>
                    <p style={{ color: '#4b5563' }}>
                      {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      style={{ width: '80px', height: '80px' }}
                    />
                    <div style={{ marginLeft: '1rem' }}>
                      <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1f2937' }}>
                        {Math.round(weather.main.temp)}°C
                      </div>
                      <div style={{ fontSize: '1.2rem', color: '#6b7280', textTransform: 'capitalize' }}>
                        {weather.weather[0].description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Feels Like</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {Math.round(weather.main.feels_like)}°C
                    </p>
                  </div>
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Humidity</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {weather.main.humidity}%
                    </p>
                  </div>
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Wind Speed</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {weather.wind.speed} m/s
                    </p>
                  </div>
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Pressure</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {weather.main.pressure} hPa
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Debug Info */}
            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: '#64748b'
            }}>
              <p>Debug Info:</p>
              <p>API Key loaded: {process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ? '✅ Yes' : '❌ No'}</p>
              <p>Current city: {city}</p>
              <p>Loading state: {loading ? '⏳ Loading...' : '✅ Ready'}</p>
            </div>
          </div>

          {/* Industry Connect Info */}
          <div style={{
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            color: 'white',
            padding: '2rem',
            borderRadius: '10px',
            marginTop: '1rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              🚀 Want to Build Real Projects Like This?
            </h3>
            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
              Join our Industry Connect program to work on 5+ real-world projects 
              and get job-ready with hands-on experience.
            </p>
            <a
              href="/industry-connect/join"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'white',
                color: '#4f46e5',
                borderRadius: '8px',
                fontWeight: 'bold',
                textDecoration: 'none',
                marginRight: '1rem'
              }}
            >
              Join Industry Connect
            </a>
            <a
              href="/courses"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: '2px solid white',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              View All Courses
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.9rem'
        }}>
          <p>This demo is part of the Industry Connect program • Data provided by OpenWeatherMap</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a> • 
            <a href="/courses" style={{ color: '#2563eb', textDecoration: 'none', margin: '0 1rem' }}>Courses</a> • 
            <a href="/industry-connect" style={{ color: '#2563eb', textDecoration: 'none' }}>Industry Connect</a>
          </p>
        </footer>
      </div>
    </div>
  );
}