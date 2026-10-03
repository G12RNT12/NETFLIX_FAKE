export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>No pudimos cargar la página</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #211e1a; color: #f1ece3; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #b8afa4; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #e5ae70; color: #211e1a; }
      .secondary { background: transparent; color: #f1ece3; border-color: #655c50; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>No pudimos cargar la página</h1>
      <p>Intenta de nuevo o vuelve al catálogo para seguir explorando.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Intentar de nuevo</button>
        <a class="secondary" href="/">Volver al catálogo</a>
      </div>
    </div>
  </body>
</html>`;
}
