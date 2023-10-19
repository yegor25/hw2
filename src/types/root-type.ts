import { Request } from "express"


export type requestWithBody<B> = Request<{},{},B,{}>
export type requestWithParams<P> = Request<P,{},{},{}>
export type requestWithParamsAndBody<P,B> = Request<P,{},B,{}>
export type requestWithQuery<Q> = Request<{}, {},{},Q>
export type requestWithQueryAndParams<P,Q> = Request<P, {},{},Q>

export type errorFormatterType = {
    message: string,
    field: string
}
 