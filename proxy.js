import { NextResponse } from "next/server"


export async function proxy(req){
    const url = new URL(req.url);

    const token = await req.cookies.get("token")?.value;

    if(url.pathname === "/auth/verify-email"){
        const userToken = url.searchParams.get("token")
        if(userToken) return Response.redirect(new URL("/auth/verify-success", req.url))
    }
    if(!token) {
        return Response.redirect( new URL("/auth/log-in", req.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/user/:path*", "/auth/verify-email", "/invoice/:invoiceId", "/book-service"]
}