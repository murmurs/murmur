//This function is used to validate that our JSON objects 
//do not contain any HTML tags or anything that can possibly
//be used to propagate a XSS attack
//Our thinking here is that it is always good to be doubly protected
//data on the client side is always a must but just in case
//always santize the data before it entires our database
exports.sanitizeJSON = function(jsonInput){
	return jsonInput
			.replace(/</g, '')
			.replace(/>/g, '')
			.replace(/&/g, '')
			.replace(/"/g, '')
			.replace(/'/g, '');

}