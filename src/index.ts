const compose = require('koa-compose')
const mount = require('koa-mount')

export default function mountFinal (path, middleware) {
	return mount(path, compose([middleware, ctx => {
		// Middleware that does nothing (instead of falling through).
		ctx.status = 404
	}]))
}
