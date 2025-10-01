import mongoose from "mongoose";


const catgorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

}, { timestamps: true });

const Catgory = mongoose.model("Catgory", catgorySchema);

export default Catgory;