# 🚀 Guía de Deployment

## 📋 Resumen

Esta guía cubre el proceso completo de deployment de TitanicChat en diferentes entornos, desde staging hasta producción.

## 🎯 Opciones de Deployment

### 1. **Vercel** (Recomendado)
- ✅ Optimizado para Next.js
- ✅ Deployment automático desde Git
- ✅ Edge functions globales
- ✅ SSL automático

### 2. **Netlify**
- ✅ Fácil configuración
- ✅ CDN global
- ✅ Continuous deployment

### 3. **Docker + Cloud**
- ✅ Control total
- ✅ Escalabilidad
- ✅ Multi-cloud

### 4. **VPS/Servidor Dedicado**
- ✅ Control completo
- ✅ Configuración personalizada

## 🌐 Deployment en Vercel

### Prerrequisitos
- Cuenta en [Vercel](https://vercel.com)
- Repositorio Git (GitHub, GitLab, Bitbucket)
- API key de OpenAI

### Pasos de Deployment

#### 1. Preparar el Proyecto
```bash
# Verificar que el build funciona
npm run build

# Verificar que no hay errores de lint
npm run lint
```

#### 2. Configurar Variables de Entorno
En el dashboard de Vercel:
```env
OPENAI_API_KEY=sk-proj-your-key-here
NODE_ENV=production
```

#### 3. Deploy desde Git
```bash
# Conectar repositorio en Vercel dashboard
# O usar Vercel CLI
npm i -g vercel
vercel --prod
```

#### 4. Configuración Avanzada
```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

## 🐳 Deployment con Docker

### Dockerfile
```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
CMD HOSTNAME="0.0.0.0" node server.js
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  titanicchat:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - titanicchat
    restart: unless-stopped
```

### Comandos de Docker
```bash
# Build de la imagen
docker build -t titanicchat .

# Ejecutar contenedor
docker run -p 3000:3000 -e OPENAI_API_KEY=your-key titanicchat

# Con Docker Compose
docker-compose up -d
```

## ☁️ Deployment en AWS

### AWS Amplify
```bash
# Instalar Amplify CLI
npm install -g @aws-amplify/cli

# Configurar proyecto
amplify init
amplify add hosting
amplify publish
```

### AWS ECS (Fargate)
```json
{
  "family": "titanicchat",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "titanicchat",
      "image": "your-account.dkr.ecr.region.amazonaws.com/titanicchat:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "OPENAI_API_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:openai-key"
        }
      ]
    }
  ]
}
```

## 🌍 Deployment en Google Cloud

### Cloud Run
```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/titanicchat', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/titanicchat']
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'titanicchat'
      - '--image'
      - 'gcr.io/$PROJECT_ID/titanicchat'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
```

## 🔧 Configuración de Nginx

### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server titanicchat:3000;
    }
    
    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$server_name$request_uri;
    }
    
    server {
        listen 443 ssl http2;
        server_name your-domain.com;
        
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        
        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## 🔒 SSL/TLS Configuration

### Let's Encrypt con Certbot
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d your-domain.com

# Auto-renovación
sudo crontab -e
# Agregar: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoreo y Logging

### Health Check Endpoint
```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
}
```

### Logging con Winston
```bash
npm install winston
```

```typescript
// src/lib/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔐 Seguridad en Producción

### Variables de Entorno Seguras
```bash
# Usar servicios de secrets management
# AWS Secrets Manager
# Google Secret Manager
# Azure Key Vault
```

### Headers de Seguridad
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

## 📈 Optimizaciones de Performance

### Compresión
```typescript
// next.config.ts
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false
};
```

### CDN Configuration
```typescript
// next.config.ts
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.your-domain.com' 
    : '',
};
```

## ✅ Checklist de Deployment

### Pre-deployment
- [ ] Tests pasando
- [ ] Build exitoso
- [ ] Variables de entorno configuradas
- [ ] SSL/TLS configurado
- [ ] Dominio configurado
- [ ] Monitoreo configurado

### Post-deployment
- [ ] Health check funcionando
- [ ] Chat funcional
- [ ] Performance aceptable
- [ ] Logs funcionando
- [ ] Métricas recolectándose
- [ ] Backup configurado

## 🔄 Rollback Strategy

### Vercel
```bash
# Rollback a deployment anterior
vercel rollback [deployment-url]
```

### Docker
```bash
# Rollback con Docker
docker tag titanicchat:latest titanicchat:backup
docker pull titanicchat:previous
docker tag titanicchat:previous titanicchat:latest
docker-compose up -d
```

---

**Próximos pasos**: Configurar monitoreo avanzado y automatización completa de CI/CD. 