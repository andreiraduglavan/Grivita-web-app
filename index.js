const express=require('express')
const path=require("path");
const fs=require("fs");
const sharp=require("sharp");
const {Client}=require('pg');

const app=express(); //obiectul server

const client=new Client({
    host: 'localhost',
    user: 'andrei',
    password: 'andrei',
    database: 'proiecttw',
    port:5432
});

client.connect()

app.set("view engine", "ejs"); 
app.use(express.static(path.join(__dirname, "resurse")));

function verificareImagini() {
    var textFisier=fs.readFileSync("resurse/json/galerie.json");
    var jsi=JSON.parse(textFisier);
    var caleGalerie=jsi.cale_galerie;
    vectImagini=[];
    for(let im of jsi.imagini){
        var imVeche=caleGalerie+'/'+im.fisier;
        var ext=path.extname(im.fisier);
        var numeFisier=path.basename(im.fisier,ext);
        let imNoua=caleGalerie+"/mic/"+ numeFisier+"-mic"+".webp";
        let imMedie=caleGalerie+"/medie/"+ numeFisier+"-medie"+".jpg";
        vectImagini.push({mare:imVeche, mic:imNoua, medie:imMedie, descriere:im.descriere, anotimp:im.anotimp});
        if(!fs.existsSync(imNoua)) {
            sharp(imVeche)
                .resize(150)
                .toFile(imNoua, function(err) {
                    if(err)
                        console.log("eroare conversie");
                });
        }
        if(!fs.existsSync(imMedie)) {
            sharp(imVeche)
                .resize(400)
                .toFile(imMedie, function(err) {
                    if(err)
                        console.log("eroare conversie");
                });
        }
    }
    return vectImagini;
}

function anotimpCurent() {
    var today=new Date();
    var month=today.getMonth()+1;
    if(month>=3&&month<=5)
        return 'primavara';
    else if(month>=6&&month<=8)
        return 'vara';
    else if(month>=9&&month<=11)
        return 'toamna';
    else
        return 'iarna';  
}

app.get("/", function(req, res){

    res.render("pagini/index");
});

app.get("/index", function(req, res){
    res.render("pagini/index");
});

app.get("/ali", function(req, res){
    res.render("pagini/ali");
});

app.get("/istorie", function(req, res){
    res.render("pagini/istorie");
});

app.get("/echipa", function(req, res){
    var conditie=req.query.categ ? " and compartiment='"+req.query.categ+"'" : ''
    const rezultat=client.query('select * from jucatori where 1=1'+conditie, function(err,rez){
    
        res.render("pagini/echipa", {echipa:rez.rows})
    })
})

app.get("/echipa/:id_jucator", function(req, res){
    const rezultat=client.query('select * from jucatori where id='+req.params.id_jucator, function(err,rez){
        
        res.render("pagini/jucator", {jucator:rez.rows[0]})
    })
})

app.get("/galerie", function(req, res){
    res.render("pagini/galerie", {imagini:verificareImagini(), anotimpCurent:anotimpCurent()});
});

app.get("/*", function(req, res){
    res.render("pagini"+res.url, function(err,rezultatRandare){
        if(err){
            if(err.message.includes("Failed to lookup view")){
                res.status(404).render("pagini/404.ejs")
            }
            else
                throw err;
        }
        else{
            res.send(rezultatRandare)
        }
    });
});

verificareImagini();

app.listen(8080);
console.log("Am pornit");