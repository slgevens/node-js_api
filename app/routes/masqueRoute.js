var mysql = require('mysql');

module.exports = function(router, connection) {
    router.route('/masque')
	.get(function(req, res){
	    var query = "SELECT * FROM ?? WHERE ?? LIKE '%MASQUE_%' AND ?? = ?";
	    var table = ['photo_expresso.settings', 'ID_TYPE', 'STATUS', '0'];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400);
		}
		else {
		    res.send(result);
		}
	    });
	});
}
	     
