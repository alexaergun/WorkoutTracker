const mongoose = require("mongoose");
const schema = mongoose.schema;
const workoutSchema = new schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter a exercise type"
                },

                name: {
                    type: String,
                    trim: true,
                    required: "Enter exercise name"
                },

                duration: {
                    type: Number,
                    required: "Enter duration of exercise in minutes"
                },

                weight: {
                    type: Number
                },

                reps: {
                    type: Number
                },

                sets: {
                    type: Number
                },

                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJson: {
            //request virtual properties when data is called
            virtual:true
        }
    }
);

workoutSchema.virtual("totalDuration").get(function() {
    //reduces exercise array down to the durations sum
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;