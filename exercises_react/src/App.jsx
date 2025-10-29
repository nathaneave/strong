import './App.css';
import { useState } from 'react';
import Navigation from './components/Navigation';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <>
      <header>
        <h1>Welcome to Strong ⚡</h1>
        <p>Log your lifts, track your progress, and more!</p>
      </header>
      <div className="app">
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
              <Route path="/add-exercise" element={ <AddExercisePage />}></Route>
              <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
            </Routes>
          </Router>
      </div>
      <footer>
       © 2025 Nathan Eave
      </footer>
    </>
  );
}

export default App;