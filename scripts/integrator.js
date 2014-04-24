/**
*@constructor Создает объект Интегратор
*/
function Integrator() {
	var objFunc;
	var delta; //погрешность
	var initialN = 1;
	var integrIntervalA, integrIntervalB;
	var maxAppropriateN;

	this.getIntegralValue = function() {
		maxAppropriateN = initialN;
		return countIntegralValue();
	};

	/**
	 * Функция для подсчета значения интеграла с учетом требуемой точности по заданному отрезку
	 * @returns {number} Значение интеграла
	 */
	function countIntegralValue() {
		var MAX_COUNTED_INTEGRALS = 500;

		var resultForN = -Infinity,
			resultFor2N = +Infinity;
		var appropriateN; //число разбиений, реализующих заданную точность
		var n = maxAppropriateN;
		
		/** Жесть для оптимизации */
		var countedIntegrals = new Array( MAX_COUNTED_INTEGRALS ),
			offset = maxAppropriateN;			
		for( var i = 0; i < countedIntegrals.length; i++ )
			countedIntegrals[i] = null;
		/**/
		
		while( Math.abs( resultForN - resultFor2N ) > delta ) {
			if( countedIntegrals[ n - offset ] != null )
				resultForN = countedIntegrals[ n - offset ];
			else
				resultForN = rectFormula( n );
				
			resultFor2N = rectFormula( 2*n );
			countedIntegrals[ 2*n - offset] = resultFor2N;

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
			result += h * objFunc.getValue( (x + prevX)/2 );
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

	this.setInitialN = function( n ) {
		initialN = n;
	};
}