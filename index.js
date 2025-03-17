const express = require('express');
const app = express();
const path = require('path');
const fs= require('fs');
const { error } = require('console');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index.ejs",{files:files});
    }) 
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        if(err) throw error;
        res.render('show',{filename:req.params.filename,filedata:filedata});
    })
})

app.get(`/edit/:filename`,(req,res)=>{
    res.render('edit',{filename:req.params.filename});
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        if(err) throw err;
        else{
            console.log('File Created');
            res.redirect('/');
        }
        
    })
})

app.post('/edit',(req,res)=>{
        fs.rename(`./files/${req.body.previousTitle}`,`./files/${req.body.newTitle}`,(err)=>{
               res.redirect('/');
        })
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})