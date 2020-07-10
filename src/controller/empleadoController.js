'use strict'

var bcrypt = require("bcrypt-nodejs")
var Empleado = require('../models/empleado')
var jwt = require("../service/jwt")


//-------Registrar un empleado-----------

function registrar(req, res) {
    var empleado = new Empleado();
    var params = req.body;

    if(params.nombre){
        empleado.nombre = params.nombre;
        empleado.puesto = params.puesto;
        empleado.departamento = params.departamento;
        empleado.numero = params.numero;
        empleado.sucursal = params.sucursal;
       

        Empleado.find({ $or: [ 
            { nombre: empleado.nombre }
        
        ]}).exec((err, empleados)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion de usuario' })

                    empleado.save((err, empleadoGuardado)=>{
                        if(err) return res.status(500).send({message: 'Error al guardar el empleado'})

                        if(empleadoGuardado){
                            res.status(200).send({ empleado: empleadoGuardado})
                        }else{
                            res.status(404).send({ message: 'No se ha podido registrar el empleado'})
                        }
                    })
                
              
             })
        }else{
             res.status(200).send({
             message: 'Rellene los campos necesarios'
        })
    }
}

//----------Editar empleado existente---------------

function editarEmpleado(req, res){
    var empleadoId = req.params.idEmpleado;
    var params = req.body


   Empleado.findByIdAndUpdate(empleadoId, params, {new: true}, (err, empleadoActualizado)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion' })
        if(!empleadoActualizado) return res.status(404).send({ message: 'No se ha podido actualizar los datos del empleado' })

        return res.status(200).send({ empleado: empleadoActualizado })
    })
}

//--------Eliminar empleado existente-------------------------- 

function deleteEmpleado(req, res){
    var empleadoId = req.params.idEmpleado;
    
    Empleado.findByIdAndDelete(empleadoId, (err, empleadoEliminado)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion de eliminar el empleado'}) 
        if(!empleadoEliminado) return res.status(404).send({message: 'Error en eliminar empleado'})
        return res.status(200).send({ empleadoEliminado })
    })
}


//---------Cantidad de empleados registrados----------------------

function controlEmpleado(req, res) {

    Empleado.countDocuments((err, numeroEmpleados)=>{

        if(err) return res.status(500).send({message: 'Error en la petición de cuenta total empleados'})
            return res.status(200).send({message: `Empleados actuales: ${numeroEmpleados}`})
    })

}


//---------------Busqueda de empleado por id---------------


function empleadoId(req, res){
    var empleadoId = req.params.idEmpleado

    Empleado.findById(empleadoId,(err, empleado)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion de buscar la id de empleado'})
        if(!empleado) return res.status(404).send({message: 'Error en la consulta de empleado'})

            return res.status(200).send({empleado})
    })
}

//------------Busqueda por nombre de empleado------------------

/*function empleadoNombre(req, res){
    var empleadoNombre = req.params.nombreEmpleado;

    Empleado.find({nombre:{$regex: empleadoNombre}},(err, empleadoNom)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion de busqueda por nombre'})
        if(!empleadoNom) return res.status(404).send({ message: 'No se a podido mostrar el Nombre del empleado'})

            return res.status(200).send({ empleado: empleadoNom})
    })
}*/



function empleadoNombre(req, res){
    var empleadoNombre = req.params.nombreEmpleado

    Empleado.find({nombre: empleadoNombre },(err, empleado)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion de buscar empleado'})
        if(!empleado) return res.status(404).send({message: 'Error en la consulta de empleado'})

            return res.status(200).send({empleado: empleado})
    })
}


//------------Busqueda por puesto de empleado------------------

/*function empleadoPuesto(req, res){
    var empleadoPuesto = req.params.puestoEmpleado;

    Empleado.find({puesto:{$regex: empleadoPuesto}},(err, EmpleadoPuesto)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!EmpleadoPuesto) return res.status(404).send({ message: 'No se a podido mostrar el empleado en dicho puesto'})

            return res.status(200).send({empleado: EmpleadoPuesto})
    })
}*/




function empleadoPuesto(req, res){
    var empleadoPuesto = req.params.puestoEmpleado

    Empleado.find({puesto: empleadoPuesto },(err, empleado)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion de buscar empleado por puesto'})
        if(!empleado) return res.status(404).send({message: 'No se a podido mostrar el empleado en dicho puesto'})

            return res.status(200).send({empleado: empleado})
    })
}


//------------Busqueda por departamento laboral de empleado------------------

function empleadoDepartamento(req, res){
    var empleadoDepartamento = req.params.departamentoEmpleado;

    Empleado.find({departamento:{$regex: empleadoDepartamento}},(err, DepartamentoEmpleado)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!DepartamentoEmpleado) return res.status(404).send({ message: 'No se a podido mostrar el Departamento'})

            return res.status(200).send({empleado: DepartamentoEmpleado})
    })
}

//------------Muestra todos los empleados------------------

function getEmpleados(req, res){

    Empleado.find((err, empleados)=>{

        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!empleados) return res.status(404).send({ message: 'No se a podido mostrar todo los Empleados'})

            return res.status(200).send( { empleados })
    })
}





module.exports = {
registrar,
editarEmpleado,
deleteEmpleado,
controlEmpleado,
empleadoId,
empleadoNombre,
empleadoPuesto,
empleadoDepartamento,
getEmpleados
}