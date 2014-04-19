/**
*@constructor Создает объект Интегратор
*@param initialN Начальное число разбиений промежутка
*/
function Integrator( initialN ) {
	var objFunc;
	var delta; //погрешность
	var integrIntervalA, integrIntervalB;
	var maxAppropriateN = -Infinity;

	this.getIntegralValue = function() {
		return countIntegralValue();
	}

	/**
	 * Функция для подсчета значения интеграла с учетом требуемой точности по заданному отрезку
	 * @returns {number} Значение интеграла
	 */
	function countIntegralValue() {
		var resultForN = -Infinity,
			resultFor2N = +Infinity;
		var appropriateN; //число разбиений, реализующих заданную точность
		var n = initialN;

		while( Math.abs( resultForN - resultFor2N ) > delta ) {
			resultForN = rectFormula( n );
			resultFor2N = rectFormula( 2*n );

			appropriateN = n;
			n++;
		}

		findMaxAppropriateN( appropriateN );

		return resultForN;
	}

	/**
	 * Функция для вычисления интеграла по заданному разбиению
	 * @param n Разбиение
	 * @returns {number} Значение интеграла от integrIntervalA до integrIntervalB
	 */
	function rectFormula( n ) {
		var h = (integrIntervalB - integrIntervalA) / n;
		var result = 0,
			x,
			prevX = integrIntervalA;

		for( var i = 0; i < n; i++ ) {
			x = prevX + h;
			var middle = ( x + prevX ) / 2;
			result += h * objFunc.getValue( middle );
			prevX = x;
		}

		return result;
	}

	/**
	 * Функция для нахождения максимума из всех минимальных допустимых разбиений
	 * @param n Текущее подходящее разбиение
	 */
	function findMaxAppropriateN( n ) {
		if( n >= maxAppropriateN )
			maxAppropriateN = n;
		return;
	}

	this.getMaxAppropriateN = function() {
		return maxAppropriateN;
	}

	this.setObjFunc = function( f ) {
		objFunc = f;
	};

	this.setDelta = function( d ) {
		delta = d;
	};

	this.setIntegrInterval = function( A, B ) {
		integrIntervalA = A;
		integrIntervalB = B;
	};

	this.setN = function( n ) {
		initialN = n;
	};
}