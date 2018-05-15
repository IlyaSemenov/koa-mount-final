import Koa from 'koa'
import compose from 'koa-compose'
import mount from 'koa-mount'

export default function mountFinal (prefix: string, app: Koa.Middleware | Koa) {
	const middlewares = app instanceof Koa ? [...app.middleware] : [app]
	middlewares.push(ctx => {
		// Middleware that does nothing (instead of falling through).
		ctx.status = 404
	})
	return mount(prefix, compose(middlewares))
}
