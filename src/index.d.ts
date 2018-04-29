// Generated with rollup and then manually adjusted with namespace hack.
// TODO: generate this automatically.

/// <reference types="koa" />
/// <reference types="koa-compose" />
import Koa from 'koa';
import compose from 'koa-compose';
declare function mountFinal(prefix: string, middleware: Koa.Middleware): compose.Middleware<Koa.Context>;
declare namespace mountFinal {}
export = mountFinal
