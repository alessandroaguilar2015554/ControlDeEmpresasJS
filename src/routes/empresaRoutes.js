'use strict'

var express = require("express")
var empresaController = require("../controller/empresaController")
var md_auth = require("../middlewares/authenticated")

//RUTAS
var api = express.Router()
api.post('/registrarEmpresa', empresaController.registrarEmpresa);
api.put('/editarEmpresa/:idEmpresa', md_auth.ensureAuth, empresaController.editarEmpresa)
api.delete('/deleteEmpresa/:idEmpresa', md_auth.ensureAuth, empresaController.deleteEmpresa)
api.post('/login', empresaController.login)

//Sucursal Rutas
api.post('/registrarSucursales', md_auth.ensureAuth, empresaController.registrarSucursales);
api.put('/editarSucursales/:idSucursal', md_auth.ensureAuth, empresaController.editarSucursales)
api.delete('/deleteSucursales/:idSucursal', md_auth.ensureAuth, empresaController.deleteSucursales)
api.get('/getSucursales', empresaController.getSucursales)
api.get('/listadoSucursales', empresaController.listadoSucursales);

//Productos Rutas
api.post('/registrarProductos', empresaController.registrarProductos);
api.get('/stockProductoEmpresa', empresaController.stockProductoEmpresa)
api.get('/nombreProducto/:nombreProducto', empresaController.nombreProducto)




module.exports = api;