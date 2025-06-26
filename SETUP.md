# Configuración del Chat

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente configuración:

```env
# OpenAI API Key
OPENAI_API_KEY=tu_api_key_de_openai_aqui

# API URL (opcional, por defecto usa la misma URL)
NEXT_PUBLIC_API_URL=
```

## Obtener API Key de OpenAI

1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Inicia sesión o crea una cuenta
3. Ve a la sección "API Keys"
4. Crea una nueva API key
5. Copia la key y pégala en el archivo `.env.local`

## Ejecutar el Proyecto

```bash
npm run dev
```

El chat estará disponible en `http://localhost:3000`

## Características

- ✅ Chat en tiempo real con OpenAI GPT-3.5-turbo
- ✅ Interfaz moderna y responsive
- ✅ Soporte para modo oscuro
- ✅ Historial de conversación
- ✅ Manejo de errores
- ✅ Componentes atómicos y reutilizables
- ✅ Arquitectura limpia con separación de responsabilidades 