//File: controllers/facturas.js
var mongoose = require('mongoose');  
var Factura  = mongoose.model('Factura');

//GET - Return all facturas in the DB
exports.findAllFacturas = function(req, res) {  
    Factura.find(function(err, factura) {
        if(err) res.send(500, err.message);
        else {
            return res.render('../views/facturas/index', {title: 'Control de Tickets', factura: factura});
        }
        console.log('GET /facturas');
            res.status(200).jsonp(factura);
    });
};

//GET - Return a Facturas with specified ID
exports.findById = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
    if(err) return res.send(500, err.message);

    console.log('GET /factura/' + req.params.id);
        res.status(200).jsonp(factura);
    });
};

//POST - Insert a new Facturas in the DB
exports.addFactura = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var factura = new Factura({
        num:      req.body.num,
        date:     req.body.date,
	origen:     req.body.origen,
	destino:     req.body.destino,
        debt:     req.body.debt,
        adq:    req.body.adq,
	puesto:    req.body.puesto,
        summary:  req.body.summary
    });

    factura.save(function(err, factura) {
        if(err) return res.status(500).send( err.message);
        else res.redirect('/');
    });
};


exports.showEditFactura = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
        
        if(err) return res.status(500).send(err.message);
        else return res.render('../views/facturas/show', {
            put: true,
            title: 'Editar Ticket',
            act: '/edit-factura/'+req.params.id+'/edit',
            factura:factura});
        res.status(200).jsonp(factura);
        
    });
};

//PUT - Update a register already exists
exports.updateFactura = function(req, res) {  
    Factura.findById(req.params.id, function(err, factura) {
        var num =      req.body.num;
        var date =     req.body.date;
	    var origen =     req.body.origen;
	    var destino =     req.body.destino;
        var debt =     req.body.debt;
        var adq =    req.body.adq;
	    var puesto =    req.body.puesto;
        var summary =  req.body.summary;

        factura.update({
            num: num,
            date: date,
            origen: origen,
            destino: destino,
            debt: debt,
            adq: adq,
            puesto: puesto,
        },function(err) {
            if(err) res.send("There was a problem updating the information to the database: " + err);
            else res.redirect('/');

        });
    });
};

//DELETE - Delete a Factura with specified ID
exports.deleteFactura = function(req, res) {  
    Factura.remove({_id: req.params.id}, function(err) {
        if(err) res.send('Error al intentar eliminar el personaje.');
        else res.redirect('/');
        
    });
};

exports.create = function (req, res) {
    
  return res.render('../views/facturas/show', {
    put: false,
    title: 'Nuevo Ticket',
    act: '/facturas',
    factura: {}})
}
