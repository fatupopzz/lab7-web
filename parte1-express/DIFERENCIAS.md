# Diferencias entre `http` nativo y `Express`

## Resumen

Node.js trae el modulo `http` integrado, que permite crear servidores web sin instalar nada. **Express** es una libreria construida encima de ese mismo modulo, pensada para hacer mas comodo y limpio el manejo de rutas, middlewares y respuestas.

En este laboratorio se migro el servidor del Lab 6 de `http` puro a Express, manteniendo las mismas rutas y funcionalidad.

---

## Comparacion general

| Aspecto | `http` nativo | `Express` |
|---|---|---|
| Tipo | Modulo nativo de Node | Libreria externa (`npm install express`) |
| Manejo de rutas | Manual con `if/else` sobre `req.url` | Metodos como `app.get()`, `app.post()` |
| Verbos HTTP | Hay que revisar `req.method` a mano | Se separa por metodo automaticamente |
| Headers y status | `res.writeHead(200, {...})` | `res.status(200).json(...)` |
| Body de requests | Hay que escuchar eventos `data`/`end` y parsear manualmente | `express.json()` lo parsea solo |
| Middlewares | No existen como concepto | Built-in con `app.use()` |
| Manejo de errores | Try/catch manual en cada ruta | Middleware de errores centralizado |
| 404 | Bloque `else` al final del handler | `app.use()` al final del archivo |

---

## Ventajas de Express

- **Menos codigo repetido.** No hace falta escribir `if (req.url === "/ruta")` en cada caso.
- **Mejor organizacion.** Cada ruta es su propia funcion, mas facil de leer.
- **Middlewares.** Se puede agregar logica que corra antes o despues de las rutas (logging, auth, parseo de JSON, etc.) sin meterla dentro de cada handler.
- **Helpers utiles.** Cosas como `res.json()`, `res.status()`, `res.send()` ahorran lineas y evitan errores tipograficos (como el `application-json` con guion del Lab 6).
- **Ecosistema.** Hay miles de middlewares listos (cors, helmet, morgan, etc.) que se enchufan con una linea.

## Ventajas de `http` nativo

- **Cero dependencias.** Util cuando se quiere algo super liviano o aprender los fundamentos.
- **Control total.** Si se necesita algo muy especifico de bajo nivel, no hay capa de abstraccion en el camino.
- **Mejor para entender que pasa por debajo.** Es lo que Express usa internamente.

---

## Como se ven las mismas rutas

### Antes (http nativo)
```js
const server = http.createServer(async (req, res) => {
  if (req.url === "/info") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensaje: "Ruta de info" }));
    return;
  }
  // ... mas if/else
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Ruta no encontrada");
});
```

### Despues (Express)
```js
app.get("/info", (req, res) => {
  res.json({ mensaje: "Ruta de info" });
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});
```

Mismo resultado, codigo mas limpio y mas declarativo.

---

## Conclusion

Para proyectos pequenos `http` funciona bien, pero apenas crece la cantidad de rutas o se necesita parsear bodies, manejar errores o agregar middlewares, Express se vuelve mucho mas practico. La migracion fue directa: cada bloque `if (req.url === ...)` se convirtio en un `app.get(...)` y el bloque final de 404 se convirtio en un `app.use()` al final.
