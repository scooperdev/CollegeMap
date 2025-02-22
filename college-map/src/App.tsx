import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import BuildingSelect from './components/BuildingSelect';
import BuildingView from './components/BuildingView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/buildings" element={<BuildingSelect />} />
        <Route path="/building/:buildingId" element={<BuildingView />} />
      </Routes>
    </Router>
  );
}

export default App;