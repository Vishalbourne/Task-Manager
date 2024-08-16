const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs")
app.use(express.json());
app.use(express.urlencoded({extend:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


app.get("/",function(req,res){
    fs.readdir("./files",function(err,files){
        res.render("index",{files:files});
    })
})

app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        res.render("show",{filename: req.params.filename,filedata: data});

    })
})

app.get("/edit/:id",function(req,res){
    res.render("edit",{filename:req.params.id});
})

app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.detail,function(err){
        res.redirect("/") 
    })
})

app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/")
    })
})

app.listen(3000);







// app.get("/profile/:id",function(req,res){
//     res.send(`hi, I am ${req.params.id}`)
// })