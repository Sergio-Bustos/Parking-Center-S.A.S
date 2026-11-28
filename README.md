<div align="center">

<img src="main/dist/image-removebg-preview%20(1).png" width="220" alt="Parking Center S.A.S.">

# Parking Center S.A.S.

**El parqueadero sin papeles, sin calculadora y sin discusiones.**
Registra la entrada, registra la salida y el programa cobra por ti.

[![Sitio web](https://img.shields.io/badge/🌐_Sitio_oficial-Descargar_y_manual-07080d?style=for-the-badge)](https://parking-center-s-a-s.vercel.app/)

[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Tkinter](https://img.shields.io/badge/Tkinter-Interfaz_de_escritorio-FF6B35?style=flat-square)](https://docs.python.org/3/library/tkinter.html)
[![Windows](https://img.shields.io/badge/Windows-.exe_listo_para_usar-0078D6?style=flat-square&logo=windows&logoColor=white)]()
[![Sin internet](https://img.shields.io/badge/Funciona-sin_internet-4CAF50?style=flat-square)]()

</div>

---

## 🅿️ ¿Qué hace, en palabras simples?

Imagina que llega un carro al parqueadero. Anotas la placa, eliges si es moto, carro o camioneta, y listo. Cuando se va, escribes la placa otra vez y el programa:

1. calcula **cuánto tiempo estuvo**,
2. calcula **cuánto debe pagar**,
3. te muestra la **factura** lista para guardar.

Sin cuentas, sin instalar nada raro y sin conexión a internet.

---

## ✨ Funciones

| | Función | Qué significa para ti |
|---|---|---|
| 🚘 | **Registro de entradas** | Anota placa y tipo de vehículo. La hora de ingreso se guarda sola. |
| 🛡️ | **Sin placas repetidas** | Si intentas registrar una placa que ya está dentro, el programa te avisa. |
| 🏍️ | **Tres tipos de vehículo** | Moto, carro y camioneta, cada uno con su tarifa. |
| ⏱️ | **Cobro automático** | Calcula el tiempo real y el total a pagar. |
| 🧾 | **Facturas** | Muestra el comprobante y permite guardarlo como archivo de texto (`.txt`). |
| 🔍 | **Buscador de placas** | Encuentra un vehículo y consulta su hora de entrada. |
| 📊 | **Panel en vivo** | Vehículos dentro del parqueadero y total recaudado, siempre actualizados. |
| 📋 | **Reporte del día** | Cuántos vehículos se atendieron y cuánto se recaudó. |

---

## 💰 Tarifas

| Vehículo | Valor por hora |
|---|---|
| 🏍️ Moto | $1.000 |
| 🚗 Carro | $2.000 |
| 🚙 Camioneta | $2.500 |

> ⏰ **Se cobra por hora iniciada.** 1 hora y 5 minutos se cobran como 2 horas.

---

## 📥 Cómo usarlo (usuarios)

1. Entra al **[sitio oficial](https://parking-center-s-a-s.vercel.app/)**.
2. Descarga el programa (`ParkingCenter.exe`) y, si quieres, el **manual de usuario**.
3. Haz doble clic sobre el archivo para abrirlo.

✅ Funciona en **Windows 10 y 11** · ✅ **No necesitas instalar Python** · ✅ **No necesita internet**

> Si Windows muestra un aviso de seguridad al abrirlo por primera vez, es normal en programas nuevos que no están firmados digitalmente.

### El día a día en tres pasos

| Paso | Qué haces |
|---|---|
| **1. Llega un vehículo** | Escribe la placa, elige el tipo y registra el ingreso. |
| **2. Se va el vehículo** | Escribe la placa en la zona de salida y registra la salida. |
| **3. Cobras** | Se abre la factura con el total. Puedes guardarla con **Guardar Factura**. |

---

## 🧑‍💻 Para desarrolladores

### Ejecutar desde el código fuente

Solo necesitas **Python 3** con Tkinter (viene incluido en la instalación estándar de Python en Windows y macOS; en algunas distribuciones de Linux se instala aparte como `python3-tk`). No hay dependencias externas.

```bash
git clone https://github.com/Sergio-Bustos/Parking-Center-S.A.S
cd Parking-Center-S.A.S
python main/main.py
```

### Generar el `.exe` (opcional)

```bash
pip install pyinstaller
pyinstaller --onefile --windowed --name ParkingCenter main/main.py
```

### Cómo está hecho

Todo vive en una sola clase, `ParkingApp`, dentro de `main/main.py`:

| Método | Responsabilidad |
|---|---|
| `crear_layout()` | Construye la interfaz (encabezado, formularios, tabla y panel) |
| `registrar_ingreso()` | Valida la placa, evita duplicados y guarda la hora |
| `registrar_salida()` | Calcula horas (`math.ceil`) y total, y genera la factura |
| `mostrar_factura()` / `guardar_factura_txt()` | Ventana de factura y exportación a `Factura_<placa>_<HHMMSS>.txt` |
| `buscar_vehiculo()` | Busca una placa entre los vehículos activos |
| `reporte_dia()` | Resumen de vehículos atendidos y total recaudado |
| `vaciar_historial()` | Borra el historial tras pedir confirmación |
| `actualizar_tabla()` | Refresca la tabla y los indicadores |

Los datos se manejan con estructuras simples en memoria: una lista de vehículos activos `(placa, tipo, hora_entrada)`, una lista de facturas (diccionarios) y un diccionario de tarifas, fácil de editar.

### Estructura del repositorio

```
Parking-Center-S.A.S/
├── main/
│   ├── main.py              # La aplicación de escritorio
│   └── dist/                # Lo que se publica
│       ├── ParkingCenter.exe
│       ├── Manual_ParkingCenter.pdf
│       └── index.html ...   # Sitio web con descarga y manual (estilos, scripts, sonidos)
└── README.md
```

---

## ⚠️ Limitaciones actuales

Ser transparente ayuda a saber qué esperar:

- Los vehículos y el historial **viven en la memoria del programa**: si lo cierras, se pierden. Las facturas guardadas en `.txt` sí permanecen.
- Es una aplicación para **un solo equipo** (sin sincronización entre computadores).

**Ideas para una próxima versión:** guardar los datos en una base local (SQLite), editar tarifas desde la interfaz, exportar reportes a Excel e imprimir facturas.

---

<div align="center">

Hecho con 🐍 por **[Sergio Bustos](https://github.com/Sergio-Bustos)** para **Parking Center S.A.S.** · 2026

</div>
