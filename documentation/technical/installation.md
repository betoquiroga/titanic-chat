# 🛠️ Guía de Instalación

## 📋 Requisitos del Sistema

### Requisitos Mínimos
- **Node.js**: 18.17.0 o superior
- **npm**: 9.0.0 o superior (o yarn 1.22.0+)
- **Sistema Operativo**: Windows 10+, macOS 12+, Ubuntu 20.04+
- **RAM**: 4GB mínimo, 8GB recomendado
- **Espacio en disco**: 2GB libres

### Requisitos Recomendados
- **Node.js**: 20.x LTS
- **npm**: 10.x o **yarn**: 1.22.x
- **Editor**: VS Code con extensiones TypeScript/React
- **RAM**: 16GB
- **SSD**: Para mejor rendimiento

## 🔧 Instalación de Dependencias

### 1. Verificar Node.js
```bash
# Verificar versión de Node.js
node --version
# Debe mostrar v18.17.0 o superior

# Verificar npm
npm --version
# Debe mostrar 9.0.0 o superior
```

### 2. Instalar Node.js (si es necesario)

#### Windows
1. Descargar desde [nodejs.org](https://nodejs.org/)
2. Ejecutar el instalador .msi
3. Seguir el asistente de instalación

#### macOS
```bash
# Usando Homebrew (recomendado)
brew install node

# O descargar desde nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
# Usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
```

### 3. Instalar Yarn (Opcional pero Recomendado)
```bash
# Instalar yarn globalmente
npm install -g yarn

# Verificar instalación
yarn --version
```

## 📦 Configuración del Proyecto

### 1. Clonar el Repositorio
```bash
# Clonar el proyecto
git clone <repository-url>
cd titanicchat

# O si tienes el código fuente
cd path/to/titanicchat
```

### 2. Instalar Dependencias
```bash
# Usando npm
npm install

# O usando yarn (recomendado)
yarn install
```

### 3. Configurar Variables de Entorno

#### Crear archivo `.env.local`
```bash
# Crear archivo de configuración
touch .env.local
```

#### Configurar variables
```env
# .env.local
# OpenAI API Key (REQUERIDA)
OPENAI_API_KEY=sk-your-openai-api-key-here

# API URL (opcional)
NEXT_PUBLIC_API_URL=

# Configuración de desarrollo (opcional)
NODE_ENV=development
```

### 4. Obtener API Key de OpenAI

1. **Crear cuenta en OpenAI**:
   - Ve a [platform.openai.com](https://platform.openai.com/)
   - Regístrate o inicia sesión

2. **Generar API Key**:
   - Ve a "API Keys" en el dashboard
   - Haz clic en "Create new secret key"
   - Copia la key generada

3. **Configurar límites de uso** (recomendado):
   - Ve a "Usage limits"
   - Establece límites mensuales
   - Configura alertas de uso

4. **Agregar la key al proyecto**:
   ```env
   OPENAI_API_KEY=sk-proj-abc123...xyz789
   ```

## 🚀 Primer Arranque

### 1. Verificar Configuración
```bash
# Verificar que las dependencias están instaladas
ls node_modules/

# Verificar archivo de configuración
cat .env.local
```

### 2. Ejecutar en Modo Desarrollo
```bash
# Usando npm
npm run dev

# O usando yarn
yarn dev
```

### 3. Verificar que Funciona
1. Abrir navegador en `http://localhost:3000`
2. Debería aparecer la interfaz del chat
3. Escribir un mensaje de prueba
4. Verificar que llega respuesta del asistente

## 🔍 Verificación de la Instalación

### 1. Tests de Conectividad
```bash
# Verificar que el servidor arranca
curl http://localhost:3000

# Verificar API endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","history":[]}'
```

### 2. Verificar Logs
```bash
# En la terminal donde ejecutaste npm run dev
# Deberías ver:
# ✓ Ready in 2000ms
# ○ Local: http://localhost:3000
```

### 3. Verificar en Navegador
- ✅ La página carga sin errores
- ✅ El campo de texto está disponible
- ✅ Se puede escribir un mensaje
- ✅ El botón de envío funciona
- ✅ Llegan respuestas del asistente

## 🛠️ Configuración del Entorno de Desarrollo

### 1. Editor de Código (VS Code)

#### Extensiones Recomendadas
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

#### Configuración de VS Code
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### 2. Configurar Git Hooks (Opcional)
```bash
# Instalar husky para git hooks
npm install --save-dev husky

# Configurar pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

### 3. Configurar Prettier (Opcional)
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 📊 Verificación de Performance

### 1. Build de Producción
```bash
# Crear build optimizado
npm run build

# Verificar que no hay errores
# Debería mostrar estadísticas del bundle
```

### 2. Análisis del Bundle
```bash
# Instalar analizador (opcional)
npm install --save-dev @next/bundle-analyzer

# Analizar bundle
npm run analyze
```

## 🚨 Troubleshooting de Instalación

### Problemas Comunes

#### Error: "Module not found"
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Port 3000 already in use"
```bash
# Usar puerto diferente
npm run dev -- -p 3001

# O encontrar y matar el proceso
lsof -ti:3000 | xargs kill -9
```

#### Error: "OpenAI API key not configured"
- Verificar que `.env.local` existe
- Verificar que la variable `OPENAI_API_KEY` está configurada
- Verificar que la API key es válida

#### Error: "Permission denied"
```bash
# En macOS/Linux, usar sudo si es necesario
sudo npm install -g yarn

# O cambiar permisos de npm
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### Logs de Debug
```bash
# Ejecutar con logs detallados
DEBUG=* npm run dev

# O solo logs de Next.js
DEBUG=next:* npm run dev
```

## 🔄 Actualización del Proyecto

### Actualizar Dependencias
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores (cuidado)
npm install package@latest
```

### Actualizar Next.js
```bash
# Actualizar Next.js específicamente
npm install next@latest react@latest react-dom@latest

# Verificar breaking changes en la documentación
```

## 📝 Configuración para Diferentes Entornos

### Desarrollo
```env
# .env.local
NODE_ENV=development
OPENAI_API_KEY=sk-dev-key...
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Staging
```env
# .env.staging
NODE_ENV=production
OPENAI_API_KEY=sk-staging-key...
NEXT_PUBLIC_API_URL=https://staging.domain.com
```

### Producción
```env
# .env.production
NODE_ENV=production
OPENAI_API_KEY=sk-prod-key...
NEXT_PUBLIC_API_URL=https://domain.com
```

## ✅ Checklist de Instalación Completa

- [ ] Node.js 18+ instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env.local` creado
- [ ] API key de OpenAI configurada
- [ ] Servidor de desarrollo arranca (`npm run dev`)
- [ ] Aplicación carga en navegador
- [ ] Chat funciona correctamente
- [ ] Build de producción exitoso (`npm run build`)
- [ ] Editor de código configurado
- [ ] Git hooks configurados (opcional)

---

**¡Instalación completa!** Ahora puedes proceder con el [desarrollo](./development.md) o [deployment](../deployment/deployment-guide.md). 