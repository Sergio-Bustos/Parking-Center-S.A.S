<div align="center">

# 🚗 Parking Center S.A.S.

**Sistema de Gestión de Parqueadero — Aplicación de Escritorio**

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Tkinter](https://img.shields.io/badge/Tkinter-GUI-FF6B35?style=for-the-badge&logo=python&logoColor=white)](https://docs.python.org/3/library/tkinter.html)
[![Datetime](https://img.shields.io/badge/datetime-Nativo-4CAF50?style=for-the-badge&logo=python&logoColor=white)](https://docs.python.org/3/library/datetime.html)
[![Desktop](https://img.shields.io/badge/Escritorio-.EXE_Standalone-9C27B0?style=for-the-badge&logo=windows&logoColor=white)]()
[![License](https://img.shields.io/badge/Licencia-Privada-red?style=for-the-badge)]()

> Sistema de escritorio desarrollado en **Python + Tkinter** para la gestión integral de un parqueadero.  
> Controla ingreso, salida y facturación de vehículos con cálculos en **tiempo real** y generación de comprobantes físicos.

🌐 **[Sitio web oficial](https://parking-center-s-a-s.vercel.app/)** &nbsp;|&nbsp; 💻 **[Repositorio](https://github.com/Sergio-Bustos/Parking-Center-S.A.S)**

</div>

---

## ✨ Características principales

| Función | Descripción |
|---------|-------------|
| 🖥️ **Interfaz moderna** | GUI profesional y responsive construida con Tkinter/ttk |
| 🚘 **Registro de ingresos** | Captura de placa con validación de duplicados en tiempo real |
| 🏍️ **Multi-vehículo** | Soporte para Moto, Carro y Camioneta con tarifas diferenciadas |
| ⏱️ **Cálculo automático** | Tiempo y tarifa calculados según horas reales de permanencia |
| 🧾 **Facturación** | Comprobante emergente y exportación a archivo `.txt` con nombre único |
| 📊 **Dashboard en vivo** | Total recaudado y vehículos activos actualizados constantemente |
| 🔍 **Buscador de placas** | Localización rápida de cualquier vehículo registrado |
| 📋 **Reportes diarios** | Generación de reporte de ventas del día |

---

## 💰 Tarifas del sistema

| Tipo de vehículo | Tarifa por hora |
|-----------------|----------------|
| 🏍️ Moto | $ 1.000 |
| 🚗 Carro | $ 2.000 |
| 🚙 Camioneta | $ 2.500 |

> ⏰ El sistema redondea **hacia arriba** a la hora siguiente (`math.ceil`) para garantizar la rentabilidad del negocio.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Tipo | Uso |
|------------|------|-----|
| Python 3.x | Lenguaje | Lógica principal del sistema |
| Tkinter + ttk | Librería nativa | Interfaz gráfica — ventanas, formularios, tabla |
| `datetime` | Librería nativa | Registro exacto de fecha y hora de entrada/salida |
| `math.ceil` | Librería nativa | Redondeo de horas para cálculo de tarifas |
| Archivos `.txt` | Persistencia | Exportación y guardado de facturas generadas |
| PyInstaller | Empaquetado | Compilación del proyecto a ejecutable `.exe` standalone |

> ✅ **Distribuido como `.exe` standalone** — el ejecutable ya incluye Python y todas las librerías.  
> El usuario final **no necesita instalar Python ni ninguna dependencia**.

---

## 🧾 Módulos del sistema

### 🔹 Gestión de Ingresos
Registra vehículos capturando la **placa** y seleccionando el **tipo**. El sistema guarda automáticamente la hora y fecha exacta del servidor. Valida que no existan placas duplicadas activas.

### 🔹 Cálculo de Tarifas
Al registrar la salida, calcula el tiempo transcurrido y aplica la tarifa correspondiente según el tipo de vehículo. Las fracciones de hora se redondean a la hora completa siguiente.

### 🔹 Módulo de Facturación
Genera una ventana emergente con el resumen completo del servicio (placa, tipo, hora entrada, hora salida, tiempo y total). Permite **guardar la factura** como archivo `.txt` con nombre único basado en la placa y la hora.

### 🔹 Panel de Control — Dashboard
Indicadores visuales actualizados en tiempo real:
- 💵 **Total Recaudado** — suma acumulada de todas las ventas del historial
- 🚘 **Vehículos Activos** — conteo de autos que se encuentran dentro del parqueadero

### 🔹 Buscador y Reportes
- Búsqueda instantánea de vehículos por placa
- Generación de reporte diario de ventas en formato de texto

---

## 🎨 Diseño de la interfaz (UX/UI)

| Elemento | Descripción |
|----------|-------------|
| 🏢 **Header corporativo** | Título con colores oscuros de imagen institucional |
| 🃏 **Cards de formulario** | Secciones blancas con sombra para separar ingreso y salida |
| 📋 **Tabla Treeview** | Visualización clara de todos los vehículos activos en el parqueadero |
| ⚠️ **Alertas dinámicas** | Ventanas de confirmación para borrar historial o informar errores |

---

## 🚀 Instalación y ejecución

La aplicación está distribuida como un ejecutable **standalone para Windows**.  
No requiere instalar Python, pip ni ninguna dependencia adicional.

### Pasos

```
1. Visita el sitio web oficial y descarga el instalador
2. Lee la guía de usuario antes de ejecutar la aplicación
3. Ejecuta Parking Center.exe con doble clic
```

🌐 **Sitio oficial con descarga y manual:** [parking-center-s-a-s.vercel.app](https://parking-center-s-a-s.vercel.app/)

> ✅ Compatible con **Windows 10 / 11**  
> ❌ No requiere Python instalado  
> ❌ No requiere conexión a internet para funcionar

---

## 📁 Estructura del proyecto

```
Parking-Center-S.A.S/
│
├── Parking Center.exe   # ← Ejecutable standalone — este es el archivo a usar
├── parking.py           # Código fuente original en Python
├── README.md            # Documentación del proyecto
│
└── facturas/            # Generada automáticamente al guardar facturas
    └── PLACA_HORA.txt   # Comprobante individual por cada vehículo atendido
```

---


<div align="center">
  Hecho con 🐍 para <strong>Parking Center S.A.S.</strong> · 2025
</div>
