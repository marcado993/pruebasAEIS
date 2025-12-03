# AEIS Mainframe - Sistema de Gestión de Casilleros

```
> SYSTEM_BOOT_SEQUENCE_INIT...
> DETECTING_HARDWARE... [AEIS_CORE]
> LOADING_COLOR_PROFILE: [DEEP_NAVY_#0A192F] + [CIRCUIT_GREEN_#00FF9D]
> ACCESS_LEVEL: DEVELOPER
> SYSTEM_READY.
```

## 📡 Descripción

Sistema web moderno para la gestión de casilleros de la **Asociación de Estudiantes de Ingeniería en Sistemas (AEIS)**. Diseñado con una estética visual inspirada en terminales de mainframe y interfaces cyberpunk.

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Deep Navy** `#0A192F` - Fondo principal
- **Circuit Green** `#00FF9D` - Color de acento
- **Error Red** `#FF4444` - Estados de error
- **Warning Yellow** `#FFD93D` - Advertencias

### Tipografía
- **Fira Code** - Fuente monoespaciada principal para toda la UI

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── auth/
│   │   ├── login/          # [ACCESS_GATEWAY] Login
│   │   └── register/       # [USER_INJECTION] Registro
│   ├── dashboard/
│   │   ├── page.tsx        # [COMMAND_CENTER] Panel principal
│   │   ├── lockers/        # [GRID_INFRASTRUCTURE] Vista de casilleros
│   │   ├── my-locker/      # [CURRENT_SESSION] Mi casillero
│   │   ├── payments/
│   │   │   ├── page.tsx    # [ASSET_TRANSFER] Historial de pagos
│   │   │   ├── checkout/   # [SECURE_TUNNEL] Proceso de pago
│   │   │   └── result/     # [TRANSACTION_LOG] Resultado
│   │   ├── reports/        # [DATA_DUMP] Reportes
│   │   └── admin/
│   │       ├── page.tsx    # [ADMIN_CONSOLE] Panel admin
│   │       ├── create-block/  # [BLUEPRINT_MODE] Crear bloques
│   │       ├── users/      # [USER_OVERRIDE] Gestión usuarios
│   │       └── time-config/   # [TIME_PROTOCOL] Configuración
│   ├── layout.tsx
│   ├── page.tsx            # Landing page
│   └── globals.css         # Estilos globales
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Logo.tsx
│   │   ├── PasswordStrength.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── TerminalWindow.tsx
│   │   └── Typewriter.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       └── DashboardLayout.tsx
```

## 🔧 Módulos

### 1. ACCESS_GATEWAY (Autenticación)
- Login con animación de boot sequence
- Registro estilo BIOS con medidor de entropía de contraseña
- Logo animado del chip AEIS

### 2. COMMAND_CENTER (Dashboard)
- Sidebar con indicadores de estado
- Widgets de telemetría en tiempo real
- Feed de actividad estilo log de sistema

### 3. GRID_INFRASTRUCTURE (Casilleros)
- Matriz visual de nodos
- Estados: OPEN_CIRCUIT, LOCKED, SYS_WARN, CURRENT_SESSION
- Modal de detalles técnicos

### 4. ADMIN_CONSOLE (Administración)
- BLUEPRINT_MODE: Crear bloques con preview en tiempo real
- USER_OVERRIDE: Búsqueda estilo command line
- TIME_PROTOCOL: Gestión de periodos de renta

### 5. ASSET_TRANSFER (Pagos)
- Checkout con animación de procesamiento
- Resultado con código de acceso
- Historial de transacciones

### 6. DATA_DUMP (Reportes)
- Tabla estilo Matrix
- Filtros tipo parámetros de sistema
- Exportación a CSV

## 🛠 Tecnologías

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React Hooks** - Gestión de estado

## 📱 Características

- ✅ Diseño responsivo
- ✅ Animaciones fluidas
- ✅ Modo terminal/mainframe
- ✅ Componentes reutilizables
- ✅ Accesibilidad mejorada

---

```
> END_OF_DOCUMENTATION
> AWAITING_USER_INPUT...
> _
```

© 2024 AEIS - Asociación de Estudiantes de Ingeniería en Sistemas
