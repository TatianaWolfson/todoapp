import * as express from 'express';
import * as mongoose from 'mongoose';

export function api(app: express.Application, Model: any, url: string) {

  app.get(url, (req, res) => {
    var filter = Model.filter || {};
    Model.find(filter, (err, items) => {
      if (err) {
        console.log('api1');
        res.send(err);
      } else
        console.log('api2');
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

  app.delete(url + ':id', (req, res) => {
    Model.remove({
      _id: req.params.id
    }, (err) => {
      if (err) {
        res.send(err);
      }
      res.send({status: 'OK'});
    });
  });

  app.put(url, (req, res)=> {
    Model.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, result) => {
      if (err) return console.error(err);
      res.send(result);
    });
  });
}
