🚗 Parking Center S.A.S. - Sistema de Gestión de Parqueadero

Este es un sistema de escritorio desarrollado en Python utilizando la librería Tkinter para la gestión integral de un parqueadero. El software permite controlar el ingreso, salida y facturación de vehículos mediante una interfaz gráfica moderna, intuitiva y profesional.

El proyecto destaca por su capacidad de procesar cálculos en tiempo real y generar comprobantes físicos en formato de texto.

🚀 Características

✅ Interfaz Gráfica de Usuario (GUI) moderna y responsive.

✅ Registro de ingresos con validación de placas duplicadas.

✅ Soporte para múltiples tipos de vehículos (Moto, Carro, Camioneta).

✅ Cálculo automático de tiempos y tarifas basado en horas reales.

✅ Generación de facturas emergentes y exportación a archivos .txt.

✅ Dashboard en tiempo real con total recaudado y vehículos activos.

✅ Buscador de placas y generación de reportes diarios de ventas.

🛠️ Tecnologías Utilizadas

•  Lenguaje: Python 3.x

•  Interfaz Gráfica: Tkinter (ttk, messagebox, Toplevel)

•  Manejo de Tiempo: Librería datetime para registro exacto de entrada/salida.

•  Matemáticas: Librería math (uso de ceil para redondeo de horas).

•  Persistencia: Manejo de archivos planos para exportación de facturas.


⚙️ Instalación y Ejecución

Al usar librerías nativas de Python, no requiere instalaciones externas:

1️⃣ Instalar la aplicación (Mediante el enlace)


2️⃣ Leer la guía de manual


3️⃣ Ejecutar la aplicación despues de comprender la app


🧾 Funcionalidades del Sistema

🔹 Gestión de Ingresos

Permite registrar vehículos capturando la placa y seleccionando el tipo. El sistema guarda automáticamente la hora y fecha exacta del servidor.

🔹 Cálculo de Tarifas Automático

El sistema aplica cobros según el tipo de vehículo configurado:

•  Moto: $1.000 / hora

•  Carro: $2.000 / hora

•  Camioneta: $2.500 / hora

(El sistema redondea a la hora siguiente para asegurar la rentabilidad del negocio).

🔹 Módulo de Facturación

Al registrar la salida, se despliega una ventana con el resumen del servicio. Incluye la opción de Guardar Factura, la cual genera un archivo de texto con un nombre único basado en la placa y la hora.

🔹 Panel de Control (Dashboard)

Indicadores visuales que muestran permanentemente:

•  Total Recaudado: Suma de todas las ventas del historial.

•  Vehículos Activos: Conteo de autos que están dentro del parqueadero.

🎨 Interfaz Visual (UX/UI)

La aplicación utiliza un esquema de colores profesional y elementos visuales para mejorar la experiencia:

•  Header Corporativo: Título llamativo con colores oscuros.

•  Cards de Formulario: Secciones blancas con sombras para separar el ingreso de la salida.

•  Tabla de Datos (Treeview): Visualización clara de los vehículos que se encuentran en el sitio.

•  Alertas Dinámicas: Ventanas de confirmación para borrar historial o informar errores.
