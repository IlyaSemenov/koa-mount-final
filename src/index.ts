import Koa from 'koa'
import compose from 'koa-compose'
import mount from 'koa-mount'

export default function mountFinal (prefix: string, middleware: Koa.Middleware) {
	return mount(prefix, compose([middleware, ctx => {
		// Middleware that does nothing (instead of falling through).
		ctx.status = 404
	}]))
}
