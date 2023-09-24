import { Request } from "express"


export type requestWithBody<B> = Request<{},{},B,{}>
export type requestWithParams<P> = Request<P,{},{},{}>
export type requestWithParamsAndBody<P,B> = Request<P,{},B,{}>