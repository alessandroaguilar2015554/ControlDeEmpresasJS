'use strict'

var express = require("express")
var empleadoController = require("../controller/empleadoController")

//RUTAS
var api = express.Router()
api.post('/registrar', empleadoController.registrar);
api.put('/editarEmpleado/:idEmpleado', empleadoController.editarEmpleado)
api.delete('/deleteEmpleado/:idEmpleado', empleadoController.deleteEmpleado)
api.get('/cantidadPersonal', empleadoController.controlEmpleado)
api.get('/empleadoId/:idEmpleado', empleadoController.empleadoId)
api.get('/empleadoNombre/:nombreEmpleado', empleadoController.empleadoNombre)
api.get('/empleadoPuesto/:puestoEmpleado', empleadoController.empleadoPuesto)
api.get('/empleadoDepartamento/:departamentoEmpleado', empleadoController.empleadoDepartamento)
api.get('/getEmpleados', empleadoController.getEmpleados)


module.exports = api;