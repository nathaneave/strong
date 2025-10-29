import ExerciseItem from './ExerciseItem';
import '../App.css';

function ExerciseCollection({ exercises, onDelete, onEdit}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Exercise
                    </th>
                    <th>
                        Reps
                    </th>
                    <th>
                        Weight
                    </th>
                    <th>
                        Units
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Update Exercise
                    </th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <ExerciseItem exercise={exercise}
                onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>

    );
}

export default ExerciseCollection;