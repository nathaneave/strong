import { Link } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const data = await response.json()
        setExercises(data)
    }

    useEffect( () => {
        loadExercises();
    }, []);

    const onDelete = async(_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204) {
            setExercises(exercises.filter(exercise => exercise._id !== _id))
        } else {
            alert(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)

        }
    }

    const onEdit = async (exercise) => {
        setExerciseToEdit(exercise)
        navigate('/edit-exercise')
    }

    return (
        <>
            <h2>Your Exercises + Lifts</h2>
            <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
        </>
    );
}

export default HomePage;