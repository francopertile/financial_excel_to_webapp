# 📊 Calculadora de Evaluación de Proyectos

Una completa suite de herramientas web interactivas para la evaluación financiera de proyectos de inversión. Este proyecto abarca desde cálculos fundamentales como el Valor Actual Neto (VAN) y la Tasa Interna de Retorno (TIR), hasta escenarios complejos como el análisis de cadenas de reemplazo, la búsqueda de TIRs múltiples y la simulación de la funcionalidad "Solver" para problemas de búsqueda de objetivos. Es una herramienta educativa y práctica diseñada para experimentar y comprender a fondo la matemática financiera.

## 🌟 Características

* **Métricas Fundamentales:** Cálculo dinámico de VAN, TIR, y TIRM para cualquier serie de flujos de caja.
* **Análisis Avanzado de la TIR:**
    * Resolución de proyectos con **TIR Múltiples** a través de una estimación inicial variable.
    * Cálculo de la **Tasa de Fisher** para determinar el punto de indiferencia entre proyectos, incluyendo casos con dos tasas de Fisher.
* **Comparación de Proyectos de Diferente Duración:**
    * Análisis automatizado por **Cadena de Reemplazos** para igualar la vida útil de los proyectos.
    * Cálculo de la **Anualidad Equivalente (AE)** como criterio de decisión clave.
* **Simulación de "Solver" para Búsqueda de Objetivos:** Incluye una herramienta para determinar la tarifa o ingreso anual necesario para alcanzar una TIR objetivo específica, mostrando el flujo de caja completo resultante.
* **Visualización de Datos Interactiva:** Generación de gráficos de perfiles de VAN en tiempo real para analizar visualmente la sensibilidad de los proyectos al costo de capital, incluyendo perfiles no convencionales.
* **Interfaz de Usuario Mejorada:**
    * Controles globales para ajustar el costo de capital en todas las calculadoras simultáneamente.
    * Selector de tema (claro/oscuro) para mayor comodidad visual.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura de la página web.
* **CSS3:** Estilos personalizados y responsividad, utilizando [Pico.css](https://picocss.com/) como framework CSS ligero para un diseño minimalista y elegante.
* **JavaScript (ES6+):** Lógica de cálculo financiero y manipulación del DOM para la interactividad.
* **Chart.js:** Biblioteca para la creación de gráficos dinámicos y visualización de datos.

## 🚀 Cómo Ejecutar el Proyecto

Este proyecto es una aplicación web estática y no requiere de un servidor backend. Para ejecutarlo localmente:

1.  **Clona el repositorio** (o descarga los archivos `index.html`, `js/financial.js`, `js/app.js`, y `css/style.css` en una carpeta).
2.  **Abre el archivo `index.html`** directamente en tu navegador web preferido.

¡Y listo! Podrás empezar a interactuar con la calculadora.

## 📂 Estructura del Proyecto

├── index.html          # Estructura principal de la aplicación.

├── css/

│   └── style.css       # Estilos personalizados para la aplicación.

└── js/

├── app.js          # Lógica principal, manejo de eventos y orquestación de todas las calculadoras.

└── financial.js    # Librería con funciones de cálculo (NPV, IRR, MIRR, PMT).


## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna sugerencia para mejorar la calculadora, añadir nuevas funcionalidades o corregir errores, no dudes en abrir un "issue" o enviar un "pull request".

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` (si aplica, no incluido en los archivos proporcionados) para más detalles.

---

Made with ❤️ by Franco Pertile
