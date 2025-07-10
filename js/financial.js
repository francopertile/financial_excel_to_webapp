// js/financial.js

/**
 * Calcula el Valor Presente Neto (NPV) de una serie de flujos de caja.
 * A diferencia de la función de Excel, esta calcula el NPV para el flujo completo,
 * incluyendo el valor en el período 0.
 * @param {number} rate La tasa de descuento por período.
 * @param {number[]} values Array de flujos de caja (comenzando desde el año 0).
 * @returns {number} El valor presente neto.
 */
function NPV(rate, values) {
    let npv = 0;
    for (let i = 0; i < values.length; i++) {
        npv += values[i] / Math.pow(1 + rate, i);
    }
    return npv;
}

/**
 * Calcula la Tasa Interna de Retorno (IRR) para una serie de flujos de caja.
 * Utiliza el método de Newton-Raphson para encontrar la tasa que hace el NPV=0.
 * @param {number[]} values Array de flujos de caja (incluyendo la inversión inicial).
 * @param {number} [guess=0.1] Una estimación inicial para la tasa.
 * @returns {number} La tasa interna de retorno o NaN si no converge.
 */
function IRR(values, guess = 0.1) {
    const MAX_ITERATIONS = 100;
    const PRECISION = 1e-7;

    let rate = guess;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const npvValue = NPV(rate, values);

        if (Math.abs(npvValue) < PRECISION) {
            return rate;
        }

        // Calcular la derivada del NPV para el método de Newton-Raphson
        let derivative = 0;
        for (let j = 1; j < values.length; j++) {
            derivative -= j * values[j] / Math.pow(1 + rate, j + 1);
        }
        
        if (Math.abs(derivative) < PRECISION) {
            return NaN; // Evitar división por cero si la derivada es muy pequeña
        }

        rate = rate - npvValue / derivative;
    }
    // Si no converge después de las iteraciones
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

    values.forEach((value, i) => {
        if (value > 0) {
            positiveFlowsFV += value * Math.pow(1 + reinvestRate, n - i);
        } else {
            negativeFlowsPV += value / Math.pow(1 + financeRate, i);
        }
    });
    
    negativeFlowsPV = -negativeFlowsPV;

    if (negativeFlowsPV <= 0 || positiveFlowsFV <= 0 || n === 0) {
        return NaN; // No se puede calcular
    }

    return Math.pow(positiveFlowsFV / negativeFlowsPV, 1 / n) - 1;
}

/**
 * Calcula el pago periódico para una anualidad (Anualidad Equivalente).
 * Replica la función PMT (PAGO) de Excel.
 * @param {number} rate La tasa de interés por período.
 * @param {number} nper El número total de períodos de pago.
 * @param {number} pv El valor presente (o valor actual).
 * @param {number} [fv=0] El valor futuro.
 * @param {number} [type=0] Cuándo se realizan los pagos (0=final del período, 1=inicio).
 * @returns {number} El pago periódico.
 */
function PMT(rate, nper, pv, fv = 0, type = 0) {
    if (rate === 0) {
        return -(pv + fv) / nper;
    }
    
    const pvif = Math.pow(1 + rate, nper);
    let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type === 1) { // Si el pago es al inicio del período
        pmt /= (1 + rate);
    }

    return pmt;
}
