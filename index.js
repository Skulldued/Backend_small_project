const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        // console.log(files);
        res.render("index",{filesany:files});
    })
   
});

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(error)=>{
        res.redirect("/");
    });
   
})

app.get("/edit/:filename",(req,res)=>{
    const filename = req.params.filename;
    res.render("edit",{filename:filename});
});

app.post("/edit",(req,res)=>{
    console.log(req.body.previous);
    console.log(req.body.new);
   fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(error)=>{
    console.log(error.stack);
    res.redirect("/");
   })
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf8",(error,filedata)=>{
         res.render('show',{filename:req.params.filename , filedata:filedata});
    })
})
app.listen(3000);