const mongoose = require('mongoose');

try{
    mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log('Database connected');

}
catch(error){
    if (error instanceof Error) {
        console.log(error.message);
    } else {
        console.log(String(error));
    }
}