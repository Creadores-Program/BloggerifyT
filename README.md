# BloggerifyT

**Transpiler for Google Blogger to create classic templates/themes easily!**  
**Transpilador para Blogger Google para crear Plantillas/Temas clásicos fácilmente.**

---

## ¿Qué es BloggerifyT?

BloggerifyT es una herramienta que te permite desarrollar plantillas para Blogger (Google) usando archivos modernos (`.js`, `.css`, `.html`, imágenes, etc.) y transpilar todo a una plantilla clásica lista para usar en Blogger.  
Incluye un módulo de Node.js y una GitHub Action para automatizar el proceso.

---

## Características

- Transpila proyectos con estructura modular (CommonJS) a un solo archivo HTML compatible con Blogger.
- Soporta archivos JS, CSS, HTML, JSON e imágenes (como base64).
- Permite incluir recursos externos y plantillas parciales.
- Incluye una GitHub Action para CI/CD.

---

## Inclusión dinámica de HTML con `div src`

BloggerifyT permite incluir archivos HTML de forma dinámica dentro de tu plantilla usando la sintaxis:

```html
<div src="ruta/archivo.html"></div>
```

Durante el proceso de transpile, BloggerifyT reemplazará automáticamente cada `<div src="..."></div>` por el contenido del archivo HTML especificado en el atributo `src`.  
Esto facilita la reutilización de fragmentos o componentes HTML en diferentes partes de tu plantilla.

**Ejemplo:**

Si tienes un archivo `partials/header.html`, puedes incluirlo en tu `index.html` así:

```html
<body>
  <div src="partials/header.html"></div>
  <!-- más contenido -->
</body>
```

El contenido de `partials/header.html` se insertará automáticamente en ese lugar al transpilar el proyecto.

---

## Instalación

### Como módulo de Node.js

Puedes instalar la versión más reciente desde los lanzamientos de GitHub usando el archivo `.tgz`:

```sh
npm install https://github.com/Creadores-Program/BloggerifyT/releases/download/v1.0.1/BloggerifyT-1.0.0.tgz
```

O descarga el `.tgz` desde la [página de lanzamientos](https://github.com/Creadores-Program/BloggerifyT/releases) y luego:

```sh
npm install ./BloggerifyT-1.0.0.tgz
```

---

## Uso como módulo Node.js

```js
const BloggerifyT = require('BloggerifyT');

// Transpila el proyecto en './demo' y guarda el resultado en './demo/BloggerifyT'
BloggerifyT('./demo', './demo/BloggerifyT');
```

- El primer parámetro es la ruta al proyecto fuente.
- El segundo parámetro es la carpeta de salida donde se guardará la plantilla Blogger generada.

---

## Uso como GitHub Action

Puedes usar BloggerifyT en tus flujos de trabajo de GitHub Actions para transpilar automáticamente tus plantillas al hacer push o pull request.

### Ejemplo de workflow (`.github/workflows/ActionCI.yml`):

```yaml
name: ActionCI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: BloggerifyT
        uses: Creadores-Program/BloggerifyT@v1.0.1
        with:
          path: './demo'
      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: blogger-template
          path: ./demo/BloggerifyT/
```

- El input `path` debe apuntar a la carpeta de tu proyecto Blogger.

---

## Estructura recomendada del proyecto

```
mi-proyecto/
├── index.html
├── main.css
├── index.js
├── package.json
├── ...otros archivos y carpetas
```

---

## Créditos

Creado por [Creadores Program](https://github.com/Creadores-Program/) y API de CommonJS [simple-browser-require](https://www.npmjs.com/package/simple-browser-require).

---

## Licencia

MIT
