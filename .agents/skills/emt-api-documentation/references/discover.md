# EMT API Reference - Discover (Descubrimiento de Datos)

Estos endpoints permiten descubrir la estructura de datos disponible en el portal de desarrolladores de MobilityLabs.

## Estructura de Datos

```
Categories → Subcategories → Collections → Endpoints
```

---

## Categories

**Endpoint:** `GET /v1/mobilitylabs/discover/categories/`

**Descripción:** Descubre todas las categorías y subcategorías disponibles en el portal de desarrolladores.

### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

### Respuesta Exitosa (code: 00)

```json
{
  "code": "00",
  "data": [
    {
      "DS_CATEGORY": "TRANSPORT",
      "DS_PHOTO_CAT": null,
      "DS_SUBCATEGORY": "BUSEMTMAD",
      "CD_CATEGORY": 1,
      "DS_PHOTO_SUBCAT": "https://mobilitylabs.emtmadrid.es/fs/1/providers/emtPortal/images/subcatsubemtmad",
      "DS_URI": "https://openapi.emtmadrid.es/v1/transport/busemtmad/",
      "DS_DESCRIPTION_CAT": "TRANSPORT EMTMADRID DATA",
      "DS_DESCRIPTION_SUBCAT": "FOR GETTING DATA FROM MADRID EMT BUSES",
      "FC_CREATION": {"$date": 1535365773290},
      "CD_SUBCATEGORY": 4,
      "CD_DATA_TYPE": 1
    }
  ],
  "description": "Data recovered OK, (lapsed: 378 millsecs)",
  "datetime": "2018-09-21T06:47:16.587652"
}
```

### Campos de Respuesta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `DS_CATEGORY` | string | Nombre de la categoría |
| `DS_SUBCATEGORY` | string | Nombre de la subcategoría |
| `CD_CATEGORY` | integer | Código de categoría |
| `CD_SUBCATEGORY` | integer | Código de subcategoría |
| `DS_URI` | string | URL base del recurso |
| `DS_DESCRIPTION_CAT` | string | Descripción de categoría |
| `DS_DESCRIPTION_SUBCAT` | string | Descripción de subcategoría |
| `CD_DATA_TYPE` | integer | Código de tipo de datos |
| `DS_PHOTO_CAT` | string | URL de imagen de categoría |
| `DS_PHOTO_SUBCAT` | string | URL de imagen de subcategoría |

---

## Collections

**Endpoint:** `GET /v1/mobilitylabs/discover/collections/<CD_SUBCATEGORY>/`

**Descripción:** Recupera todas las colecciones de datos de una subcategoría específica.

### Parámetros URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `CD_SUBCATEGORY` | integer | Código de subcategoría (obtenido de categories) |

### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

### Respuesta Exitosa

```json
{
  "code": "00",
  "data": [
    {
      "FS_STATIC": null,
      "DS_DESCRIPTION": "Datos del calendario de transporte de EMTMADRID",
      "DS_RESOURCE": "calendar",
      "NM_VERSION": 1,
      "DS_SUBCATEGORY": "busemtmad",
      "DS_DATE_SEPARATOR": null,
      "CD_SHARING_TYPE": 1,
      "CD_REST_ACTION": 1,
      "DS_FORMAT": null,
      "IT_GEOGRPHIC_INFO": true,
      "CD_COLLECTION": "2BCAAF2B-CE00-45B5-BB13-4C275E13E4A2",
      "DS_THOUSANDS_SEPARATOR": null,
      "FC_CREATION": {"$date": 1534165094620},
      "DS_ROW_SEPARATOR": null,
      "DS_COLLECTION": "Calendario de Transporte de EMTMADRID",
      "CD_SUBCATEGORY": 2,
      "CD_DATA_TYPE": 1,
      "FC_UPDATE": {"$date": 1534173692117},
      "CD_COLLECTION_PARENT": null
    }
  ],
  "description": "Data recovered OK, (lapsed: 41 millsecs)",
  "datetime": "2018-09-21T16:56:52.154954"
}
```

### Campos Importantes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `CD_COLLECTION` | string | ID único de la colección (UUID) |
| `DS_COLLECTION` | string | Nombre descriptivo de la colección |
| `DS_DESCRIPTION` | string | Descripción detallada |
| `DS_RESOURCE` | string | Nombre del recurso |
| `IT_GEOGRPHIC_INFO` | boolean | Si contiene información geográfica |
| `CD_DATA_TYPE` | integer | Tipo de datos (1=WEBSERVICE, 2=STATIC, 3=REACTIVE) |
| `CD_REST_ACTION` | integer | Tipo de acción REST (1=GET, 2=POST, 3=PUT, 4=DELETE) |

---

## Collection Detail

**Endpoint:** `GET /v1/mobilitylabs/discover/collection/<CD_COLLECTION>/`

**Descripción:** Recupera todos los detalles de datos de una colección específica, incluyendo los endpoints disponibles.

### Parámetros URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `CD_COLLECTION` | string | ID de colección (UUID) |

### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión válido |

### Respuesta Exitosa

```json
{
  "code": "00",
  "data": [
    {
      "valuations": [],
      "links": [
        {
          "CD_LINK_TYPE": 4,
          "DS_LINK": "info/<dateRef>/",
          "DS_LINK_DESCRIPTION": "List of EMTMADRID lines on a refered date",
          "CD_LINK": 1
        },
        {
          "CD_LINK_TYPE": 4,
          "DS_LINK": "<lineId>/info/<dateRef>/",
          "DS_LINK_DESCRIPTION": "General Info of a EMTMADRID line on a refered date",
          "CD_LINK": 2
        },
        {
          "CD_LINK_TYPE": 4,
          "DS_LINK": "groups/",
          "DS_LINK_DESCRIPTION": "Groups of lines",
          "CD_LINK": 3
        },
        {
          "CD_LINK_TYPE": 4,
          "DS_LINK": "<lineId>/stops/<direction>/",
          "DS_LINK_DESCRIPTION": "List of Stops bus from EMTMADRID for a specific line",
          "CD_LINK": 4
        }
      ],
      "comments": [],
      "general": {
        "FS_STATIC": null,
        "DS_DESCRIPTION": "Servicios de EMTMADRID orientados a la información de Líneas y sus datos derivados",
        "DS_ROW_SEPARATOR": null,
        "NM_VERSION": 1,
        "DS_DATE_SEPARATOR": null,
        "CD_SHARING_TYPE": 1,
        "CD_REST_ACTION": 1,
        "COLLECTION": "busemtmad.lines",
        "IT_GEOGRPHIC_INFO": false,
        "CD_COLLECTION": "F0B6DA3B-E4DA-419B-B75C-C3146BE22E67",
        "DS_THOUSANDS_SEPARATOR": null,
        "FC_CREATION": {"$date": 1534173646050},
        "DS_FORMAT": null,
        "DS_COLLECTION": "Líneas de EMT",
        "CD_SUBCATEGORY": 2,
        "CD_DATA_TYPE": 1,
        "FC_UPDATE": {"$date": 1534173646050},
        "CD_COLLECTION_PARENT": null
      }
    }
  ],
  "description": "Data recovered OK, (lapsed: 28 millsecs)",
  "datetime": "2018-09-24T06:59:22.361654"
}
```

### Campos Importantes

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `general` | object | Información general de la colección |
| `links` | array | Lista de endpoints disponibles |
| `links[].DS_LINK` | string | Patrón de URL del endpoint |
| `links[].DS_LINK_DESCRIPTION` | string | Descripción del endpoint |
| `links[].CD_LINK_TYPE` | integer | Tipo de link (4 = Http Call) |

---

## Data Types

**Endpoint:** `GET /v1/mobilitylabs/discover/datatypes/`

**Descripción:** Descubre los tipos de datos disponibles.

### Tipos de Datos

| Código | Tipo | Descripción |
|--------|------|-------------|
| 1 | WEBSERVICE | Usa el sistema de API |
| 2 | STATIC | Contiene datasets (archivos) vinculados |
| 3 | REACTIVE | Observable usando sistema DDP ReactiveBox |

---

## Link Types

**Endpoint:** `GET /v1/mobilitylabs/discover/linktypes/`

**Descripción:** Descubre los tipos de links disponibles.

### Tipos de Links

| Código | Tipo | Descripción |
|--------|------|-------------|
| 1 | General | Solo información adicional |
| 2 | Documentation | Enlace a documentación de la colección |
| 3 | User Guide | Enlace a guía de usuario |
| 4 | Http Call | Enlace a endpoint HTTP (para web services) |
| 5 | File | Documento descargable (para datasets estáticos) |
| 6 | Reactive file | Documento accesible vía query (para datos reactivos) |

---

## REST Actions

**Endpoint:** `GET /v1/mobilitylabs/discover/restactions/`

**Descripción:** Descubre las acciones REST disponibles.

| Código | Acción |
|--------|--------|
| 1 | GET |
| 2 | POST |
| 3 | PUT |
| 4 | DELETE |

---

## Flujo de Descubrimiento Recomendado

```
1. GET /v1/mobilitylabs/discover/categories/
   ↓
2. Identificar CD_SUBCATEGORY relevante (ej: 4 para BUSEMTMAD)
   ↓
3. GET /v1/mobilitylabs/discover/collections/<CD_SUBCATEGORY>/
   ↓
4. Identificar CD_COLLECTION (UUID) de interés
   ↓
5. GET /v1/mobilitylabs/discover/collection/<CD_COLLECTION>/
   ↓
6. Extraer links[].DS_LINK para obtener endpoints operativos
```

### Ejemplo Práctico

```bash
# 1. Obtener categorías
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/discover/categories/' \
  -H 'accessToken: TU_TOKEN'

# 2. Obtener colecciones de BUSEMTMAD (CD_SUBCATEGORY=4)
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/discover/collections/4/' \
  -H 'accessToken: TU_TOKEN'

# 3. Obtener detalle de colección (usar CD_COLLECTION obtenido)
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/discover/collection/F0B6DA3B-E4DA-419B-B75C-C3146BE22E67/' \
  -H 'accessToken: TU_TOKEN'
```
