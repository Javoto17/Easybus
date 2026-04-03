# EMT API Reference - Transporte (Buses EMT)

## Base URL

```
https://openapi.emtmadrid.es/v1/transport/busemtmad/
```

---

## Lines (Líneas)

### Listar Líneas

**Endpoint:** `GET /v1/transport/busemtmad/lines/info/<dateRef>/`

**Descripción:** Obtiene la lista de líneas de EMT Madrid para una fecha de referencia.

#### Parámetros URL

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `dateRef` | string | Fecha de referencia (YYYYMMDD) | 20250115 |

#### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

#### Respuesta

La respuesta contiene información de todas las líneas de bus disponibles en la fecha indicada.

---

### Info de Línea

**Endpoint:** `GET /v1/transport/busemtmad/lines/<lineId>/info/<dateRef>/`

**Descripción:** Obtiene información detallada de una línea específica.

#### Parámetros URL

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `lineId` | string | ID de la línea | 27 |
| `dateRef` | string | Fecha de referencia (YYYYMMDD) | 20250115 |

#### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

---

### Grupos de Líneas

**Endpoint:** `GET /v1/transport/busemtmad/lines/groups/`

**Descripción:** Obtiene los grupos de líneas disponibles.

#### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

---

## Stops (Paradas)

### Paradas de una Línea

**Endpoint:** `GET /v1/transport/busemtmad/lines/<lineId>/stops/<direction>/`

**Descripción:** Obtiene la lista de paradas de una línea específica en una dirección.

#### Parámetros URL

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `lineId` | string | ID de la línea | 27 |
| `direction` | string | Dirección (1 o 2) | 1 |

#### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

---

### Info de Parada

**Endpoint:** `GET /v1/transport/busemtmad/stops/<stopId>/info/`

**Descripción:** Obtiene información detallada de una parada específica.

#### Parámetros URL

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `stopId` | string | ID de la parada | 4912 |

#### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

---

## Arrivals (Tiempos de Llegada)

### Tiempos en Parada

**Endpoint:** `GET /v1/transport/busemtmad/stops/<stopId>/arrives/`

**Descripción:** Obtiene los tiempos de llegada de buses a una parada específica.

#### Parámetros URL

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `stopId` | string | ID de la parada | 4912 |

#### Query Parameters (Opcional)

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `lineId` | string | Filtrar por línea específica |
| `direction` | string | Filtrar por dirección (1 o 2) |

#### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

#### Ejemplo de Respuesta

```json
{
  "code": "00",
  "description": "Data recovered OK",
  "datetime": "2024-01-15T10:30:00.000000",
  "data": [
    {
      "lineId": "27",
      "lineName": "Plaza Castilla - Embajadores",
      "direction": 1,
      "busId": "4123",
      "busTimeLeft": 450,
      "busDistance": 1200,
      "longitude": -3.7031722,
      "latitude": 40.4192083,
      "positionType": 0
    }
  ]
}
```

#### Campos de Respuesta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `lineId` | string | ID de la línea |
| `lineName` | string | Nombre de la línea |
| `direction` | integer | Dirección del bus (1 o 2) |
| `busId` | string | ID del bus |
| `busTimeLeft` | integer | Segundos hasta llegada (0 = en parada) |
| `busDistance` | integer | Distancia en metros |
| `longitude` | float | Longitud actual del bus |
| `latitude` | float | Latitud actual del bus |
| `positionType` | integer | Tipo de posición (0=estimada, 1=real) |

---

## Calendar (Calendario)

### Info de Calendario

**Endpoint:** `GET /v1/transport/busemtmad/calendar/info/<dateRef>/`

**Descripción:** Obtiene información del calendario de transporte para una fecha.

#### Parámetros URL

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `dateRef` | string | Fecha de referencia (YYYYMMDD) | 20250115 |

#### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

#### Respuesta

Información sobre si es día laborable, festivo, horario especial, etc.

---

## Ejemplos de Uso

### Obtener tiempos de llegada en parada

```bash
curl -X GET 'https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/4912/arrives/' \
  -H 'accessToken: TU_ACCESS_TOKEN'
```

### Filtrar por línea específica

```bash
curl -X GET 'https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/4912/arrives/?lineId=27' \
  -H 'accessToken: TU_ACCESS_TOKEN'
```

### Listar líneas disponibles hoy

```bash
TODAY=$(date +%Y%m%d)
curl -X GET "https://openapi.emtmadrid.es/v1/transport/busemtmad/lines/info/${TODAY}/" \
  -H 'accessToken: TU_ACCESS_TOKEN'
```

---

## Estructura Típica de Respuesta

Todas las respuestas siguen este formato:

```json
{
  "code": "00",
  "description": "Descripción del resultado",
  "datetime": "2024-01-15T10:30:00.000000",
  "data": [
    // Array con los datos específicos del endpoint
  ]
}
```

### Códigos de Respuesta Comunes

| Código | Significado |
|--------|-------------|
| 00 | OK - Operación exitosa |
| 01 | Error general |
| 80 | Token inválido o expirado |
| 90 | Error de autenticación |
