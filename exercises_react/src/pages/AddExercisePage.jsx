import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        );
        if(response.status === 201) {
            alert("Great lift! Exercise successfully added.");
        } else {
            alert("Oops! Something went wrong. Failedd to add exercise. (ERR: " + response.status + ")")
        }
        navigate('/')
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                value={name}
                placeholder="Exercise Name"
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Reps"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                placeholder="Weight"
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select id="unit" onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                value={date}
                placeholder="Date (MM-DD-YY)"
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;