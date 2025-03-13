import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import BuildingSelect from './components/BuildingSelect';
import BuildingView from './components/BuildingView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/buildings" element={<BuildingSelect />} />
            <Route path="/building/:buildingId" element={<BuildingView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;