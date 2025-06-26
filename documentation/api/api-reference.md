# 🌐 Documentación de API

## 📋 Resumen

La API de TitanicChat proporciona endpoints para interactuar con el sistema de chat conversacional. Actualmente incluye un endpoint principal para el procesamiento de mensajes a través de OpenAI.

## 🔗 Base URL

```
Desarrollo: http://localhost:3000
Producción: https://tu-dominio.com
```

## 🔐 Autenticación

La API utiliza autenticación basada en API keys de OpenAI configuradas en el servidor. No se requiere autenticación del cliente.

## 📡 Endpoints

### POST /api/chat

Procesa un mensaje de chat y retorna la respuesta del asistente de IA.

#### Request

**URL**: `/api/chat`
**Método**: `POST`
**Content-Type**: `application/json`

#### Headers
```http
Content-Type: application/json
```

#### Body Parameters

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `message` | string | ✅ | El mensaje del usuario |
| `history` | OpenAIMessage[] | ✅ | Historial de la conversación |

#### OpenAIMessage Structure
```typescript
interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
```

#### Ejemplo de Request
```json
{
  "message": "¿Cómo está el clima hoy?",
  "history": [
    {
      "role": "user",
      "content": "Hola"
    },
    {
      "role": "assistant", 
      "content": "¡Hola! ¿En qué puedo ayudarte hoy?"
    }
  ]
}
```

#### Response

**Status Code**: `200 OK`
**Content-Type**: `application/json`

#### Response Structure
```typescript
interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

#### Ejemplo de Response
```json
{
  "choices": [
    {
      "message": {
        "content": "Lo siento, no tengo acceso a información meteorológica en tiempo real. Te recomiendo consultar un servicio meteorológico local o una aplicación del clima para obtener información actualizada sobre el clima en tu área.",
        "role": "assistant"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 38,
    "total_tokens": 83
  }
}
```

## 🚨 Códigos de Error

### 400 Bad Request
**Descripción**: Solicitud malformada o parámetros faltantes

#### Causas Comunes:
- Mensaje vacío o faltante
- Formato JSON inválido
- Parámetros requeridos faltantes

#### Ejemplo de Response:
```json
{
  "error": "El mensaje es requerido"
}
```

### 401 Unauthorized
**Descripción**: API key inválida o faltante

#### Causas Comunes:
- API key de OpenAI no configurada
- API key inválida o expirada
- Problemas de configuración del servidor

#### Ejemplo de Response:
```json
{
  "error": "API key de OpenAI no configurada"
}
```

### 429 Too Many Requests
**Descripción**: Límite de rate limiting excedido

#### Causas Comunes:
- Demasiadas solicitudes por minuto
- Límites de OpenAI excedidos
- Rate limiting del servidor

#### Ejemplo de Response:
```json
{
  "error": "Demasiadas solicitudes. Intenta más tarde."
}
```

### 500 Internal Server Error
**Descripción**: Error interno del servidor

#### Causas Comunes:
- Error en la comunicación con OpenAI
- Problemas de configuración del servidor
- Errores no manejados

#### Ejemplo de Response:
```json
{
  "error": "Error interno del servidor"
}
```

### 503 Service Unavailable
**Descripción**: Servicio temporalmente no disponible

#### Causas Comunes:
- OpenAI API no disponible
- Mantenimiento del servidor
- Sobrecarga del sistema

#### Ejemplo de Response:
```json
{
  "error": "Servicio temporalmente no disponible"
}
```

## 📊 Límites y Cuotas

### Rate Limiting
- **Límite actual**: Sin límite implementado
- **Recomendación**: Implementar límites por IP/sesión
- **Futuro**: 100 requests/minuto por IP

### Límites de OpenAI
- **Modelo**: GPT-3.5-turbo
- **Max tokens**: 1000 por respuesta
- **Límites de cuenta**: Según plan de OpenAI

### Límites de Contenido
- **Longitud máxima del mensaje**: 4000 caracteres
- **Historial máximo**: 50 mensajes
- **Timeout**: 30 segundos

## 🔧 Configuración

### Variables de Entorno Requeridas
```env
OPENAI_API_KEY=sk-proj-...
```

### Variables de Entorno Opcionales
```env
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.7
OPENAI_TIMEOUT=30000
```

## 📝 Ejemplos de Uso

### JavaScript/TypeScript
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Hola, ¿cómo estás?',
    history: []
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

### cURL
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explícame qué es React",
    "history": []
  }'
```

### Python
```python
import requests

response = requests.post('http://localhost:3000/api/chat', 
  json={
    'message': '¿Qué es la inteligencia artificial?',
    'history': []
  }
)

data = response.json()
print(data['choices'][0]['message']['content'])
```

## 🧪 Testing

### Test de Conectividad
```bash
# Verificar que el endpoint responde
curl -I http://localhost:3000/api/chat
```

### Test Básico
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","history":[]}'
```

### Test de Error
```bash
# Test con mensaje vacío (debe retornar 400)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"","history":[]}'
```

## 📈 Monitoreo

### Métricas Recomendadas
- **Response time**: Tiempo de respuesta promedio
- **Error rate**: Porcentaje de errores
- **Request volume**: Número de requests por minuto
- **Token usage**: Consumo de tokens de OpenAI

### Logs de Ejemplo
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "method": "POST",
  "url": "/api/chat",
  "status": 200,
  "response_time": 1500,
  "tokens_used": 85,
  "user_ip": "192.168.1.1"
}
```

## 🔮 Roadmap de la API

### Versión 1.1 (Próximamente)
- [ ] Rate limiting implementado
- [ ] Autenticación de usuarios
- [ ] Métricas de uso
- [ ] Caching de respuestas

### Versión 1.2 (Futuro)
- [ ] Streaming de respuestas
- [ ] Múltiples modelos de IA
- [ ] Webhooks
- [ ] API versioning

### Versión 2.0 (Futuro)
- [ ] GraphQL endpoint
- [ ] Persistencia de conversaciones
- [ ] Análisis de sentimientos
- [ ] Integración con bases de datos

## 🔒 Seguridad

### Mejores Prácticas
- ✅ API keys almacenadas en servidor
- ✅ Validación de entrada
- ✅ Manejo de errores seguro
- ⚠️ Rate limiting (pendiente)
- ⚠️ Sanitización de entrada (pendiente)

### Recomendaciones
1. **Implementar HTTPS** en producción
2. **Configurar CORS** apropiadamente
3. **Implementar rate limiting**
4. **Logs de seguridad**
5. **Monitoreo de anomalías**

## 📞 Soporte

### Reportar Problemas
- Incluir request/response completos
- Código de error específico
- Timestamp del error
- Información del entorno

### Contacto
- **Documentación**: [Ver documentación técnica](../technical/)
- **Issues**: Reportar en el repositorio
- **Soporte**: Contactar al equipo de desarrollo

---

**Versión de la API**: 1.0.0
**Última actualización**: Enero 2024 