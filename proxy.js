import { NextResponse } from "next/server"


export async function proxy(req){
    const url = new URL(req.url);

    const token = await req.cookies.get("token")?.value;
    // If they are going to a login page, don't check for tokens/redirect
    const isAuthPage = url.pathname.startsWith("/auth") || url.pathname.startsWith("/admin/log-in");
    if (isAuthPage) {
        return NextResponse.next();
    }
    // Handle email verification redirection
    if(url.pathname === "/auth/verify-email"){
        const userToken = url.searchParams.get("token")
        if(userToken) return Response.redirect(new URL("/auth/verify-success", req.url))
    }

    if (!token && url.pathname.includes("/dashboard/user")){
        return Response.redirect( new URL("/auth/log-in", req.url));
    }
    if (!token && url.pathname.includes("/admin")) {
        return Response.redirect(new URL("/admin/log-in", req.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/user/:path*", "/auth/verify-email", "/invoice/:invoiceId", "/book-service", "/dashboard/admin/:path*", "/admin/:path*"],
}