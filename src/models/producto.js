'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    nombreProducto: String,
    precio: String,
    empresa: { type: Schema.ObjectId, ref: 'empresa'},
    sucursal: { type: Schema.ObjectId, ref: 'sucursal'}

})

module.exports = mongoose.model('producto', ProductoSchema)