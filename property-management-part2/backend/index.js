require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors())
mongoose.connect("mongodb+srv://test:Test%40123@cluster0.mlwfwgs.mongodb.net/properties?retryWrites=true&w=majority");

const propertySchema = new mongoose.Schema({
    name:String,
    description:String,
    size:String
 });
 const property = mongoose.model('property', propertySchema);

 app.route('/properties')
 .get((req, res) => {
   property.find(function(err,foundProperties){
       if(!err){
           //console.log(foundProperties);
           res.send(foundProperties);
       }
       else {
           console.log(err);
       }
    });
 })
 .post((req, res) => {
    // console.log(req.body);
   let propertyname=req.body.name;
   let propertydescription=req.body.description;
   let propertysize=req.body.size;
 //  console.log(propertyname+propertydescription);
   const property1=new property({
       name:propertyname,
       description:propertydescription,
       size:propertysize
   });
   property1.save(function(err){
       if(!err){
        console.log("added succesfully");
           res.send("succesfully added the property");
       }
       else {
           res.send(err);
       }
   });
 });



app.delete("/property/:propertyid", function(req,res){
    //console.log("************************************************")
   // console.log(req.body);
    let propertyid =req.params.propertyid;
   // console.log(propertyid);
    property.deleteOne({_id:propertyid}, function(err,foundnote){
        if(!err){
            console.log("deleted succesfully");
            res.send("deletedone");
        }
        else {
            console.log(err);
            res.send(err);
        }
    });
})


let port = process.env.PORT;
 if (port == null || port == "") {
   port = 5000;
 }
app.listen(port,function(){
    console.log("server is started and running at port 5000");
});