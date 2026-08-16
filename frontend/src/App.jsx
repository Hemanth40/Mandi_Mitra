import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MandiPrice from '../pages/MandiPrice';
import WeatherForecast from '../pages/WeatherForecast';
import CropDoctor from '../pages/CropDoctor';
import News from '../pages/News';
import GovSchemes from '../pages/GovSchemes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prices" element={<MandiPrice />} />
        <Route path="/weather" element={<WeatherForecast />} />
        <Route path="/crop-doctor" element={<CropDoctor />} />
        <Route path="/news" element={<News />} />
        <Route path="/schemes" element={<GovSchemes />} />
      </Routes>
    </Router>
  );
}

export default App;

