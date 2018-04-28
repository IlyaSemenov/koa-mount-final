# koa-mount-final

`koa-mount-final` is a wrapper around [koa-mount](https://github.com/koajs/mount) which prevents matched (but unhandled) requests from falling down the middleware stack.

All requests under `/prefix` will either be handled by the mounted middleware, or the stack will be immediately unwinded (probably returning `HTTP 404`).

This is useful when you have API server and catch-all frontend server (e.g. Nuxt.js) running under the same Koa instance, and want to make sure that the frontend will never see any API requests (even those that were not handled by the API server).

## Example

```js
const Koa = require('koa');
const mount = require('koa-mount');
const mountFinal = require('koa-mount-final')
const Router = require('koa-router')

const api = Router()
api.get('/ping', async ctx => {
  ctx.body = 'pong'
})

async function frontend (ctx) {
  ctx.body = '<h1>Hello, world!</h1>'
}

const app = new Koa();
app.use(mount('/api/v1', api.routes()))
app.use(mountFinal('/api/v2', api.routes()))
app.use(frontend)

app.listen(3000)
console.log('Listening on port 3000')
```

The difference between `koa-mount` and `koa-mount-final` will be in handling missing routes under `/api`:

```console
$ GET /
<h1>Hello, world!</h1>

$ GET /api/v1/ping
pong

$ GET /api/v2/ping
pong

$ GET /api/v1/wazzup
<h1>Hello, world!</h1>

$ GET /api/v2/wazzup
Not Found
```
