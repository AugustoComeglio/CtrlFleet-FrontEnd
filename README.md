# CtrlFleet-FrontEnd
## Descripción
CtrlFleet es un sistema de gestión de flotas robusto y fácil de usar, construido con las últimas versiones de Angular y Node.js. Permite administrar vehículos, conductores, mantenimientos y más, a través de una interfaz intuitiva y completa. Este repositorio corresponde al frontend de la aplicación.

## Funcionalidades Principales
- Gestión de Vehículos: Permite agregar, editar y eliminar vehículos de la flota, así como visualizar información detallada de cada uno.
- Gestión de Conductores: Ofrece la posibilidad de administrar los conductores y asignarlos a los vehículos correspondientes.
- Seguimiento de Mantenimiento: Lleva un registro del historial de mantenimiento de los vehículos, incluyendo cambios de aceite, rotación de neumáticos y otros servicios.
- Registro de Combustible: Permite registrar las cargas de combustible y los gastos asociados, obteniendo información sobre la eficiencia de la flota.
- Monitoreo de combustible: Visualiza gráficos y estadísticas sobre el consumo de combustible por vehículo, por mes y por estación de servicio.
- Generación de Reportes: Ofrece la capacidad de generar reportes sobre el uso de los vehículos, el historial de mantenimiento y otros datos relevantes.
- Gestión de Flotas: Permite crear, modificar y eliminar flotas, así como visualizar la cantidad de vehículos asignados a cada una.
- Administración de Tipos: Permite gestionar los diferentes tipos de vehículos, combustibles y unidades de medida.
- Gestión de Estaciones de Servicio y Depósitos: Ofrece la posibilidad de administrar las estaciones de servicio y los depósitos de la empresa.
- Seguridad y Permisos: Permite administrar usuarios, tipos de usuario y perfiles de permisos, para controlar el acceso a las diferentes funcionalidades del sistema.

## Tecnologías Utilizadas
- Angular 16: El framework principal utilizado para construir la interfaz de usuario.
- TypeScript: El lenguaje de programación principal.
- Angular Material: Para los componentes de la interfaz de usuario.
- SCSS: Para los estilos de la aplicación.
- Chart.js (ng2-charts): Para la visualización de gráficos y estadísticas.
- SweetAlert2: Para la creación de alertas y notificaciones.
- Font Awesome: Para los íconos de la aplicación.

## Cómo Empezar
Para empezar a utilizar CtrlFleet, sigue los siguientes pasos:

- Clona el repositorio:
```
git clone https://github.com/augustocomeglio/ctrlfleet-frontend.git
```
- Instala las dependencias:
```
npm install
```
- Inicia el servidor de desarrollo:
```
ng serve
```
- Abre la aplicación en tu navegador: http://localhost:4200

## Estructura del Proyecto
El proyecto está organizado en los siguientes módulos principales:

- Módulo de Administración: Incluye la gestión de depósitos, estaciones de servicio, y tipos de unidades.Módulo de Documentación: Para la gestión de registros de documentación.
- Módulo de Gestión de Mantenimiento: Incluye la gestión de planes de mantenimiento, historial de daños y registro de kilometraje.
- Módulo de Mensajería: Para la gestión de debates y comunicaciones internas.
- Módulo de Reportes: Para la generación de reportes.
- Módulo de Seguridad: Incluye la gestión de usuarios, tipos de usuario, perfiles y permisos, así como la autenticación.
- Módulo de Vehículos: El módulo principal, que incluye la gestión de vehículos, flotas, tipos de vehículos, tipos de combustible, y el monitoreo y registro de combustible.

## Contacto
Para soporte o preguntas, por favor contáctanos a través de ctrlfleet@gmail.com.
