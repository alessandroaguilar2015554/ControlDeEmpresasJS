'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var SucursalSchema = Schema({
    nombreSucursal: String,
    telefono: String,
    direccion: String,
    rol: String,
    empresa: { type: Schema.ObjectId, ref: 'empresa'},
    empleado: { type: Schema.ObjectId, ref: 'empleado'},
    //producto: { type: Schema.ObjectId, ref: 'producto'}

})

module.exports = mongoose.model('sucursal', SucursalSchema)