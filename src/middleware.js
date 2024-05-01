"use server";

import { NextResponse , NextRequest} from "next/server";
import * as jose from 'jose';
import { cookies } from "next/headers";


export async function middleware(NextRequest) {

  const url = NextRequest.nextUrl;
  const isLoginSignup = url.pathname.includes("/login") || url.pathname.includes("/sign-up");

  if (isLoginSignup) {
    return NextResponse.next(); 
  }

  const token = cookies().get("token");
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }

  try {
    const jwt = token.value;
    const secret = new TextEncoder().encode(secretKey);
    // const { protectedHeader } = await jose.jwtVerify(jwt, secret, {
    //   issuer: 'urn:example:issuer', // Replace with your issuer
    //   audience: 'urn:example:audience', // Replace with your audience
    // });
   
   
    return NextResponse.next();

  } catch (error) {
    console.error('Error:++', error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
