// js/app.js

/**
 * Espera a que el DOM esté completamente cargado para ejecutar el script.
 */
document.addEventListener('DOMContentLoaded', () => {

    //======================================================================
    // =============== CONFIGURACIÓN GLOBAL Y HELPERS =====================
    //======================================================================

    // --- Selectores de elementos globales ---
    const globalKInput = document.getElementById('global-costo-capital');
    const themeSwitcher = document.getElementById('theme-switcher');

    // --- Instancias de gráficos (inicializadas en null) ---
    let chartP325 = null;
    let chartP327 = null;
    let chartP330 = null;
    let chartEjAdic3Tir = null;
    let chartEjAdicFisher = null;

    // --- Función Helper para formatear resultados ---
    const format = (value, type = 'currency') => {
        if (isNaN(value) || !isFinite(value)) return 'N/A';
        if (type === 'percent') {
            return `${(value * 100).toFixed(2)}%`;
        }
        return value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // --- Función Helper para actualizar un gráfico ---
    const updateChart = (chartInstance, canvasId, chartConfig) => {
        if (chartInstance) {
            chartInstance.destroy();
        }
        const ctx = document.getElementById(canvasId).getContext('2d');
        return new Chart(ctx, chartConfig);
    };


    //======================================================================
    // =============== LÓGICA DE LAS CALCULADORAS =========================
    //======================================================================

    /**
     * Calculadora Pág. 325: Proyectos Excluyentes
     */
    function calculateP325() {
        const k = parseFloat(globalKInput.value);
        const flowsA = [
            parseFloat(document.getElementById('p325-a-y0').value),
            parseFloat(document.getElementById('p325-a-y1').value),
            parseFloat(document.getElementById('p325-a-y2').value),
            parseFloat(document.getElementById('p325-a-y3').value)
        ];
        const flowsB = [
            parseFloat(document.getElementById('p325-b-y0').value),
            parseFloat(document.getElementById('p325-b-y1').value),
            parseFloat(document.getElementById('p325-b-y2').value),
            parseFloat(document.getElementById('p325-b-y3').value)
        ];
        const flowsBA = flowsB.map((flow, i) => flow - flowsA[i]);

        // Calcular métricas
        const metricsA = { van: NPV(k, flowsA), tir: IRR(flowsA), tirm: MIRR(flowsA, k, k) };
        const metricsB = { van: NPV(k, flowsB), tir: IRR(flowsB), tirm: MIRR(flowsB, k, k) };
        const metricsBA = { van: NPV(k, flowsBA), tir: IRR(flowsBA), tirm: MIRR(flowsBA, k, k) };

        // Actualizar tabla
        document.getElementById('p325-ba-y0').textContent = format(flowsBA[0]);
        document.getElementById('p325-ba-y1').textContent = format(flowsBA[1]);
        document.getElementById('p325-a-van').textContent = format(metricsA.van);
        document.getElementById('p325-a-tir').textContent = format(metricsA.tir, 'percent');
        document.getElementById('p325-a-tirm').textContent = format(metricsA.tirm, 'percent');
        document.getElementById('p325-b-van').textContent = format(metricsB.van);
        document.getElementById('p325-b-tir').textContent = format(metricsB.tir, 'percent');
        document.getElementById('p325-b-tirm').textContent = format(metricsB.tirm, 'percent');
        document.getElementById('p325-ba-van').textContent = format(metricsBA.van);
        document.getElementById('p325-ba-tir').textContent = format(metricsBA.tir, 'percent');
        document.getElementById('p325-ba-tirm').textContent = format(metricsBA.tirm, 'percent');

        // Actualizar gráfico
        const k_values = Array.from({ length: 11 }, (_, i) => i * 0.5);
        const vanA_values = k_values.map(rate => NPV(rate, flowsA));
        const vanB_values = k_values.map(rate => NPV(rate, flowsB));

        chartP325 = updateChart(chartP325, 'p325-van-chart', {
            type: 'line',
            data: {
                labels: k_values.map(v => format(v, 'percent')),
                datasets: [
                    { label: 'VAN Proyecto A', data: vanA_values, borderColor: 'rgb(75, 192, 192)', tension: 0.1 },
                    { label: 'VAN Proyecto B', data: vanB_values, borderColor: 'rgb(255, 99, 132)', tension: 0.1 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Perfil de VAN vs. Costo de Capital (Pág. 325)' } } }
        });
    }

    /**
     * Calculadora Pág. 327: Proyectos con Diferente Timing
     */
    function calculateP327() {
        const k = parseFloat(globalKInput.value);
        const flowsA = [
            parseFloat(document.getElementById('p327-a-y0').value),
            parseFloat(document.getElementById('p327-a-y1').value),
            parseFloat(document.getElementById('p327-a-y2').value),
            parseFloat(document.getElementById('p327-a-y3').value)
        ];
        const flowsB = [
            parseFloat(document.getElementById('p327-b-y0').value),
            parseFloat(document.getElementById('p327-b-y1').value),
            parseFloat(document.getElementById('p327-b-y2').value),
            parseFloat(document.getElementById('p327-b-y3').value)
        ];
        const flowsBA = flowsB.map((flow, i) => flow - flowsA[i]);

        const metricsA = { van: NPV(k, flowsA), tir: IRR(flowsA), tirm: MIRR(flowsA, k, k) };
        const metricsB = { van: NPV(k, flowsB), tir: IRR(flowsB), tirm: MIRR(flowsB, k, k) };
        const metricsBA = { van: NPV(k, flowsBA), tir: IRR(flowsBA), tirm: MIRR(flowsBA, k, k) };

        // Actualizar tabla principal
        document.getElementById('p327-ba-y0').textContent = format(flowsBA[0]);
        document.getElementById('p327-ba-y1').textContent = format(flowsBA[1]);
        document.getElementById('p327-a-van').textContent = format(metricsA.van);
        document.getElementById('p327-a-tir').textContent = format(metricsA.tir, 'percent');
        document.getElementById('p327-a-tirm').textContent = format(metricsA.tirm, 'percent');
        document.getElementById('p327-b-van').textContent = format(metricsB.van);
        document.getElementById('p327-b-tir').textContent = format(metricsB.tir, 'percent');
        document.getElementById('p327-b-tirm').textContent = format(metricsB.tirm, 'percent');
        document.getElementById('p327-ba-van').textContent = format(metricsBA.van);
        document.getElementById('p327-ba-tir').textContent = format(metricsBA.tir, 'percent');
        document.getElementById('p327-ba-tirm').textContent = format(metricsBA.tirm, 'percent');

        // Actualizar tabla de sensibilidad y gráfico
        const sensitivityTableBody = document.querySelector('#p327-sensitivity-table tbody');
        sensitivityTableBody.innerHTML = '';
        const k_values = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50];
        const vanA_values = k_values.map(rate => NPV(rate, flowsA));
        const vanB_values = k_values.map(rate => NPV(rate, flowsB));

        k_values.forEach((rate, i) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${format(rate, 'percent')}</td><td class="result">${format(vanA_values[i])}</td><td class="result">${format(vanB_values[i])}</td>`;
            sensitivityTableBody.appendChild(row);
        });

        chartP327 = updateChart(chartP327, 'p327-van-chart', {
            type: 'line',
            data: {
                labels: k_values.map(v => format(v, 'percent')),
                datasets: [
                    { label: 'VAN Proyecto A', data: vanA_values, borderColor: 'rgb(54, 162, 235)', tension: 0.1 },
                    { label: 'VAN Proyecto B', data: vanB_values, borderColor: 'rgb(255, 159, 64)', tension: 0.1 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Perfil de VAN vs. Costo de Capital (Pág. 327)' } } }
        });
    }

    /**
     * Calculadora Pág. 330: TIR Múltiples
     */
    function calculateP330() {
        const k = parseFloat(document.getElementById('p330-costo-capital').value);
        const guess = parseFloat(document.getElementById('p330-tir-guess').value);

        const projects = ['e', 'f', 'g'];
        const projectData = {};

        projects.forEach(p => {
            const flows = [
                parseFloat(document.getElementById(`p330-${p}-y0`).value),
                parseFloat(document.getElementById(`p330-${p}-y1`).value),
                parseFloat(document.getElementById(`p330-${p}-y2`).value)
            ];
            projectData[p] = {
                flows: flows,
                van: NPV(k, flows),
                tir: IRR(flows, guess)
            };
            document.getElementById(`p330-${p}-van`).textContent = format(projectData[p].van);
            document.getElementById(`p330-${p}-tir`).textContent = format(projectData[p].tir, 'percent');
        });

        // Gráfico para el proyecto E (el más representativo)
        const k_values = Array.from({ length: 41 }, (_, i) => i * 0.1);
        const vanE_values = k_values.map(rate => NPV(rate, projectData['e'].flows));
        
        chartP330 = updateChart(chartP330, 'p330-van-chart', {
            type: 'line',
            data: {
                labels: k_values.map(v => format(v, 'percent')),
                datasets: [{ label: 'VAN Proyecto E', data: vanE_values, borderColor: 'rgb(153, 102, 255)', tension: 0.1 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Perfil de VAN Proyecto E (Pág. 330)' } },
                scales: { y: { beginAtZero: false } }
            }
        });
    }

    /**
     * Calculadora Pág. 336: Cadena de Reemplazos
     */
    function calculateP336() {
        const k = parseFloat(document.getElementById('p336-costo-capital').value);
        const flowsA = [
            parseFloat(document.getElementById('p336-a-y0').value),
            parseFloat(document.getElementById('p336-a-y1').value),
            parseFloat(document.getElementById('p336-a-y2').value),
            parseFloat(document.getElementById('p336-a-y3').value),
            parseFloat(document.getElementById('p336-a-y4').value)
        ];
        const flowsB_base = [
            parseFloat(document.getElementById('p336-b-y0').value),
            parseFloat(document.getElementById('p336-b-y1').value),
            parseFloat(document.getElementById('p336-b-y2').value)
        ];
        
        // Calcular métricas base
        const vanA = NPV(k, flowsA);
        const tirA = IRR(flowsA);
        const vanB = NPV(k, flowsB_base);
        const tirB = IRR(flowsB_base);

        document.getElementById('p336-a-van').textContent = format(vanA);
        document.getElementById('p336-a-tir').textContent = format(tirA, 'percent');
        document.getElementById('p336-b-van').textContent = format(vanB);
        document.getElementById('p336-b-tir').textContent = format(tirB, 'percent');

        // Flujo con reemplazo de B
        const flowsB_rep = [
            flowsB_base[0],
            flowsB_base[1],
            flowsB_base[2] + flowsB_base[0], // Flujo año 2 + reinversión
            flowsB_base[1],
            flowsB_base[2]
        ];
        const vanB_rep = NPV(k, flowsB_rep);
        const tirB_rep = IRR(flowsB_rep);

        document.getElementById('p336-brep-y0').textContent = format(flowsB_rep[0]);
        document.getElementById('p336-brep-y1').textContent = format(flowsB_rep[1]);
        document.getElementById('p336-brep-y2').textContent = format(flowsB_rep[2]);
        document.getElementById('p336-brep-y3').textContent = format(flowsB_rep[3]);
        document.getElementById('p336-brep-y4').textContent = format(flowsB_rep[4]);
        document.getElementById('p336-brep-van').textContent = format(vanB_rep);
        document.getElementById('p336-brep-tir').textContent = format(tirB_rep, 'percent');

        // Anualidad Equivalente (AE)
        const aeA = PMT(k, 4, -vanA);
        const aeB = PMT(k, 2, -vanB);
        document.getElementById('p336-a-ae').textContent = format(aeA);
        document.getElementById('p336-b-ae').textContent = format(aeB);

        // Decisión
        document.getElementById('p336-ae-decision').textContent = aeA > aeB ? 'Proyecto A' : 'Proyecto B';
        document.getElementById('p336-a-van-rep').textContent = format(vanA);
        document.getElementById('p336-brep-van-rep').textContent = format(vanB_rep);
        document.getElementById('p336-van-decision').textContent = vanA > vanB_rep ? 'Proyecto A' : 'Proyecto B';
    }

    /**
     * Calculadora Pág. 343: Solver de Tarifas
     */
    function calculateP343_Solver() {
        const investment = parseFloat(document.getElementById('p343-inversion').value);
        const annualCost = parseFloat(document.getElementById('p343-costo-op').value);
        const years = parseInt(document.getElementById('p343-anios').value);
        const taxRate = parseFloat(document.getElementById('p343-impuesto').value);
        const targetTIR = parseFloat(document.getElementById('p343-tir-objetivo').value);

        const annualDepreciation = -investment / years;

        // Función objetivo: calcula la TIR para una tarifa dada
        const getTIRForTariff = (tariff) => {
            const flows = [investment];
            for (let i = 0; i < years; i++) {
                const ebit = tariff - annualCost - annualDepreciation;
                const taxes = ebit > 0 ? ebit * taxRate : 0;
                const fcf = ebit - taxes + annualDepreciation;
                flows.push(fcf);
            }
            return IRR(flows);
        };

        // Solver (Bisection Method)
        let lowTariff = 0;
        let highTariff = -investment; // Un límite superior razonable
        let optimalTariff = NaN;

        for (let i = 0; i < 100; i++) {
            let midTariff = (lowTariff + highTariff) / 2;
            let currentTIR = getTIRForTariff(midTariff);

            if (Math.abs(currentTIR - targetTIR) < 1e-6) {
                optimalTariff = midTariff;
                break;
            }
            if (currentTIR > targetTIR) {
                highTariff = midTariff;
            } else {
                lowTariff = midTariff;
            }
        }

        // Actualizar UI con el resultado
        document.getElementById('p343-resultado-tarifa').textContent = format(optimalTariff);

        // Generar y mostrar la tabla de FCF
        const table = document.getElementById('p343-fcf-table');
        const thead = table.querySelector('thead tr');
        const tbody = table.querySelector('tbody');
        thead.innerHTML = '<th>Concepto</th>';
        tbody.innerHTML = '';
        
        for (let i = 0; i <= years; i++) {
            if (i > 0) thead.innerHTML += `<th>Año ${i}</th>`;
        }

        const rows = {
            'Ingresos': new Array(years).fill(optimalTariff),
            '(-) Costos Op.': new Array(years).fill(-annualCost),
            '(-) Depreciación': new Array(years).fill(-annualDepreciation),
            '(=) Res. antes Imp.': [],
            '(-) Impuestos': [],
            '(=) Res. después Imp.': [],
            '(+) Depreciación': new Array(years).fill(annualDepreciation),
            '(=) Flujo de Caja Libre': []
        };
        
        const finalFlows = [investment];
        for(let i=0; i<years; i++) {
            const ebit = rows['Ingresos'][i] + rows['(-) Costos Op.'][i] + rows['(-) Depreciación'][i];
            rows['(=) Res. antes Imp.'].push(ebit);
            const tax = ebit > 0 ? -(ebit * taxRate) : 0;
            rows['(-) Impuestos'].push(tax);
            const eat = ebit + tax;
            rows['(=) Res. después Imp.'].push(eat);
            const fcf = eat + rows['(+) Depreciación'][i];
            rows['(=) Flujo de Caja Libre'].push(fcf);
            finalFlows.push(fcf);
        }
        
        for (const [key, value] of Object.entries(rows)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><strong>${key}</strong></td>`;
            value.forEach(v => tr.innerHTML += `<td class="result">${format(v)}</td>`);
            tbody.appendChild(tr);
        }

        document.getElementById('p343-tir-verificada').textContent = format(IRR(finalFlows), 'percent');
    }

    /**
     * Calculadora Ejercicio Adicional: 3 TIR
     */
    function calculateEjAdic3TIR() {
        const k = parseFloat(document.getElementById('ej-adic-3tir-k').value);
        const finRate = parseFloat(document.getElementById('ej-adic-3tir-fin').value);
        const reRate = parseFloat(document.getElementById('ej-adic-3tir-re').value);
        const flows = [
            parseFloat(document.getElementById('ej-adic-3tir-y0').value),
            parseFloat(document.getElementById('ej-adic-3tir-y1').value),
            parseFloat(document.getElementById('ej-adic-3tir-y2').value),
            parseFloat(document.getElementById('ej-adic-3tir-y3').value),
            parseFloat(document.getElementById('ej-adic-3tir-y4').value),
            parseFloat(document.getElementById('ej-adic-3tir-y5').value),
            parseFloat(document.getElementById('ej-adic-3tir-y6').value)
        ];
        
        // Calcular métricas
        document.getElementById('ej-adic-3tir-van').textContent = format(NPV(k, flows));
        document.getElementById('ej-adic-3tir-tirm').textContent = format(MIRR(flows, finRate, reRate), 'percent');
        document.getElementById('ej-adic-3tir-tir1').textContent = format(IRR(flows, 0.1), 'percent');
        document.getElementById('ej-adic-3tir-tir2').textContent = format(IRR(flows, 0.4), 'percent');
        document.getElementById('ej-adic-3tir-tir3').textContent = format(IRR(flows, 0.6), 'percent');

        // Gráfico
        const k_values = Array.from({ length: 11 }, (_, i) => i * 0.1);
        const van_values = k_values.map(rate => NPV(rate, flows));
        chartEjAdic3Tir = updateChart(chartEjAdic3Tir, 'ej-adic-3tir-chart', {
            type: 'line',
            data: {
                labels: k_values.map(v => format(v, 'percent')),
                datasets: [{ label: 'VAN del Proyecto', data: van_values, borderColor: 'rgb(255, 206, 86)', tension: 0.1 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Perfil de VAN no convencional' } } }
        });
    }

    /**
     * Calculadora Ejercicio Adicional: 2 Tasas de Fisher
     */
    function calculateEjAdicFisher() {
        const k = parseFloat(document.getElementById('ej-adic-fisher-k').value);
        const flowsA = [
            parseFloat(document.getElementById('ej-adic-fisher-a-y0').value),
            parseFloat(document.getElementById('ej-adic-fisher-a-y1').value),
            parseFloat(document.getElementById('ej-adic-fisher-a-y2').value)
        ];
        const flowsB = [
            parseFloat(document.getElementById('ej-adic-fisher-b-y0').value),
            parseFloat(document.getElementById('ej-adic-fisher-b-y1').value),
            parseFloat(document.getElementById('ej-adic-fisher-b-y2').value)
        ];
        const flowsBA = flowsB.map((flow, i) => flow - flowsA[i]);

        // Calcular y mostrar métricas
        const metrics = (flows, rate) => ({
            van: NPV(rate, flows), tir: IRR(flows), tirm: MIRR(flows, rate, rate)
        });
        const metricsA = metrics(flowsA, k);
        const metricsB = metrics(flowsB, k);

        document.getElementById('ej-adic-fisher-a-van').textContent = format(metricsA.van);
        document.getElementById('ej-adic-fisher-a-tir').textContent = format(metricsA.tir, 'percent');
        document.getElementById('ej-adic-fisher-a-tirm').textContent = format(metricsA.tirm, 'percent');
        document.getElementById('ej-adic-fisher-b-van').textContent = format(metricsB.van);
        document.getElementById('ej-adic-fisher-b-tir').textContent = format(metricsB.tir, 'percent');
        document.getElementById('ej-adic-fisher-b-tirm').textContent = format(metricsB.tirm, 'percent');
        
        document.getElementById('ej-adic-fisher-ba-y0').textContent = format(flowsBA[0]);
        document.getElementById('ej-adic-fisher-ba-y1').textContent = format(flowsBA[1]);
        document.getElementById('ej-adic-fisher-ba-y2').textContent = format(flowsBA[2]);
        document.getElementById('ej-adic-fisher-ba-van').textContent = format(NPV(k, flowsBA));
        const tirBA1 = IRR(flowsBA, 0.01);
        const tirBA2 = IRR(flowsBA, 0.3);
        document.getElementById('ej-adic-fisher-ba-tir').textContent = `TIR 1: ${format(tirBA1, 'percent')} / TIR 2: ${format(tirBA2, 'percent')}`;

        // Gráfico del flujo incremental
        const k_values = Array.from({ length: 13 }, (_, i) => i * 0.05); // De 0% a 60%
        const van_values = k_values.map(rate => NPV(rate, flowsBA));
        chartEjAdicFisher = updateChart(chartEjAdicFisher, 'ej-adic-fisher-chart', {
            type: 'line',
            data: {
                labels: k_values.map(v => format(v, 'percent')),
                datasets: [{ label: 'VAN del Flujo Incremental (B - A)', data: van_values, borderColor: 'rgb(75, 192, 192)', tension: 0.1 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Perfil de VAN Incremental (2 Tasas de Fisher)' } } }
        });
    }


    //======================================================================
    // =================== EVENT LISTENERS Y EJECUCIÓN ====================
    //======================================================================
    
    /**
     * Función principal que recalcula todo.
     */
    function recalculateAll() {
        calculateP325();
        calculateP327();
        calculateP330();
        calculateP336();
        calculateEjAdic3TIR();
        calculateEjAdicFisher();
        // Nota: El solver P343 solo se activa con su botón.
    }

    // --- Listener para el cambio de tema ---
    themeSwitcher.addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.target.value);
    });

    // --- Listener para todos los inputs que deben recalcular todo ---
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        // Excluimos el botón del solver de la recalculación automática
        if (input.type !== 'button' && !input.closest('#p343-solver')) {
             input.addEventListener('input', recalculateAll);
        }
    });
    
    // --- Listener específico para el botón del Solver ---
    document.getElementById('p343-calcular-btn').addEventListener('click', calculateP343_Solver);

    // --- Ejecución inicial ---
    recalculateAll();
    // Ejecutar solver una vez al inicio para poblar la tabla
    calculateP343_Solver();

});
