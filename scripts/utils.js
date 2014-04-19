function isNumber( n ) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function sqr( n ) {
	return n*n;
}

function getEl( id ) {
	return document.getElementById( id );
}