# ==========================================================
# IMPORTACIÓN DE LIBRERÍAS
# ==========================================================

import tkinter as tk                 # Librería principal para crear interfaces gráficas
from tkinter import ttk, messagebox  # ttk = widgets modernos / messagebox = ventanas emergentes
from datetime import datetime        # Permite trabajar con fechas y horas reales
import math                          # Permite usar funciones matemáticas como ceil()


# ==========================================================
# CLASE PRINCIPAL DEL SISTEMA
# ==========================================================

class ParkingApp:
    """
    Clase que contiene toda la lógica del sistema de parqueadero.
    Maneja:
    - Interfaz gráfica
    - Registro de vehículos
    - Facturación
    - Reportes
    - Actualización visual
    """

    # ------------------------------------------------------
    # CONSTRUCTOR
    # ------------------------------------------------------

    def __init__(self, root):

        self.root = root  # Guardamos la ventana principal

        # Configuración básica de la ventana principal
        self.root.title("Parking Center S.A.S.")     # Título de la ventana
        self.root.geometry("1000x650")               # Tamaño fijo
        self.root.configure(bg="#f4f6f9")            # Color de fondo general
        self.root.resizable(False, False)            # Evita que el usuario cambie el tamaño

        # ==================================================
        # ESTRUCTURAS DE DATOS
        # ==================================================

        self.vehiculos = []  
        # Lista que almacena vehículos activos
        # Cada elemento será una tupla: (placa, tipo, hora_entrada)

        self.historial = []  
        # Lista que almacena facturas generadas
        # Cada elemento será un diccionario con datos completos de facturación

        self.tarifas = {
            "Moto": 1000,
            "Carro": 2000,
            "Camioneta": 2500
        }
        # Diccionario que define el valor por hora según tipo

        # Llamamos al método que construye toda la interfaz
        self.crear_layout()


    # ==================================================
    # CREACIÓN DEL DISEÑO (LAYOUT)
    # ==================================================

    def crear_layout(self):

        # --------------------------------------------------
        # HEADER SUPERIOR
        # --------------------------------------------------

        header = tk.Label(
            self.root,                     # Ventana donde se coloca
            text="🚗 PARKING CENTER S.A.S.", # Texto visible
            bg="#2c3e50",                   # Fondo oscuro corporativo
            fg="white",                     # Texto blanco
            font=("Segoe UI", 22, "bold"),  # Fuente grande y negrilla
            pady=15                         # Espacio vertical interno
        )
        header.pack(fill="x")               # Se expande horizontalmente

        # --------------------------------------------------
        # CONTENEDOR PRINCIPAL
        # --------------------------------------------------

        main_container = tk.Frame(self.root, bg="#f4f6f9")
        main_container.pack(fill="both", expand=True, padx=20, pady=20)

        # ==================================================
        # PANEL IZQUIERDO (FORMULARIOS)
        # ==================================================

        left_panel = tk.Frame(main_container, bg="#f4f6f9")
        left_panel.pack(side="left", fill="y", padx=10)

        # --------------------------------------------------
        # CARD REGISTRAR INGRESO
        # --------------------------------------------------

        card_ingreso = tk.Frame(left_panel, bg="white",
                                highlightbackground="#ddd",
                                highlightthickness=1)
        card_ingreso.pack(pady=10, ipadx=15, ipady=15)

        tk.Label(card_ingreso, text="Registrar Ingreso",
                 font=("Segoe UI", 12, "bold"),
                 bg="white").pack(pady=5)

        tk.Label(card_ingreso, text="Placa:", bg="white").pack()
        self.entry_placa = ttk.Entry(card_ingreso, width=25)
        self.entry_placa.pack(pady=5)

        tk.Label(card_ingreso, text="Tipo:", bg="white").pack()
        self.combo_tipo = ttk.Combobox(
            card_ingreso,
            values=["Moto", "Carro", "Camioneta"],
            state="readonly",
            width=22
        )
        self.combo_tipo.pack(pady=5)
        self.combo_tipo.current(1)  # Selecciona "Carro" por defecto

        ttk.Button(card_ingreso,
                   text="Registrar Ingreso",
                   command=self.registrar_ingreso).pack(pady=10)

        # --------------------------------------------------
        # CARD REGISTRAR SALIDA
        # --------------------------------------------------

        card_salida = tk.Frame(left_panel, bg="white",
                               highlightbackground="#ddd",
                               highlightthickness=1)
        card_salida.pack(pady=10, ipadx=15, ipady=15)

        tk.Label(card_salida, text="Registrar Salida",
                 font=("Segoe UI", 12, "bold"),
                 bg="white").pack(pady=5)

        tk.Label(card_salida, text="Placa:", bg="white").pack()
        self.entry_salida = ttk.Entry(card_salida, width=25)
        self.entry_salida.pack(pady=5)

        ttk.Button(card_salida,
                   text="Registrar Salida",
                   command=self.registrar_salida).pack(pady=10)

        # ==================================================
        # PANEL DERECHO (DASHBOARD + TABLA)
        # ==================================================

        right_panel = tk.Frame(main_container, bg="#f4f6f9")
        right_panel.pack(side="right", fill="both", expand=True)

        dashboard = tk.Frame(right_panel, bg="#f4f6f9")
        dashboard.pack(fill="x", pady=10)

        # Indicador de total recaudado
        self.lbl_total = tk.Label(
            dashboard,
            text="Total Recaudado: $0",
            bg="#27ae60",
            fg="white",
            font=("Segoe UI", 12, "bold"),
            padx=20,
            pady=10
        )
        self.lbl_total.pack(side="left", padx=10)

        # Indicador de vehículos activos
        self.lbl_activos = tk.Label(
            dashboard,
            text="Vehículos Activos: 0",
            bg="#2980b9",
            fg="white",
            font=("Segoe UI", 12, "bold"),
            padx=20,
            pady=10
        )
        self.lbl_activos.pack(side="left", padx=10)

        # Botones secundarios
        ttk.Button(dashboard,
                   text="Reporte del Día",
                   command=self.reporte_dia).pack(side="right", padx=10)

        ttk.Button(dashboard,
                   text="Buscar Placa",
                   command=self.buscar_vehiculo).pack(side="right", padx=10)

        ttk.Button(dashboard,
                   text="Vaciar Historial",
                   command=self.vaciar_historial).pack(side="right", padx=10)

        # --------------------------------------------------
        # TABLA DE VEHÍCULOS ACTIVOS
        # --------------------------------------------------

        tabla_frame = tk.Frame(right_panel, bg="white",
                               highlightbackground="#ddd",
                               highlightthickness=1)
        tabla_frame.pack(fill="both", expand=True)

        self.tabla = ttk.Treeview(
            tabla_frame,
            columns=("Placa", "Tipo", "Hora"),
            show="headings"
        )

        self.tabla.heading("Placa", text="Placa")
        self.tabla.heading("Tipo", text="Tipo")
        self.tabla.heading("Hora", text="Hora Entrada")

        self.tabla.pack(fill="both", expand=True)


    # ==================================================
    # REGISTRAR INGRESO
    # ==================================================

    def registrar_ingreso(self):

        placa = self.entry_placa.get().strip().upper()
        tipo = self.combo_tipo.get()

        if not placa:
            messagebox.showerror("Error", "Debe ingresar una placa.")
            return

        # Verifica que no exista duplicado
        for v in self.vehiculos:
            if v[0] == placa:
                messagebox.showerror("Error", "La placa ya está registrada.")
                return

        hora = datetime.now()  # Hora exacta actual

        self.vehiculos.append((placa, tipo, hora))  # Guarda en lista

        self.entry_placa.delete(0, tk.END)  # Limpia campo

        self.actualizar_tabla()  # Refresca interfaz


    # ==================================================
    # REGISTRAR SALIDA + FACTURACIÓN
    # ==================================================

    def registrar_salida(self):

        placa = self.entry_salida.get().strip().upper()

        for i, v in enumerate(self.vehiculos):

            if v[0] == placa:

                hora_salida = datetime.now()
                duracion = hora_salida - v[2]

                horas = math.ceil(duracion.total_seconds() / 3600)

                tarifa = self.tarifas[v[1]]
                total = horas * tarifa

                factura = {
                    "placa": v[0],
                    "tipo": v[1],
                    "hora_entrada": v[2],
                    "hora_salida": hora_salida,
                    "horas": horas,
                    "tarifa": tarifa,
                    "total": total
                }

                self.historial.append(factura)
                self.vehiculos.pop(i)

                self.mostrar_factura(factura)

                self.entry_salida.delete(0, tk.END)
                self.actualizar_tabla()
                return

        messagebox.showerror("Error", "Placa no encontrada.")


    # ==================================================
    # MOSTRAR FACTURA
    # ==================================================

    def mostrar_factura(self, factura):

        ventana = tk.Toplevel(self.root)
        ventana.title("Factura")
        ventana.geometry("400x420")
        ventana.configure(bg="white")

        tk.Label(ventana,
                 text="🧾 FACTURA PARKING CENTER",
                 font=("Segoe UI", 14, "bold"),
                 bg="white").pack(pady=10)

        texto = f"""
Placa: {factura['placa']}
Tipo: {factura['tipo']}

Hora Entrada: {factura['hora_entrada'].strftime('%H:%M:%S')}
Hora Salida: {factura['hora_salida'].strftime('%H:%M:%S')}

Horas Cobradas: {factura['horas']}
Tarifa por Hora: ${factura['tarifa']}

TOTAL: ${factura['total']}
"""

        tk.Label(ventana,
                 text=texto,
                 bg="white",
                 justify="left",
                 font=("Segoe UI", 11)).pack(pady=10)

        ttk.Button(ventana,
                   text="Guardar Factura",
                   command=lambda: self.guardar_factura_txt(factura)
                   ).pack(pady=5)

        ttk.Button(ventana,
                   text="Cerrar",
                   command=ventana.destroy).pack(pady=5)


    # ==================================================
    # GUARDAR FACTURA EN TXT
    # ==================================================

    def guardar_factura_txt(self, factura):

        nombre = f"Factura_{factura['placa']}_{factura['hora_salida'].strftime('%H%M%S')}.txt"

        with open(nombre, "w", encoding="utf-8") as archivo:
            archivo.write("PARKING CENTER S.A.S.\n")
            archivo.write("----------------------------\n")
            for key, value in factura.items():
                archivo.write(f"{key}: {value}\n")

        messagebox.showinfo("Guardado",
                            f"Factura guardada como {nombre}")


    # ==================================================
    # REPORTE DEL DÍA
    # ==================================================

    def reporte_dia(self):

        total = sum(f["total"] for f in self.historial)
        cantidad = len(self.historial)

        messagebox.showinfo(
            "Reporte del Día",
            f"Vehículos atendidos: {cantidad}\nTotal recaudado: ${total}"
        )


    # ==================================================
    # BUSCAR VEHÍCULO
    # ==================================================

    def buscar_vehiculo(self):

        placa = self.entry_salida.get().strip().upper()

        for v in self.vehiculos:
            if v[0] == placa:
                messagebox.showinfo(
                    "Vehículo Encontrado",
                    f"Placa: {v[0]}\nTipo: {v[1]}\nHora Entrada: {v[2].strftime('%H:%M:%S')}"
                )
                return

        messagebox.showerror("Error", "Vehículo no encontrado.")


    # ==================================================
    # VACIAR HISTORIAL
    # ==================================================

    def vaciar_historial(self):

        confirm = messagebox.askyesno("Confirmar",
                                      "¿Seguro que deseas borrar el historial?")

        if confirm:
            self.historial.clear()
            self.actualizar_tabla()


    # ==================================================
    # ACTUALIZAR TABLA Y DASHBOARD
    # ==================================================

    def actualizar_tabla(self):

        for fila in self.tabla.get_children():
            self.tabla.delete(fila)

        for v in self.vehiculos:
            self.tabla.insert("",
                              tk.END,
                              values=(v[0], v[1], v[2].strftime("%H:%M:%S")))

        total = sum(f["total"] for f in self.historial)

        self.lbl_total.config(text=f"Total Recaudado: ${total}")
        self.lbl_activos.config(text=f"Vehículos Activos: {len(self.vehiculos)}")


# ==================================================
# EJECUCIÓN PRINCIPAL
# ==================================================

if __name__ == "__main__":
    root = tk.Tk()
    app = ParkingApp(root)
    root.mainloop()
