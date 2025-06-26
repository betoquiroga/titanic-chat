# 🔧 Guía de Troubleshooting

## 🚨 Problemas Comunes y Soluciones

### 1. La aplicación no carga

#### Síntomas:
- Página en blanco
- Error 404
- Mensaje "This site can't be reached"

#### Soluciones:
1. **Verificar URL**: Asegúrate de usar la URL correcta
2. **Limpiar caché**: 
   - Chrome: `Ctrl+Shift+Delete` (Windows) / `Cmd+Shift+Delete` (Mac)
   - Firefox: `Ctrl+Shift+Delete` (Windows) / `Cmd+Shift+Delete` (Mac)
3. **Modo incógnito**: Prueba en ventana privada/incógnito
4. **Otro navegador**: Intenta con un navegador diferente
5. **Reiniciar router**: Desconecta y reconecta tu router

### 2. No puedo enviar mensajes

#### Síntomas:
- Botón de envío desactivado
- Mensaje no se envía al presionar Enter
- Campo de texto no responde

#### Soluciones:
1. **Verificar texto**: Asegúrate de que hay texto en el campo
2. **Esperar respuesta**: No envíes mientras hay una respuesta en progreso
3. **Recargar página**: `F5` o `Ctrl+R` (Windows) / `Cmd+R` (Mac)
4. **JavaScript habilitado**: Verifica que JavaScript esté activado
5. **Extensiones del navegador**: Desactiva temporalmente ad-blockers

### 3. Respuestas muy lentas o no llegan

#### Síntomas:
- Indicador de carga permanente
- Respuesta tarda más de 30 segundos
- Error de timeout

#### Soluciones:
1. **Paciencia**: OpenAI puede tener alta demanda
2. **Conexión a internet**: Verifica tu velocidad de conexión
3. **Reintenta**: Envía el mensaje nuevamente
4. **Mensaje más corto**: Reduce la longitud de tu consulta
5. **Horario diferente**: Intenta en horarios de menor demanda

### 4. Errores de conexión

#### Síntomas:
- "Error al enviar el mensaje"
- "Error de conexión"
- "Error interno del servidor"

#### Soluciones:
1. **Verificar internet**: Prueba abrir otras páginas web
2. **Reiniciar navegador**: Cierra y abre el navegador completamente
3. **Cambiar red**: Prueba con WiFi diferente o datos móviles
4. **VPN**: Si usas VPN, intenta desactivarla temporalmente
5. **Firewall**: Verifica que no esté bloqueando la aplicación

### 5. Problemas de visualización

#### Síntomas:
- Texto cortado o superpuesto
- Botones fuera de lugar
- Colores incorrectos
- Elementos desalineados

#### Soluciones:
1. **Zoom del navegador**: Restablece zoom al 100% (`Ctrl+0`)
2. **Tamaño de ventana**: Redimensiona la ventana del navegador
3. **Actualizar navegador**: Usa la versión más reciente
4. **Limpiar caché**: Elimina archivos temporales del navegador
5. **Modo oscuro**: Cambia entre modo claro y oscuro

### 6. Problemas en móviles

#### Síntomas:
- Teclado cubre el campo de texto
- Elementos muy pequeños
- Scroll no funciona correctamente

#### Soluciones:
1. **Rotar dispositivo**: Prueba orientación horizontal
2. **Zoom**: Usa pellizco para ajustar zoom
3. **Navegador móvil**: Prueba Chrome o Safari móvil
4. **Actualizar app**: Actualiza la aplicación del navegador
5. **Reiniciar dispositivo**: Reinicio completo del teléfono/tablet

## 🛠️ Diagnóstico Avanzado

### Verificar Console del Navegador

1. **Abrir Developer Tools**:
   - Chrome/Edge: `F12` o `Ctrl+Shift+I`
   - Firefox: `F12` o `Ctrl+Shift+I`
   - Safari: `Cmd+Option+I`

2. **Ir a Console**:
   - Busca mensajes de error en rojo
   - Copia el mensaje completo para soporte

3. **Verificar Network**:
   - Ve a la pestaña "Network"
   - Recarga la página
   - Busca requests fallidos (en rojo)

### Información del Sistema

Para reportar problemas, incluye:
- **Navegador y versión**: Chrome 120.0, Firefox 119.0, etc.
- **Sistema operativo**: Windows 11, macOS 14, iOS 17, etc.
- **Dispositivo**: Desktop, iPhone 15, Samsung Galaxy, etc.
- **Conexión**: WiFi, 4G, fibra óptica, etc.

## 🚨 Códigos de Error Específicos

### Error 400 - Bad Request
- **Causa**: Mensaje vacío o formato incorrecto
- **Solución**: Verifica que hay texto en tu mensaje

### Error 401 - Unauthorized
- **Causa**: API key inválida o expirada
- **Solución**: Contacta al administrador

### Error 429 - Too Many Requests
- **Causa**: Demasiadas peticiones muy rápido
- **Solución**: Espera unos minutos antes de continuar

### Error 500 - Internal Server Error
- **Causa**: Problema en el servidor
- **Solución**: Espera e intenta más tarde

### Error 503 - Service Unavailable
- **Causa**: Servidor sobrecargado o en mantenimiento
- **Solución**: Intenta más tarde

## 📱 Problemas Específicos por Dispositivo

### Windows
- **Problema**: Fuentes borrosas
- **Solución**: Ajustar configuración de DPI en Windows

### macOS
- **Problema**: Scroll suave no funciona
- **Solución**: Verificar configuración de trackpad

### iOS
- **Problema**: Teclado no aparece
- **Solución**: Tocar directamente el campo de texto

### Android
- **Problema**: App se cierra sola
- **Solución**: Limpiar caché del navegador

## 🔍 Herramientas de Diagnóstico

### Test de Conectividad
```bash
# Verificar conexión básica
ping google.com

# Test de velocidad
speedtest.net
```

### Verificar JavaScript
1. Ve a: `chrome://settings/content/javascript`
2. Asegúrate de que esté "Permitido"

### Limpiar Datos del Sitio
1. Chrome: `chrome://settings/content/all`
2. Busca el dominio de la aplicación
3. Elimina todos los datos

## 📞 Cuándo Contactar Soporte

Contacta soporte técnico si:
- ❌ Los pasos anteriores no resuelven el problema
- ❌ El error persiste por más de 24 horas
- ❌ Múltiples usuarios reportan el mismo problema
- ❌ Hay pérdida de datos o información importante

### Información a Incluir en el Reporte

```
Descripción del problema:
[Describe qué estaba haciendo cuando ocurrió]

Pasos para reproducir:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

Comportamiento esperado:
[Qué debería haber pasado]

Comportamiento actual:
[Qué pasó realmente]

Información del sistema:
- Navegador: [Chrome 120.0]
- OS: [Windows 11]
- Dispositivo: [Desktop/Mobile]
- Hora del error: [2024-01-15 14:30]

Mensajes de error:
[Copia exacta de cualquier mensaje de error]

Capturas de pantalla:
[Adjunta imágenes si es posible]
```

## 🔄 Mantenimiento Preventivo

### Recomendaciones Semanales
- ✅ Limpiar caché del navegador
- ✅ Actualizar navegador a la última versión
- ✅ Verificar velocidad de conexión
- ✅ Reiniciar dispositivo

### Recomendaciones Mensuales
- ✅ Actualizar sistema operativo
- ✅ Revisar extensiones del navegador
- ✅ Limpiar archivos temporales
- ✅ Verificar configuración de seguridad

---

**¿Sigues teniendo problemas?** Contacta al soporte técnico con la información detallada del error. 