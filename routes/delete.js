var express = require('express');
var router = express.Router();

const { body,validationResult } = require('express-validator');

const Order = require('../models/order');

router.get('/', function(req, res, next) {
  res.render('delete', { title: 'Удалить бронь'});
});

router.post('/', (req, res, next) =>{
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		res.render('delete', { title: 'Удалить бронь', errors: errors.array()});
		return
	}
	else{
		Order.find({name: req.body.name, tel: req.body.phone}, function(err, docs){
			if(Object.keys(docs).length == 0){
				res.render('delete', {title: 'Удалить бронь', message: `Брони нет. Проверьте введенные данные еще раз.`})
			}
			else{
			Order.remove({
				name: req.body.name,
				tel: req.body.phone
			})
				.then(deleteOrder => {res.render('delete', {title: 'Удалить бронь', message: `Бронь успешно удалена.`})})
				.catch(err => res.send(err));
			}
		})
	}
});


module.exports = router;