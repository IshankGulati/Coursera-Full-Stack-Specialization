var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(function(req, res, next){
    Dishes.find({}, function(err, dish){
        if (err) throw err;
        res.json(dish);
    });
})

.post(function(req, res, next){
    Dishes.create(req.body, function(err, dish){
        if (err) throw err;
        console.log('Dish Created!');

        var id = dish._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the d')
    });
})

.delete(function(req, res, next){
        res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishRouter;
