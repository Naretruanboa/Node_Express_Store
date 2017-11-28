var express = require('express');
var mysql = require('mysql');
var bodyPaser = require('body-parser');


// ฟังค์ชัน สำหรับรับ request จาก client และส่ง response กลับไปยัง client
// req คือ request และ res คือ response
// res.send('') คือการส่ง response กลับไป

var data = express();
var urlencodePs = bodyPaser.urlencoded({extended: false})


var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "store"
});
// start server ด้วย port 3000
data.listen(3000,function () {
    console.log('status: port 3000');
});

// เมื่อ client เข้าถึงหน้า Home Page ของเว็บไซต์ http://localhost:3000/
// data.get(URL, /index)
// URL - คือ PATH ของเว็บไซต์
// getHomePage คือ callback function ที่มี request และ response

data.get('/index',function (req,res) {
    res.send("Hello Store");

});
// call ฟังค์ชัน getProduct เมื่อ client เข้าถึงหน้าเว็บ /getProduct
data.get('/getStore',function (req,res) {
    var sql = "SELECT * FROM product";
    con.query(sql,function (err,result) {
        var tmp = JSON.stringify(result)
        res.send(tmp)
    });
});

data.post('/postStore',urlencodePs,function (req,res) {
    var sql = "INSERT INTO product(id,name_id,name,price) VALUE('"+
        req.body.id+"','"+req.body.name_id+"','"+req.body.name+"','"+req.body.price+"')";
    res.send(sql);
    con.query(sql,function (err) {
        if(err){
            console.log("NO INSERT");
        }else {
            console.log("INSERT OK");
        }

    });
});

data.put('/updateStore',urlencodePs,function (req,res) {
    var sql = "UPDATE product set name = '"+req.body.name+"', price = '"+req.body.price+"' WHERE name_id = '"+req.body.name_id+"' ";
    con.query(sql,function (err) {
        if(err){
            console.log("NO UPDATE");
        }else {
            console.log("UPDATE OK");
        }
    });
});


data.delete('/deleteStore',urlencodePs,function (req) {
    var sql = "DELETE FROM product WHERE id='"+req.body.id+"'";
    con.query(sql,function (err) {
        if(err){
            console.log("NO DELETE");
        }else {
            console.log("DELETE OK");
        }
    });

});





