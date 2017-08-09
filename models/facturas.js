var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var facturaSchema = new Schema({  
  num:    { type: String },
  date:  { type: Date },
  origen:   { type: String, enum:
  ['Guayaquil', 'Quito', 'Cuenca','Ambato','Manta']
        },
  destino:  { type: String, enum:
  ['Guayaquil', 'Quito', 'Cuenca','Ambato','Manta']
        },
  debt: { type: Number},
  adq: { type: String},
  puesto: { type: String},
  summary:  { type: String }
});

module.exports = mongoose.model('Factura', facturaSchema);  
