var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/commandes/:id?')
        .post(function(req, res){
	    var decodeIdUser = jwtDecode(req.headers.authorization).ID_USER;
	    var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES ('?', ?, ?, ?, ?, ?, ?, ?, ?)";
	    var table = ['photo_expresso.command', 'ID_USER', 'NOMBRE_PHOTO', 'PRICE', 'CONTENT', 'STATUS', 'COMMAND_FILES',
			 'ID_MASQUE', 'ID_PAPER', 'CODE_PROMO', decodeIdUser, req.body.nbr_photo, req.body.price, req.body.content,
			 '0', req.body.files, req.body.id_masque, req.body.id_paper, req.body.code_promo ];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    var selectIdUser = jwtDecode(req.headers.authorization).ID_USER;
		    var querySelect = "SELECT ?? FROM ?? WHERE ?? = ? ORDER BY ?? DESC LIMIT 1";
		    var tableSelect = ['ID_COMMAND' ,'photo_expresso.command', 'ID_USER', selectIdUser, 'ID_COMMAND'];

		    querySelect = mysql.format(querySelect, tableSelect);
		    connection.query(querySelect, function(err, resultSelect){
			if (err) {
			    res.status(400).send(err);
			}
			else {
			    var queryDestination = "INSERT INTO ?? (??, ??, ??,??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			    var tableDestination = ['photo_expresso.command_destination', 'ID_COMMAND', 'FIRSTNAME',
						    'LASTNAME', 'ADDR_L1', 'ADDR_L2', 'POSTAL_CODE', 'CITY',
						    'COMPLEMENT', resultSelect[0].ID_COMMAND, req.body.firstname, req.body.lastname,
						    req.body.addr_l1, req.body.add_l2, req.body.postal_code,
						    req.body.city, req.body.complement];
			    queryDestination = mysql.format(queryDestination, tableDestination);
			    connection.query(queryDestination, function(err, resultDestination){
				if (err)
				    res.status(400).send(err);
				else
				    res.status(200);
			    })
			}
		    });
		    res.status(201).send("Order created !")
		}
	    });
	})
    
        .get(function(req, res){
	    var iDUserDecode = jwtDecode(req.headers.authorization).ID_USER;
	    var query = "SELECT * FROM ?? WHERE ?? = ?";
	    var table = ['photo_expresso.view_command_detail', 'ID_USER', iDUserDecode ];
	    
	    query = mysql.format(query, table)
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.send(result);
		}
	    });
	})
    
};
