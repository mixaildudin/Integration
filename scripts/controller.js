function Controller() {

	var integrator = new Integrator(),
		view = new View( getEl('plot') );

	var integrWindow = {};

	var alpha_checked, beta_checked, gamma_checked, delta_checked, eps_checked;
	var alpha_input, beta_input, gamma_input, delta_input, eps_input;

	var fixedParamValues;
	var integralValues;

	this.start = function() {
		var time1 = Date.now();
		integrWindow = {
			'A': +getEl('windowA_input').value,
			'B': +getEl('windowB_input').value,
			'C': +getEl('windowC_input').value,
			'D': +getEl('windowD_input').value
		};

		integrator.setInitialN( +getEl('n_input').value )
		integrator.setIntegrInterval( integrWindow.A, integrWindow.B );
		integrator.setDelta( +getEl('delta_error_input').value );

		fixedParamValues = prepareFixedParamValues();
		retrieveFormParameters();
		fillIntegralValueArray();

		console.log( Date.now() - time1 );

		draw();

		getEl('parameter_of_integr').innerHTML = getFixedParSymbol();
		getEl('max_n').innerHTML = integrator.getMaxAppropriateN();

	}

	/**
	 * Посчитать интегралы при всех значениях фиксированного параметра и загнать значения в массив
	 */
	function fillIntegralValueArray() {
		integralValues = [];
		var timeOverall = 0, time1;
		for( var i = 0; i < fixedParamValues.length; i++ ) {
			time1 = Date.now();
			var objFunc = createObjFunction( fixedParamValues[i] );
			integrator.setObjFunc( objFunc );
			integralValues.push( integrator.getIntegralValue() );
			timeOverall += ( Date.now() - time1 );
		}
		//alert(timeOverall);
	}

	/**
	 * Забрать введенные параметры функции
	 */
	function retrieveFormParameters() {
		alpha_checked = getEl('alpha_fixed').checked,
		beta_checked = getEl('beta_fixed').checked,
		gamma_checked = getEl('gamma_fixed').checked,
		delta_checked = getEl('delta_fixed').checked,
		eps_checked = getEl('eps_fixed').checked;

		alpha_input = getEl('alpha_input').value,
		beta_input = getEl('beta_input').value,
		gamma_input = getEl('gamma_input').value,
		delta_input = getEl('delta_input').value,
		eps_input = getEl('eps_input').value;
	}

	/**
	 * Создать функцию для интегрирования, основываясь на том, какие радиокнопки отмечены на форме
	 * @param fixed Значение фиксированного параметра
	 * @returns {ObjFunc} Функция для интегрирования
	 */
	function createObjFunction( fixed ) {

		var alpha = alpha_checked ? alpha_input : fixed;
		var beta = beta_checked ? beta_input : fixed;
		var gamma = gamma_checked ? gamma_input : fixed;
		var delta = delta_checked ? delta_input : fixed;
		var eps = eps_checked ? eps_input : fixed;

		return new ObjFunc( alpha, beta, gamma, delta, eps );

	}

	function prepareFixedParamValues() {
		var windowA = +getEl('windowA_input').value,
			windowB = +getEl('windowB_input').value;
		var step = (windowB - windowA) / $('#plot').width();
		var result = [];
		for ( var i = windowA; i < windowB ; i += step )
			result.push(i);
		result.push( windowB ); //иначе правая граница может быть не учтена из-за погрешностей

		return result;
	}

	function draw() {
		view.clear();

		var fixedPar = getFixedParSymbol();
		view.addPlot( fixedParamValues, integralValues, 'F(' + fixedPar + ')', '#f00' );
		view.draw( integrWindow );
	}


	/**
	 * Выдать греческое начертание фиксированного параметра
	 * @returns {string}
	 */
	function getFixedParSymbol() {
		if( alpha_checked )
			return 'α';
		else if( beta_checked )
			return 'β';
		else if( gamma_checked )
			return 'γ';
		else if( delta_checked )
			return 'δ';
		else if( eps_checked )
			return 'ε';

		return '';
	}

}