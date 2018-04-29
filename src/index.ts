import Koa from 'koa'
import compose from 'koa-compose'
import mount from 'koa-mount'

function mountFinal (prefix: string, middleware: Koa.Middleware) {
	return mount(prefix, compose([middleware, ctx => {
		// Middleware that does nothing (instead of falling through).
		ctx.status = 404
	}]))
}

export { mountFinal as mount }

export default mount

// NOTE: both default and non-default exports are required.
// Otherwise, import will lead to either of:
// - koa_mount_final_1.default is not a function
// - Cannot invoke an expression whose type lacks a call signature.
//
// Alternatively, namespace mountFinal {} hack can be used,
// but I don't know how to have rollup-plugin-typescript2 to emit it.
