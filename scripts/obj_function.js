/**
 * Функция для интегрирования
 */

function ObjFunc( alpha, beta, gamma, delta, eps ) {
    this.alpha = alpha;
    this.beta = beta;
    this.gamma = gamma;
    this.delta = delta;
    this.eps = eps;

    this.getValue = function( x ) {
        var cos = ( this.alpha*this.alpha == x*x ) ? 0.5 : Math.cos(this.beta * x / (this.alpha*this.alpha - x*x));
        return (this.delta) * cos + (this.eps)*Math.sin( this.gamma * x );
    }
}