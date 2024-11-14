const express = require("express");
const app = express();
const PORT = 8000;

const {logger} = require('./middleware/log.middleware');

// Middlware untuk penerima json express
app.use(express.json());
app.use(logger);

app.listen(PORT, "localhost", () => {
  console.log(`Server berjalan di port ${PORT}`);
});

app.get('/hello' , (request,response) => {
    return response.send('halo dari expressjs')
});

let biodatas = [
    { id: 1, nama: 'Naila'},
    { id: 2, umur: 16},
    { id: 3, alamat: 'Griya husada asri'},
    { id: 4, instagram: '@nftzy'},
    { id: 5, nomor_telepone: '085211583541'},
];

app.get('/biodatas', (request, response) => {
    response.status(200).json(biodatas);
});

app.get('/biodatas/:id',function(request, response) {
    const biodata = biodatas.find((data) => data.id === parseInt(request.params.id));

    if(biodata) {
        response.json(biodata);
    
    } else {
        response.status(400).json({
            pesan: "Data biodata tidak ditemukan",
        });
    }
});

//post : untuk 
app.post('/biodatas', (Request, response) =>{
    const newbiodata = {
        id: biodatas.length + 1,
        ...Request.body
    }

    biodatas.push(newbiodata);

    response.status(200).json(newbiodata);
});

//PUT : update biodata berdasarkan id
app.put('/biodatas/:id', (request, response) =>{
    const biodata = biodatas.find((data) => data.id === parseInt(request.params.id)
);

if(biodata){
    biodata.name = request.body.name;
    biodata.age = request.body.age;

    response.json(biodata);
} else {
    response.status(404).json({
        pesan : "User tidak ditemukan"
    });
}

});

