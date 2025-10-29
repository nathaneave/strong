/**
 * Nathan Eave (eaven@oregonstate.edu)
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVALID_REQUEST = {Error: "Invalid request"};

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});


/**
 * 
 * @param {object} req 
 * @returns 
 */
function isValid(req){
    if (
        typeof(req.body.name) === "string"
        && req.body.name.length >= 1
        && Number.isInteger(req.body.reps)
        && req.body.reps > 0
        && Number.isInteger(req.body.weight)
        && req.body.weight > 0
        && (req.body.unit === "kgs" || req.body.unit === "lbs")
        && isDateValid(req.body.date)
    ) {
      return true;
    } else { 
        return false;
    }
  }
  
/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}


/**
 * Endpoint #1 - Create using POST /exercises
 * Create a new exercise with the query parameters provided in the body
 */

app.post('/exercises', asyncHandler(async (req, res) => {
    if (isValid(req)){
        const exercise = await exercises.createExercise(req.body.name, 
                                req.body.reps, 
                                req.body.weight,
                                req.body.unit,
                                req.body.date);
        res.status(201).json(exercise);
    } else {
        res.status(400).json(ERROR_INVALID_REQUEST)
    }
}));

/**
 * Endpoint #2 - Read using GET /exercises
 * Find all exercises
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const response = await exercises.getExercises()
    res.status(200).json(response)
}));

/**
 * Endpoint #3 - Read one using GET /exercises/:id
 * Find a exercise with the given ID
 */
app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const response = await exercises.findExerciseID(req.params.id)
    if (response != null) {
        res.status(200).json(response)
    } else {
        res.status(404).json(ERROR_NOT_FOUND)
    }
}));

/**
 * Endpoint #4 - Update using PUT /exercises/:id
 * Update the exercise with the ID given in the path parameter with the query parameters
 * provided in the body
 */
app.put('/exercises/:id', asyncHandler(async(req, res) =>{
    if (!isValid(req)) {
        res.status(400).json(ERROR_INVALID_REQUEST)
        return
    }
    const idExists = await exercises.findExerciseID(req.params.id)
    if (idExists == null) {
        res.status(404).json(ERROR_NOT_FOUND)
    } else {
        await exercises.updateExercise(req.params.id, req.body)
        const exerciseModified = await exercises.findExerciseID(req.params.id)
        res.status(200).json(exerciseModified)
    }
}));

/**
 * Endpoint #5 - Delete one using DELETE /exercises/:id
 * Delete the exercise with the ID given in the path parameter
 */
app.delete('/exercises/:id', asyncHandler(async(req, res) => {
    const response = await exercises.deleteByExerciseID(req.params.id)
    if (response === 0) {
        res.status(404).json(ERROR_NOT_FOUND)
    } else {
        res.status(204).json()
    }
}));