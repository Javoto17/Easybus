# EMT API Reference - Autenticación

## Login

**Endpoint:** `GET /v?/mobilitylabs/user/login/`

**URL Base:** `https://openapi.emtmadrid.es`

**Descripción:** Crea una sesión en el contexto de la API. Permite tres niveles de acceso:

### Modos de Acceso

#### 1. Básico (hasta 25k peticiones/día)
- **Headers requeridos:** `email`, `password`
- Uso básico de la API con límite de 25,000 peticiones diarias

#### 2. Avanzado (hasta 250k peticiones/día)  
- **Headers requeridos:** `email`, `password`, `X-ApiKey`, `X-ClientId`
- Mayor cuota de uso registrando tu aplicación en MobilityLabs

#### 3. Protegido (hasta 250k peticiones/día, sesión hasta 86400s)
- **Headers requeridos:** `X-ClientId`, `passKey`
- Protege credenciales del portal y extiende duración de sesión
- **Recomendado para aplicaciones en producción**

### Headers

| Header | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| `email` | string | Condicional* | Email registrado en mobilitylabs.emtmadrid.es |
| `password` | string | Condicional* | Contraseña del usuario |
| `X-ApiKey` | string | Opcional | Clave API (deprecated, usar passKey) |
| `X-ClientId` | string | Condicional** | ID de cliente registrado |
| `passKey` | string | Condicional** | Clave de acceso protegido |

\* Requerido si no se usa X-ClientId + passKey  
\*\* Requerido para modo protegido

### Respuesta Exitosa (code: 00)

```json
{
  "code": "00",
  "description": "Register user: username with token: 3bd5855a-ed3d-41d5-8b4b-182726f86031",
  "datetime": "2019-10-01T16:35:39.521302",
  "data": [
    {
      "updatedAt": "2019-05-08T07:23:40.7500000",
      "userName": "username",
      "accessToken": "3bd5855a-ed3d-41d5-8b4b-182726f86031",
      "tokenSecExpiration": 984,
      "email": "user@mail.com",
      "idUser": "2f104b08-f8bf-4199-a4bc-c6ecc42ad6ba",
      "apiCounter": {
        "current": 5,
        "dailyUse": 150000,
        "owner": 0,
        "licenceUse": "Please mention EMT Madrid MobilityLabs as data source."
      }
    }
  ]
}
```

### Campos de Respuesta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `code` | string | Código de resultado (`00` = OK) |
| `description` | string | Descripción del resultado |
| `datetime` | string | Timestamp de la operación |
| `data` | array | Array con información de sesión |
| `data[0].accessToken` | string | Token para usar en subsiguientes llamadas |
| `data[0].tokenSecExpiration` | integer | Segundos hasta expiración del token |
| `data[0].userName` | string | Nombre de usuario |
| `data[0].email` | string | Email del usuario |
| `data[0].idUser` | string | ID único del usuario |
| `data[0].apiCounter.current` | integer | Peticiones actuales del día |
| `data[0].apiCounter.dailyUse` | integer | Límite diario de peticiones |

### Ejemplo cURL

```bash
# Modo protegido (recomendado)
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/user/login/' \
  -H 'X-ClientId: TU_CLIENT_ID' \
  -H 'passKey: TU_PASS_KEY'

# Modo básico
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/user/login/' \
  -H 'email: tu@email.com' \
  -H 'password: tu_password'
```

---

## Logout

**Endpoint:** `GET /v1/mobilitylabs/user/logout/`

**Descripción:** Destruye la sesión de usuario.

### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token obtenido del login |

### Respuesta Exitosa (code: 03)

```json
{
  "code": "03",
  "description": "Token a1727347-3eea-4bd1-91b3-0845df61bd32 removed from control-cache",
  "datetime": "2019-10-02T06:57:50.878129",
  "data": []
}
```

### Ejemplo cURL

```bash
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/user/logout/' \
  -H 'accessToken: TU_ACCESS_TOKEN'
```

---

## Whoami (Validar Sesión)

**Endpoint:** `GET /v1/mobilitylabs/user/whoami/`

**Descripción:** Recupera el contexto de login si el usuario tiene sesión activa. Útil para verificar validez de token.

### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token a validar |

### Códigos de Respuesta

| Code | Significado |
|------|-------------|
| `02` | Token válido y activo |
| `80` | Token no encontrado/expirado |

### Ejemplo cURL

```bash
curl -X GET 'https://openapi.emtmadrid.es/v1/mobilitylabs/user/whoami/' \
  -H 'accessToken: TU_ACCESS_TOKEN'
```

---

## Password Reset

**Endpoint:** `GET /v1/mobilitylabs/user/passwreset/`

**Descripción:** Envía un email para solicitar nueva contraseña.

### Headers Requeridos

| Header | Tipo | Descripción |
|--------|------|-------------|
| `accessToken` | string | Token de sesión |

### Respuesta Exitosa (code: 05)

```json
{
  "code": "05",
  "description": "Ask for new password sent",
  "datetime": "2019-10-02T07:16:52.703988",
  "data": []
}
```
