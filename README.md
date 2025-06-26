# 💬 TitanicChat

Un clon de ChatGPT moderno y elegante construido con **Next.js 15**, **React 19** y la **API de OpenAI**. Diseñado con arquitectura limpia, componentes atómicos y las mejores prácticas de desarrollo.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-cyan)

## ✨ Características

- 🤖 **Chat Inteligente**: Conversaciones naturales con OpenAI GPT-3.5-turbo
- ⚡ **Tiempo Real**: Respuestas instantáneas sin recargar la página
- 🌙 **Modo Oscuro**: Soporte automático según preferencias del sistema
- 📱 **Responsive**: Optimizado para móviles, tablets y escritorio
- 🎨 **UI Moderna**: Interfaz elegante con Tailwind CSS
- 🔧 **Arquitectura Limpia**: Componentes atómicos y separación de responsabilidades
- 🚀 **Performance**: Optimizado para velocidad y escalabilidad
- 🔒 **Seguro**: Manejo seguro de API keys y validación de entrada

## 🚀 Inicio Rápido

### 1. Clonar e Instalar
```bash
git clone <repository-url>
cd titanicchat
yarn install
```

### 2. Configurar Variables de Entorno
```bash
# Crear archivo .env.local
touch .env.local
```

Agregar tu API key de OpenAI:
```env
OPENAI_API_KEY=sk-proj-tu-api-key-aqui
```

### 3. Ejecutar en Desarrollo
```bash
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. ¡Listo!
Escribe tu primer mensaje y comienza a chatear con el asistente de IA.

## 📚 Documentación Completa

### 👥 Para Usuarios
- [**📖 Guía de Usuario**](./documentation/user/user-guide.md) - Cómo usar la aplicación
- [**❓ FAQ**](./documentation/user/faq.md) - Preguntas frecuentes
- [**🔧 Troubleshooting**](./documentation/user/troubleshooting.md) - Solución de problemas

### 🔧 Para Desarrolladores
- [**🏗️ Arquitectura del Sistema**](./documentation/technical/architecture.md) - Diseño y estructura técnica
- [**🛠️ Guía de Instalación**](./documentation/technical/installation.md) - Setup completo del entorno
- [**💻 Guía de Desarrollo**](./documentation/technical/development.md) - Flujo de trabajo y mejores prácticas
- [**📏 Estándares de Código**](./documentation/technical/coding-standards.md) - Convenciones del proyecto
- [**🧪 Testing**](./documentation/technical/testing.md) - Estrategia de pruebas

### 🌐 API y Servicios
- [**📡 Documentación de API**](./documentation/api/api-reference.md) - Endpoints y especificaciones
- [**🤖 Integración OpenAI**](./documentation/api/openai-integration.md) - Configuración y uso
- [**⚠️ Manejo de Errores**](./documentation/api/error-handling.md) - Códigos y respuestas

### 🚀 Deployment y DevOps
- [**🌐 Guía de Deploy**](./documentation/deployment/deployment-guide.md) - Despliegue en producción
- [**⚙️ Variables de Entorno**](./documentation/deployment/environment-variables.md) - Configuración
- [**📊 Monitoreo**](./documentation/deployment/monitoring.md) - Logs y métricas

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Librería de interfaces de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de estilos utility-first
- **Lucide React** - Iconos modernos

### Backend
- **Next.js API Routes** - Endpoints serverless
- **OpenAI API** - Inteligencia artificial conversacional

### Desarrollo
- **ESLint** - Linting de código
- **Yarn** - Gestor de paquetes
- **Git** - Control de versiones

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────┐
│              PRESENTACIÓN               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  Chat   │ │MessageList│MessageInput│   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│            LÓGICA DE NEGOCIO            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ChatService│HttpService│ Helpers │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│            INFRAESTRUCTURA              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │API Route│ │OpenAI API│ │Next.js │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── api/chat/          # API endpoints
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página home
├── components/chat/       # Componentes del chat
│   ├── Chat.tsx          # Componente contenedor
│   ├── MessageList.tsx   # Lista de mensajes
│   ├── MessageInput.tsx  # Campo de entrada
│   └── MessageItem.tsx   # Mensaje individual
├── services/             # Servicios de negocio
│   ├── http.service.ts   # Cliente HTTP
│   ├── chat.service.ts   # Servicio de chat
│   └── chat.helpers.ts   # Utilidades
├── types/               # Tipos TypeScript
│   └── chat.types.ts    # Tipos del chat
├── interfaces/          # Interfaces de API
│   └── api.interfaces.ts # Contratos
└── documentation/       # Documentación completa
    ├── user/           # Guías de usuario
    ├── technical/      # Docs técnicas
    ├── api/           # Documentación de API
    └── deployment/    # Guías de deploy
```

## 🎯 Características Técnicas

### Principios de Diseño
- ✅ **Componentes Atómicos** - Máximo 100 líneas por componente
- ✅ **Separación de Responsabilidades** - Tipos, lógica y presentación separados
- ✅ **Arquitectura Limpia** - Dependencias hacia adentro
- ✅ **Tipado Estricto** - TypeScript en todo el proyecto
- ✅ **Reutilización** - Servicios y helpers compartidos

### Performance
- ⚡ **Memoización** - Componentes optimizados
- ⚡ **Code Splitting** - Carga bajo demanda
- ⚡ **SSR/SSG** - Renderizado optimizado
- ⚡ **Tailwind Purge** - CSS optimizado

### Seguridad
- 🔒 **API Keys Seguras** - Solo en servidor
- 🔒 **Validación de Entrada** - Sanitización de datos
- 🔒 **Headers de Seguridad** - Protección XSS/CSRF
- 🔒 **Rate Limiting** - Prevención de abuso (próximamente)

## 🚀 Scripts Disponibles

```bash
# Desarrollo
yarn dev          # Servidor de desarrollo con Turbopack
yarn build        # Build de producción
yarn start        # Servidor de producción
yarn lint         # Linting con ESLint

# Utilidades
yarn type-check   # Verificación de tipos TypeScript
yarn clean        # Limpiar archivos generados
```

## 🌍 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel --prod
```

### Docker
```bash
docker build -t titanicchat .
docker run -p 3000:3000 -e OPENAI_API_KEY=your-key titanicchat
```

Ver la [**Guía Completa de Deploy**](./documentation/deployment/deployment-guide.md) para más opciones.

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crear** una rama feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

### Antes de Contribuir
- Lee los [**Estándares de Código**](./documentation/technical/coding-standards.md)
- Consulta la [**Guía de Desarrollo**](./documentation/technical/development.md)
- Ejecuta los tests y linting

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [OpenAI](https://openai.com/) por la API de ChatGPT
- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Lucide](https://lucide.dev/) por los iconos

## 📞 Soporte

- 📖 **Documentación**: [Ver docs completas](./documentation/)
- 🐛 **Bugs**: [Reportar issues](https://github.com/tu-usuario/titanicchat/issues)
- 💬 **Preguntas**: [Discusiones](https://github.com/tu-usuario/titanicchat/discussions)
- 📧 **Contacto**: tu-email@ejemplo.com

## 🔮 Roadmap

### v1.1 (Próximamente)
- [ ] Persistencia de conversaciones
- [ ] Múltiples conversaciones
- [ ] Export/Import de chats
- [ ] Rate limiting

### v1.2 (Futuro)
- [ ] Autenticación de usuarios
- [ ] Temas personalizables
- [ ] Plugins y extensiones
- [ ] Análisis de conversaciones

### v2.0 (Visión)
- [ ] Múltiples modelos de IA
- [ ] Colaboración en tiempo real
- [ ] Integración con bases de datos
- [ ] API pública

---

**¿Te gusta el proyecto?** ⭐ ¡Dale una estrella en GitHub!

**¿Encontraste un bug?** 🐛 [Repórtalo aquí](https://github.com/tu-usuario/titanicchat/issues)

**¿Tienes una idea?** 💡 [Compártela en discusiones](https://github.com/tu-usuario/titanicchat/discussions)
