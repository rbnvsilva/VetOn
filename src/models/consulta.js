const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultaSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        hora: {
            type: String,
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Consulta = mongoose.model("Consulta", consultaSchema);
module.exports = Consulta;
