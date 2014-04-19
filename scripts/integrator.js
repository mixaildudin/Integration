/**
*@constructor Создает объект Интегратор
*@param initialN Начальное число разбиений промежутка
*/
function Integrator( initialN ) {
	var objFunc;
	var delta; //погрешность
	var intervalA, intervalB;
	var n = initialN, h;
	var maxN = -Infinity;
	
	/**
	* Функция для подсчета значения интеграла
	* @returns Значение интеграла
	*/
	this.getValue = function() {				
		var resultWithN = -Infinity,
			resultWith2N = +Infinity;
			
		while( Math.abs( resultWithN - resultWith2N ) > delta ) {
			var h1 = (intervalB - intervalA) / n,
				h2 = (intervalB - intervalA) / (2*n);
			
			resultWithN = rectFormula( n );
			resultWith2N = rectFormula( 2*n );
			
			console.log("result:\t" + resultWithN + "\t" + resultWith2N);
			
			n++;
		}
		
		console.log(n-1);
		console.log("result:\t" + resultWithN + "\t" + resultWith2N);
		return resultWithN;
	}
	
	function rectFormula( num ) {
		var h = (intervalB - intervalA) / num;
		var result = 0,
			x, 
			prevX = intervalA;
			
		for( var i = 0; i < num; i++ ) {
			x = prevX + h;
			var middle = ( x + prevX ) / 2;
			result += h * objFunc.getValue( middle );
			prevX = x;
		}
		
		return result;
	}
	
	this.setObjFunc = function( f ) {
		objFunc = f;
	};
	
	this.setDelta = function( d ) {
		delta = d;
	};
	
	this.setIntgrInterval = function( A, B ) {
		intervalA = A;
		intervalB = B;
	};
	
	this.setN = function( _n ) {
		n = _n;
	};
}