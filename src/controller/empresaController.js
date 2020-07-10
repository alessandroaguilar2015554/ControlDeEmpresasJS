'use strict'

var bcrypt = require("bcrypt-nodejs")
var Empresa = require('../models/empresa')
var Sucursal = require('../models/sucursal')

var Producto = require('../models/producto')

var jwt = require("../service/jwt")


//-------Empresa----------------------------------------------------------------------------------------------------------------------------------


//Registrar------------------------------------------------

function registrarEmpresa(req, res) {
    var empresa = new Empresa();
    var params = req.body;

    if(params.nombreEmpresa && params.email && params.password){
        empresa.nombreEmpresa = params.nombreEmpresa;
        empresa.telefono = params.telefono;
        empresa.direccion = params.direccion;
        empresa.email = params.email;
        //empresa.password = params.password;
        empresa.rol = 'ROLE_EMPRESA';
        //empresa.empleado = params.empleado;
       

        Empresa.find({ $or: [ 
            { nombreEmpresa: empresa.nombreEmpresa },
            { email: empresa.email }
        
        ]}).exec((err, empresas)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion de empresa' })

            
                

            if(empresas && empresas.length >= 1){
                return res.status(500).send({message: 'Este nombre de empresa ya esta en uso'})
            }else{
                bcrypt.hash(params.password, null, null, (err, hash)=>{
                    empresa.password = hash;


                empresa.save((err, empresaGuardada)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar la empresa'})

                        if(empresaGuardada){
                            res.status(200).send({ empresa: empresaGuardada})
                        }else{
                            res.status(404).send({ message: 'No se ha podido registrar la empresa'})
                        }
                    })
                
                })

            }

        })

        }else{
             res.status(200).send({
             message: 'Rellene los campos necesarios'
        })
    }
}

//----------Editar empresa existente---------------

function editarEmpresa(req, res){
    var empresaId = req.params.idEmpresa;
    var params = req.body


   Empresa.findByIdAndUpdate(empresaId, params, {new: true}, (err, empresaActualizada)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion' })
        if(!empresaActualizada) return res.status(404).send({ message: 'No se ha podido actualizar los datos de la empresa' })

            return res.status(200).send({ empleado: empresaActualizada })
    })
}

//--------Eliminar empresa existente--------------------------

function deleteEmpresa(req, res){
    var empresaId = req.params.idEmpresa;
    
    Empresa.findByIdAndDelete(empresaId, (err, empresaEliminada)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion de eliminar la empresa'}) 
        if(!empresaEliminada) return res.status(404).send({message: 'Error en eliminar empresa'})
        
            return res.status(200).send({ empresaEliminada })
    })
}


//---------------Login-----------------------------------------------------------------------------------------------------------------------

function login(req, res){
    var params = req.body;

    Empresa.findOne({email: params.email}, (err, empresa)=>{
        if(err) return res.status(500).send({message: 'Eror en la peticion'})

        if(empresa){
            bcrypt.compare(params.password, empresa.password, (err, check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({
                            token: jwt.createToken(empresa)
                        })
                    }else{
                        empresa.password = undefined;
                        return res.status(200).send({ empresa })
                    }
                }else{
                    return res.status(404).send({message: 'La empresa no ha podido ingresar'})
                }
            })
        }else{
            return res.status(404).send({message: 'La empresa no se ha podido logear'})
        }
    })
}




//------------------------------------------------------------------------------------------------------------------------------------------------

//----------------Sucursal-----------------------------------------------------------------------------------------------------------------------



//Registrar------------------------------------------------

function registrarSucursales(req, res) {
    var sucursal = new Sucursal();
    var params = req.body;

    if(params.nombreSucursal){
        sucursal.nombreSucursal = params.nombreSucursal;
        sucursal.telefono = params.telefono;
        sucursal.direccion = params.direccion;
        sucursal.rol = 'ROLE_SUCURSAL';
        sucursal.empresa = req.user.sub;
        sucursal.empleado = params.empleado;
        //sucursal.producto = params.producto;
       

        Sucursal.find({ $or: [ 
            { nombreSucursal: sucursal.nombreSucursal }
        
        ]}).exec((err, sucursales)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion de sucursal' })

                    sucursal.save((err, sucursalGuardado)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar la sucursal'})

                        if(sucursalGuardado){
                            res.status(200).send({ sucursal: sucursalGuardado})
                        }else{
                            res.status(404).send({ message: 'No se ha podido registrar la sucursal'})
                        }
                    })
                
              
             })
        }else{
             res.status(200).send({
             message: 'Rellene los campos necesarios'
        })
    }
}



//Editar------------------------------------------------

function editarSucursales(req, res){
    var sucursalId = req.params.idSucursal;
    var params = req.body


   Sucursal.findByIdAndUpdate(sucursalId, params, {new: true}, (err, sucursalActualizada)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion' })
        if(!sucursalActualizada) return res.status(404).send({ message: 'No se ha podido actualizar los datos de la sucursal' })

        return res.status(200).send({ sucursal: sucursalActualizada })
    })
}



//Eliminar------------------------------------------------

function deleteSucursales(req, res){
    var sucursalId = req.params.idSucursal;
    
    Sucursal.findByIdAndDelete(sucursalId, (err, sucursalEliminada)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion de eliminar la sucursal'}) 
        if(!sucursalEliminada) return res.status(404).send({message: 'Error en eliminar la sucursal'})
        return res.status(200).send({ sucursalEliminada })
    })
}



function getSucursales(req, res){

    Sucursal.find((err, sucursales)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!sucursales) return res.status(404).send({ message: 'No se a podido mostrar todo las Sucursales'})

            return res.status(200).send( { sucursales })
    })
}




//listado Sucursales------------------------------------------------

function listadoSucursales(req, res){
    Sucursal.find({}, (err, sucursal)=>{
        if(err){res.status(500).send({message: 'Error'});
        }else if(sucursal){res.send({sucursal: sucursal});
        }else{
            res.send({message: 'No hay Sucursales que mostrar'});
        }
    }).populate('empresa','empleado');
}


  //------------------------------------------------------------------------------------------------------------------------------------------


  //---------------Productos-----------------------------------------------------------------------------------------------------------------



  //Registrar------------------------------------------------

  function registrarProductos(req, res) {
    var producto = new Producto();
    var params = req.body;

    if(params.nombreProducto){
        producto.nombreProducto = params.nombreProducto;
        producto.precio = params.precio;
        
        producto.empresa = params.empresa;
        producto.sucursal = params.sucursal;
       

        Producto.find({ $or: [ 
            { nombreProducto: producto.nombreProducto }
        
        ]}).exec((err, productos)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion de productos' })

                    producto.save((err, productoGuardado)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar el producto'})

                        if(productoGuardado){
                            res.status(200).send({ producto: productoGuardado})
                        }else{
                            res.status(404).send({ message: 'No se ha podido registrar el producto'})
                        }
                    })
                
              
             })
        }else{
             res.status(200).send({
             message: 'Rellene los campos necesarios'
        })
    }
}


//Stock------------------------------------------------

function stockProductoEmpresa(req, res) {

    Producto.countDocuments((err, numeroProductos)=>{

        if(err) return res.status(500).send({message: 'Error en la petición de stock de productos'})
            return res.status(200).send({message: `Stock en Empresa y Sucursales es: ${numeroProductos} productos`})
    })

}



//Buscar por Nombre------------------------------------------------

function nombreProducto(req, res){
    var productoNombre = req.params.nombreProducto

    Producto.find({nombreProducto: productoNombre },(err, producto)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion de buscar producto'})
        if(!producto) return res.status(404).send({message: 'Error en la consulta de producto'})

            return res.status(200).send({producto: producto})
    })
}





//--------------------------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    registrarEmpresa,
    editarEmpresa,
    deleteEmpresa,
    login,

    //Sucursal
    registrarSucursales,
    editarSucursales,
    deleteSucursales,
    getSucursales,
    listadoSucursales,

    //Producto
    registrarProductos,
    stockProductoEmpresa,
    nombreProducto



   
}