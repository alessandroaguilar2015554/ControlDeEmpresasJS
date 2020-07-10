'use strict'


var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_ControlEmpresa'

exports.createToken = function (empleado) {
    var payload = {
        sub: empleado._id,
        nombre: empleado.nombre,
        puesto: empleado.puesto,
        departamento: empleado.departamento,
        numero: empleado.numero,
        
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }

    return jwt.encode(payload, secret)
}

exports.createToken = function (empresa) {
    var payload = {
        sub: empresa._id,
        nombreEmpresa: empresa.nombreEmpresa,
        telefono: empresa.telefono,
        direccion: empresa.direccion,
        email: empresa.email,
        rol: empresa.rol,
        
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }

    return jwt.encode(payload, secret)
}