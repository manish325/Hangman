const mongoose = require('mongoose');
const connectDB =  (dbURI)=>{
    return mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
          w: 'majority',
          j: true,
        },
      });
}
module.exports = {mongoose, connectDB};