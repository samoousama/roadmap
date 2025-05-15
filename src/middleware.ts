import { NextRequest, NextResponse } from "next/server";

// basic auth protection for dev environment
const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ":").split(":");

export function middleware(req: NextRequest) {
  if (!process.env.HTTP_BASIC_AUTH) return NextResponse.next();

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

    if (user === AUTH_USER && pwd === AUTH_PASS) {
      return NextResponse.next();
    }
  }

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: "/",
};
