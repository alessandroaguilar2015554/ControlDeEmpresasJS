'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombreEmpresa: String,
    telefono: String,
    direccion: String,
    email: String,
    password: String,
    rol: String,
    //empleado: [{ type: Schema.Types.ObjectId, ref: 'empleado'}]
        //productos: { type: Schema.ObjectId, ref: 'producto'}


})

module.exports = mongoose.model('empresa', EmpresaSchema)