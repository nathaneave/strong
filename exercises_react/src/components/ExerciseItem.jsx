import '../App.css';
import { MdDelete, MdEdit } from "react-icons/md";

function ExerciseItem({ exercise, onDelete, onEdit }) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>            
                <a href="/" onClick={e => {e.preventDefault(); onEdit(exercise)}}><MdEdit /></a> &nbsp;
                <a href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id)}}><MdDelete /></a>
            </td>
        </tr>
    );
}

export default ExerciseItem;