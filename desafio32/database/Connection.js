const mongoose = require('mongoose');

const Connection = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch(error){
        throw new Error();
    }
}

module.exports = Connection;