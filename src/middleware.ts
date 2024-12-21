import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const pathname = new URL(req.url).pathname;
        const response = NextResponse.next();
        response.headers.set("x-url-pathname", pathname);
        return response;
    },
    {
        pages: {
            signIn: "/",
        },
    }
);

export const config = {
    matcher: ["/my-events", "/add-event", "/edit-event/:id"],
};