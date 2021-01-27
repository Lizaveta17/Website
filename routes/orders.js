var express = require('express');
var router = express.Router();

const { body,validationResult } = require('express-validator');

const Order = require('../models/order');

router.get('/', function(req, res, next) {
  res.render('orders', { title: 'Заказать столик'});
});

router.post('/', (req, res, next) =>{
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		res.render('orders', { title: 'Заказать столик', errors: errors.array()});
		return
	}
	else{
		Order.find({table: req.body.table}, function(err, docs){
			if(!Object.keys(docs).length == 0){
				res.render('orders', {title: 'Заказать столик', error: `Стол №${req.body.table} уже забронирован`})
			}
			else{
				Order.create({
					name: req.body.name,
					lastname: req.body.lastname,
					tel: req.body.phone,
					date: req.body.date,
					table: req.body.table
				})
				.then(orders => {res.render('orders', {title: 'Заказать столик', 
					success: `Стол №${req.body.table} успешно забронирован`})})
				.catch(err => res.send(err));
			}
		})
		
	}
});


module.exports = router;