# 📊 Calculadora de Evaluación de Proyectos

Una herramienta web interactiva diseñada para la evaluación financiera de proyectos de inversión, basada en los principios de cálculo del Valor Presente Neto (VPN), la Tasa Interna de Retorno (TIR) y la Tasa Interna de Retorno Modificada (TIRM). Este proyecto replica la lógica de ejemplos de cálculo encontrados en páginas como la 325 y 327 de un material de estudio financiero, facilitando la comprensión y experimentación con conceptos clave como proyectos mutuamente excluyentes y análisis de sensibilidad del VPN.

## 🌟 Características

* **Cálculo Dinámico de Métricas Financieras:** Calcula automáticamente el VAN, TIR y TIRM para proyectos individuales y para flujos de caja incrementales.
* **Análisis de Proyectos Mutuamente Excluyentes (Pág. 325):** Permite comparar dos proyectos con diferentes tamaños de inversión inicial, calculando sus métricas y los flujos incrementales para una toma de decisiones informada.
* **Análisis de Proyectos con Diferente Desarrollo Temporal (Pág. 327):** Facilita la comparación de proyectos con patrones de flujo de caja distintos a lo largo del tiempo, incluyendo una tabla de sensibilidad y la visualización de la Tasa de Fisher.
* **Perfiles de VAN Interactivos:** Genera gráficos de perfiles de VAN en tiempo real, mostrando cómo el Valor Actual Neto de cada proyecto varía con diferentes costos de capital.
* **Interfaz de Usuario Intuitiva:** Interfaz sencilla que permite modificar los flujos de caja y el costo de capital para observar los resultados instantáneamente.
* **Fórmulas Detalladas:** Incluye una sección con las descripciones de las fórmulas financieras utilizadas para mayor claridad y referencia.

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

.
├── index.html          # Estructura principal de la aplicación.

├── css/

│   └── style.css       # Estilos personalizados para la aplicación.

└── js/

├── app.js          # Lógica principal de la aplicación, manejo de eventos y actualización de UI.

└── financial.js    # Implementación de las funciones de cálculo financiero (NPV, IRR, MIRR).


## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna sugerencia para mejorar la calculadora, añadir nuevas funcionalidades o corregir errores, no dudes en abrir un "issue" o enviar un "pull request".

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` (si aplica, no incluido en los archivos proporcionados) para más detalles.

---

Made with ❤️ by Franco Pertile
