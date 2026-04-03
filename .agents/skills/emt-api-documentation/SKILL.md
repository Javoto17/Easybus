---
name: emt-api-documentation
description: Consulta y usa la API de EMT Madrid (MobilityLabs/OpenAPI). Activa esta skill cuando el usuario mencione EMT, Madrid transport, buses, paradas, tiempos de llegada, líneas de bus, login con x-ClientId/passKey, accessToken, endpoints de MobilityLabs, discover/categories, discover/collections, openapi.emtmadrid.es, o necesite implementar integración con datos de transporte público de Madrid.
compatibility: Requiere acceso web para consultar documentación oficial de EMT y su repositorio openapi_documents.
---

# 📚 EMT API Documentation

Referencia completa de la API de EMT Madrid (MobilityLabs/OpenAPI).

## 🎯 Propósito

Esta skill proporciona acceso directo a la documentación completa de la API de EMT Madrid, permitiendo:

- Consultar endpoints disponibles y sus parámetros
- Entender flujos de autenticación
- Ver ejemplos de requests y responses
- Implementar integraciones sin salir del entorno de desarrollo

## 📖 Documentación Disponible

### 🔐 [Autenticación](references/auth.md)

Endpoints para gestión de sesiones:

- **Login** - Obtener accessToken (modos: básico, avanzado, protegido)
- **Logout** - Cerrar sesión
- **Whoami** - Validar token activo
- **Password Reset** - Solicitar nueva contraseña

### 🔍 [Descubrimiento de Datos](references/discover.md)

Endpoints para navegar la estructura de datos:

- **Categories** - Listar categorías y subcategorías
- **Collections** - Ver colecciones por subcategoría
- **Collection Detail** - Ver endpoints disponibles en una colección
- **Data Types** - Tipos de datos disponibles

### 🚌 [Transporte - Buses EMT](references/transport.md)

Endpoints para información de transporte:

- **Lines** - Listar líneas, info de línea, grupos
- **Stops** - Paradas de línea, info de parada
- **Arrivals** - Tiempos de llegada en parada
- **Calendar** - Calendario de transporte

## 🚀 URL Base

```
https://openapi.emtmadrid.es/v1/
```

## 🔑 Autenticación Rápida

### Modo Protegido (Recomendado)

```bash
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/user/login/' \
  -H 'X-ClientId: TU_CLIENT_ID' \
  -H 'passKey: TU_PASS_KEY'
```

## 📊 Estructura de Respuesta

```json
{
  "code": "00",
  "description": "Data recovered OK",
  "datetime": "2024-01-15T10:30:00.000000",
  "data": [...]
}
```

## 🗺️ Arquitectura de Datos

```
openapi.emtmadrid.es/v1/
├── mobilitylabs/
│   ├── user/           # Autenticación
│   ├── discover/       # Descubrimiento de datos
│   └── collection/     # Datos genéricos
├── transport/
│   └── busemtmad/      # Buses EMT
├── bicimad/            # Bicimad
└── citymad/            # Lugares Madrid
```

## 💡 Casos de Uso

### Obtener Tiempos de Llegada

```bash
# 1. Login
TOKEN=$(curl -s ... login ... | jq -r '.data[0].accessToken')

# 2. Tiempos en parada
curl -X GET 'https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/4912/arrives/' \
  -H "accessToken: $TOKEN"
```

## ⚠️ Límites y Cuotas

| Modo      | Peticiones/Día |
| --------- | -------------- |
| Básico    | 25,000         |
| Protegido | 250,000        |

## 🔗 Recursos Externos

- **Documentación Oficial:** https://apidocs.emtmadrid.es/
- **Portal Developers:** https://mobilitylabs.emtmadrid.es/

## 🆘 Cuándo Usar Esta Skill

Activa esta skill cuando necesites:

- 🔍 Consultar endpoints disponibles de EMT
- 🔐 Implementar autenticación con EMT
- 🚌 Obtener datos de transporte (líneas, paradas, tiempos)
- 🗺️ Descubrir recursos disponibles en la API
- 📝 Ver ejemplos de requests/responses
- ❓ Resolver dudas sobre parámetros o códigos de error

## 📁 Archivos de Referencia

```
emt-api-documentation/
├── SKILL.md                    ← Estás aquí (Índice)
├── references/
│   ├── auth.md                 ← Autenticación completa
│   ├── discover.md             ← Descubrimiento de datos
│   └── transport.md            ← Buses EMT
└── evals/
    ├── evals.json              ← Tests
    └── trigger-evals.json      ← Tests de triggering
```
