# CV template prototipo

Prototipo de SerenGPT para crear un CV, elegir una plantilla y exportarlo.

## Requisitos

- Node.js 24 o superior

## Uso

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La raíz redirige a `/es`.

| Ruta | Qué muestra |
| --- | --- |
| `/es` | Home |
| `/es/crear-cv` | Editor del CV |
| `/es/exportar` | Vista previa y descarga |

`npm run check` corre lint, typecheck y el build de producción.
