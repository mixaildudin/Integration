/**
 * Функция для интегрирования
 */

function ObjFunc( alpha, beta, gamma, delta, eps ) {

    this.getValue = function( x ) {
        var cos = ( alpha*alpha == x*x ) ? 0.5 : Math.cos(beta * x / (alpha*alpha - x*x));
        return delta * cos + eps*Math.sin( gamma * x );
    }
}