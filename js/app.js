// js/app.js

document.addEventListener('DOMContentLoaded', () => {

    //=============== LÓGICA PARA LA CALCULADORA PÁG. 325 ===============//
    const calculatorP325 = document.getElementById('p325-calculator');
    let chartP325 = null; // Variable para mantener la instancia del gráfico

    function calculateP325() {
        if (!calculatorP325) return;
        const k = parseFloat(document.getElementById('costo-capital').value);

        const flowsA = [
            parseFloat(document.getElementById('a-y0').value),
            parseFloat(document.getElementById('a-y1').value),
            parseFloat(document.getElementById('a-y2').value),
            parseFloat(document.getElementById('a-y3').value)
        ];
        const flowsB = [
            parseFloat(document.getElementById('b-y0').value),
            parseFloat(document.getElementById('b-y1').value),
            parseFloat(document.getElementById('b-y2').value),
            parseFloat(document.getElementById('b-y3').value)
        ];
        const flowsBA = flowsB.map((flow, i) => flow - flowsA[i]);

        const calculateMetrics = (flows, rate) => ({
            van: NPV(rate, flows.slice(1)) + flows[0],
            tir: IRR(flows),
            tirm: MIRR(flows, rate, rate)
        });

        const metricsA = calculateMetrics(flowsA, k);
        const metricsB = calculateMetrics(flowsB, k);
        const metricsBA = calculateMetrics(flowsBA, k);

        // Actualizar la tabla
        document.getElementById('ba-y0').textContent = flowsBA[0].toFixed(0);
        document.getElementById('ba-y1').textContent = flowsBA[1].toFixed(0);
        document.getElementById('a-van').textContent = metricsA.van.toFixed(2);
        document.getElementById('a-tir').textContent = `${(metricsA.tir * 100).toFixed(2)}%`;
        document.getElementById('a-tirm').textContent = `${(metricsA.tirm * 100).toFixed(2)}%`;
        document.getElementById('b-van').textContent = metricsB.van.toFixed(2);
        document.getElementById('b-tir').textContent = `${(metricsB.tir * 100).toFixed(2)}%`;
        document.getElementById('b-tirm').textContent = `${(metricsB.tirm * 100).toFixed(2)}%`;
        document.getElementById('ba-van').textContent = metricsBA.van.toFixed(2);
        document.getElementById('ba-tir').textContent = isNaN(metricsBA.tir) ? 'N/A' : `${(metricsBA.tir * 100).toFixed(2)}%`;
        document.getElementById('ba-tirm').textContent = isNaN(metricsBA.tirm) ? 'N/A' : `${(metricsBA.tirm * 100).toFixed(2)}%`;

        // Lógica del Gráfico
        const k_values_p325 = Array.from({ length: 11 }, (_, i) => i * 0.5);
        const vanA_values = k_values_p325.map(rate => NPV(rate, flowsA.slice(1)) + flowsA[0]);
        const vanB_values = k_values_p325.map(rate => NPV(rate, flowsB.slice(1)) + flowsB[0]);

        if (chartP325) chartP325.destroy();
        const ctx = document.getElementById('p325-van-chart').getContext('2d');
        chartP325 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: k_values_p325.map(v => `${(v * 100).toFixed(0)}%`),
                datasets: [{
                    label: 'VAN Proyecto A',
                    data: vanA_values,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }, {
                    label: 'VAN Proyecto B',
                    data: vanB_values,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Perfil de VAN vs. Costo de Capital (Pág. 325)' } },
                scales: {
                    x: { title: { display: true, text: 'Costo de Capital (k)' } },
                    y: { title: { display: true, text: 'Valor Actual Neto (VAN)' } }
                }
            }
        });
    }

    //=============== LÓGICA PARA LA CALCULADORA PÁG. 327 ===============//
    const calculatorP327 = document.getElementById('p327-calculator');
    let chartP327 = null; // Variable para mantener la instancia del gráfico

    function calculateP327() {
        if (!calculatorP327) return;
        const k = parseFloat(document.getElementById('costo-capital').value);

        const a_flows = [
            parseFloat(document.getElementById('p327-a-y0').value),
            parseFloat(document.getElementById('p327-a-y1').value),
            parseFloat(document.getElementById('p327-a-y2').value),
            parseFloat(document.getElementById('p327-a-y3').value)
        ];
        const b_flows = [
            parseFloat(document.getElementById('p327-b-y0').value),
            parseFloat(document.getElementById('p327-b-y1').value),
            parseFloat(document.getElementById('p327-b-y2').value),
            parseFloat(document.getElementById('p327-b-y3').value)
        ];
        const ba_flows = b_flows.map((flow, i) => flow - a_flows[i]);

        const calculateMetrics = (flows, rate) => ({
            van: NPV(rate, flows.slice(1)) + flows[0],
            tir: IRR(flows),
            tirm: MIRR(flows, rate, rate)
        });

        const metricsA = calculateMetrics(a_flows, k);
        const metricsB = calculateMetrics(b_flows, k);
        const metricsBA = calculateMetrics(ba_flows, k);

        // Actualizar la tabla de resultados
        document.getElementById('p327-ba-y0').textContent = ba_flows[0].toFixed(0);
        document.getElementById('p327-ba-y1').textContent = ba_flows[1].toFixed(0);
        // ... (actualizar celdas de van, tir, etc.)
        const updateResultCell = (id, value, isPercentage = false) => {
             const element = document.getElementById(id);
             if(element) element.textContent = isNaN(value) ? 'N/A' : (isPercentage ? `${(value * 100).toFixed(2)}%` : value.toFixed(2));
        };
        updateResultCell('p327-a-van', metricsA.van);
        updateResultCell('p327-a-tir', metricsA.tir, true);
        updateResultCell('p327-a-tirm', metricsA.tirm, true);
        updateResultCell('p327-b-van', metricsB.van);
        updateResultCell('p327-b-tir', metricsB.tir, true);
        updateResultCell('p327-b-tirm', metricsB.tirm, true);
        updateResultCell('p327-ba-van', metricsBA.van);
        updateResultCell('p327-ba-tir', metricsBA.tir, true);
        updateResultCell('p327-ba-tirm', metricsBA.tirm, true);

        // Actualizar la tabla de sensibilidad
        const sensitivityTableBody = document.querySelector('#p327-sensitivity-table tbody');
        sensitivityTableBody.innerHTML = '';
        const k_values_p327 = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50];
        const vanA_values = k_values_p327.map(rate => NPV(rate, a_flows.slice(1)) + a_flows[0]);
        const vanB_values = k_values_p327.map(rate => NPV(rate, b_flows.slice(1)) + b_flows[0]);

        k_values_p327.forEach((rate, i) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${(rate * 100).toFixed(0)}%</td><td class="result">${vanA_values[i].toFixed(2)}</td><td class="result">${vanB_values[i].toFixed(2)}</td>`;
            sensitivityTableBody.appendChild(row);
        });

        // Lógica del Gráfico
        if (chartP327) chartP327.destroy();
        const ctx = document.getElementById('p327-van-chart').getContext('2d');
        chartP327 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: k_values_p327.map(v => `${(v * 100).toFixed(0)}%`),
                datasets: [{
                    label: 'VAN Proyecto A',
                    data: vanA_values,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                }, {
                    label: 'VAN Proyecto B',
                    data: vanB_values,
                    borderColor: 'rgb(255, 159, 64)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Perfil de VAN vs. Costo de Capital (Pág. 327)' } },
                scales: {
                    x: { title: { display: true, text: 'Costo de Capital (k)' } },
                    y: { title: { display: true, text: 'Valor Actual Neto (VAN)' } }
                }
            }
        });
    }

    //=============== EVENT LISTENERS GENERALES ===============//
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            calculateP325();
            calculateP327();
        });
    });

    // Cargar cálculos iniciales
    calculateP325();
    calculateP327();
});