# SPECS.md

# 1. PROYECTO

## Nombre
Solumastic FrontEnd

## Descripción
Aplicación web corporativa para la empresa Solumastic.

El sistema tendrá dos áreas:

### Área pública
Sitio institucional para presentar la empresa, sus clientes y medios de contacto.

### Área privada
Portal autenticado llamado SAIGNa para consulta de información de proyectos y contratos.

---

# 2. OBJETIVO

Desarrollar una aplicación web moderna que permita:

- Presentar información institucional de Solumastic
- Mostrar cartera de clientes
- Permitir contacto comercial
- Brindar acceso seguro al portal SAIGNa
- Mostrar indicadores de proyectos
- Consultar contratos

---

# 3. STACK TECNOLÓGICO

## FrontEnd
- Angular 20
- TypeScript
- SCSS
- Angular Material

## Arquitectura
- Standalone Components
- Lazy Loading
- Arquitectura por Features

## Comunicación
- HttpClient
- JWT Authentication

---

# 4. IDENTIDAD VISUAL

## Estilo
- Corporativo
- Profesional
- Moderno
- Tecnológico

## Colores base
- Azul oscuro
- Blanco
- Gris claro

## Sensación visual
- Confianza
- Innovación
- Solidez empresarial

---

# 5. ESTRUCTURA FUNCIONAL

# 5.1 Módulos Públicos

## Home
Debe mostrar:

- Hero principal
- Presentación institucional
- Información destacada
- Acceso a SAIGNa
- Llamado a la acción

---

## Nuestros Clientes
Debe mostrar:

- Empresas clientes
- Logos
- Casos destacados

---

## Contáctenos
Debe mostrar:

- Formulario de contacto
- Información de contacto
- Ubicación
- Botón enviar

---

# 5.2 Módulos Privados

## SAIGNa - Login

Debe permitir:

- Inicio de sesión
- Validación JWT
- Manejo de errores
- Redirección segura

---

## Dashboard

Debe mostrar:

- Indicadores principales
- Tarjetas resumen
- Estado general de proyectos

---

## Consultas

Debe permitir:

- Consulta de contratos
- Búsqueda
- Filtrado
- Visualización tabular

---

# 6. FLUJO DE NAVEGACIÓN

Área pública:

Home
→ Nuestros Clientes
→ Contáctenos
→ SAIGNa

Área privada:

SAIGNa Login
→ Dashboard
→ Consultas

---

# 7. ENDPOINTS API

## Autenticación
| POST | `/api/auth/login` | Anónimo | `LoginRequest` (body) | `AuthResponse` o `401` |

## Dashboard
GET /dashboard/indicadores

## Contratos
| GET | `/api/contratoventa/contratos/prg` | JWT | `ContratoVentaFilter` (query) | `ResponseModel<List<ContratoVentaModel>>` |
| GET | `/api/comentario/cliente/{codCli}` | JWT | `codCli` (ruta) | `ResponseModel<List<ComentarioModel>>` |

---

# 8. SKILLS DEL AGENTE

## Skill: Arquitectura Angular

Reglas obligatorias:

- Standalone Components
- Lazy Loading
- Feature Modules
- Separación por capas
- Servicios desacoplados

---

## Skill: API

Reglas obligatorias:

- DTOs tipados
- HttpClient
- Interceptor JWT
- Manejo global de errores
- Servicios centralizados

---

## Skill: UI Pública

Reglas:

- Navbar superior
- Hero principal
- Footer institucional
- Diseño responsive
- Secciones visuales modernas

---

## Skill: UI Privada

Reglas:

- Sidebar izquierdo
- Toolbar superior
- Cards informativas
- Tablas Angular Material

---

## Skill: Calidad

Reglas:

- SOLID
- DRY
- Tipado estricto
- Métodos pequeños
- Código legible
- Sin duplicación

---

# 9. ESTRATEGIA DE DESARROLLO

El desarrollo será incremental.

Reglas:

- Construir una sola iteración por solicitud
- No generar todo el proyecto de una sola vez
- Esperar validación manual antes de continuar
- Cada iteración debe ser funcional
- Incluir instrucciones de prueba

---

# 10. REGLA PEDAGÓGICA

En cada iteración el agente debe explicar:

- Qué archivos creó
- Para qué sirve cada archivo
- Cómo probarlo
- Qué conceptos Angular se aplicaron

---

# 11. ITERACIONES

## Iteración 1
Inicialización del proyecto

Incluye:

- Crear proyecto Angular
- Configurar Angular Material
- Routing base
- Layout general
- Tema visual

---

## Iteración 2
Página Home

---

## Iteración 3
Página Nuestros Clientes

---

## Iteración 4
Página Contáctenos

---

## Iteración 5
Login SAIGNa

---

## Iteración 6
Dashboard

---

## Iteración 7
Consultas de Contratos

---

## Iteración 8
Integración API

---

## Iteración 9
Ajustes visuales finales

---

# 12. MODO DE TRABAJO DEL AGENTE

El agente debe:

- Ejecutar únicamente la iteración solicitada
- No avanzar automáticamente
- Esperar aprobación del usuario
- Entregar código funcional
- Priorizar claridad sobre complejidad

---

# 13. INSTRUCCIÓN FINAL PARA EL AGENTE

Leer completamente este documento antes de generar código.

Generar código respetando estrictamente:

- Arquitectura definida
- Desarrollo incremental
- Buenas prácticas Angular
- Explicaciones pedagógicas

Nunca asumir funcionalidades no especificadas.