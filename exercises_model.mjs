/**
 * Nathan Eave (eaven@oregonstate.edu)
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
});


/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model('Exercise', exerciseSchema);

/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps 
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

/**
 * Returns the entire collection of exercises.
 * 
 * @returns {Object} An object containing all exercises.
 */
const getExercises = async () => {
    const query = Exercise.find();
    return query.exec()
}

/**
 * Finds an exercise with the given ID.
 * 
 * @param {Number} exerciseID
 * @returns {Object} An object containing the exercise who matched the request, if it exists.
 */
const findExerciseID = async (exerciseID) => {
    const query = Exercise.findById(exerciseID)
    return query.exec()
}

/**
 * Updates the provided details of an exercise with the given ID.
 * 
 * @param {Number} id
 * @param {Object} update
 * @returns {Number} The number of properties that were updated (0 if the exercise was not found and nothing was updated).
 */
const updateExercise = async(id, update) => {
    const result = await Exercise.updateOne({_id: id}, update)
}


/**
 * Deletes the exercise with the given ID, if it exists.
 * 
 * @param {Number} id
 * @returns {Number} The number of exercises who were deleted, if the given exercise ID existed.
 */
const deleteByExerciseID = async(id) => {
    const result = await Exercise.deleteOne({ _id: id })
    return result.deletedCount
}

export { connect, createExercise, getExercises, findExerciseID, updateExercise, deleteByExerciseID };