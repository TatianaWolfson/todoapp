import express from 'express';
import mongoose from 'mongoose';

export function api(app:express.Application, Model:any, url:string) {

  app.get(url, (req, res) => {
    var filter = Model.filter || {};
    Model.find(filter, (err, items) => {
      if (err) {
        res.send(err);
      } else
        res.json(items);
    });
  });

  app.post(url, (req, res) => {
    var newArticle = new Model(req.body);
    newArticle.save((err, data)=> {
      if (!err) {
        return res.send(data);
      } else {
        console.log(err);
        if (err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({error: 'Validation error'});
        } else {
          res.statusCode = 500;
          res.send({error: 'Server error'});
        }
        console.log('Internal error(%d): %s', res.statusCode, err.message);
      }
    });
  });
}
