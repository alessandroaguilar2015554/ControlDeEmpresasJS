'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var EmpleadoSchema = Schema({
    nombre: String,
    puesto: String,
    departamento: String,
    numero: String,
    sucursal: { type: Schema.ObjectId, ref: 'sucursal'}
})

module.exports = mongoose.model('empleado', EmpleadoSchema)