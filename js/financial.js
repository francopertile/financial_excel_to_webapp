// js/financial.js

/**
 * Calcula el Valor Presente Neto (NPV) de una serie de flujos de caja.
 * Replica la función NPV de Excel, que descuenta los valores a partir del primer flujo.
 * La inversión inicial (año 0) debe sumarse por separado.
 * @param {number} rate La tasa de descuento por período.
 * @param {number[]} values Array de flujos de caja (a partir del año 1).
 * @returns {number} El valor presente neto.
 */
function NPV(rate, values) {
    let npv = 0;
    for (let i = 0; i < values.length; i++) {
        npv += values[i] / Math.pow(1 + rate, i + 1);
    }
    return npv;
}

/**
 * Calcula la Tasa Interna de Retorno (IRR) para una serie de flujos de caja.
 * Utiliza el método de Newton-Raphson para encontrar la tasa que hace el NPV=0.
 * @param {number[]} values Array de flujos de caja (incluyendo la inversión inicial).
 * @param {number} [guess=0.1] Una estimación inicial para la tasa.
 * @returns {number} La tasa interna de retorno.
 */
function IRR(values, guess = 0.1) {
    const MAX_ITERATIONS = 100;
    const PRECISION = 1e-7;

    let rate = guess;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        let npv = 0;
        let dnpv = 0; // Derivada del NPV
        for (let j = 0; j < values.length; j++) {
            npv += values[j] / Math.pow(1 + rate, j);
            dnpv -= j * values[j] / Math.pow(1 + rate, j + 1);
        }

        if (Math.abs(npv) < PRECISION) {
            return rate;
        }

        if (dnpv === 0) {
            // Evitar división por cero
            return NaN;
        }
        
        rate = rate - npv / dnpv;
    }
    // Si no converge, devuelve NaN (Not a Number)
    return NaN;
}


/**
 * Calcula la Tasa Interna de Retorno Modificada (MIRR).
 * @param {number[]} values Array de flujos de caja.
 * @param {number} financeRate La tasa de interés para financiar los flujos negativos.
 * @param {number} reinvestRate La tasa a la que se reinvierten los flujos positivos.
 * @returns {number} La tasa interna de retorno modificada.
 */
function MIRR(values, financeRate, reinvestRate) {
    const n = values.length - 1;
    let negativeFlowsPV = 0;
    let positiveFlowsFV = 0;

    // Inversión inicial
    negativeFlowsPV += values[0];

    // Resto de los flujos
    for (let i = 1; i < values.length; i++) {
        if (values[i] > 0) {
            positiveFlowsFV += values[i] * Math.pow(1 + reinvestRate, n - i);
        } else if (values[i] < 0) {
            negativeFlowsPV += values[i] / Math.pow(1 + financeRate, i);
        }
    }
    
    // Para evitar errores matemáticos, nos aseguramos de que el PV sea negativo
    negativeFlowsPV = -negativeFlowsPV;

    if (negativeFlowsPV <= 0 || positiveFlowsFV <= 0) {
        return NaN; // No se puede calcular
    }

    return Math.pow(positiveFlowsFV / negativeFlowsPV, 1 / n) - 1;
}