import { NextResponse } from "next/server";

export async function middleware(req) {


  const refreshToken = req.cookies.get('refresh-token')?.value;
  const authHeader = req.headers["authorization"];



  if ((req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')) && refreshToken) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if ((req.nextUrl.pathname.startsWith('/user-page')) && !(refreshToken)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  // if ((req.nextUrl.pathname.startsWith('/api/auth/logout'))) {
  //   response.cookies.delete('refresh-token');
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }


  // if (!authHeader) return new NextResponse(
  //   JSON.stringify({ message: 'authentication failed' }),
  //   { status: 403 }
  // );




  // jwt.verify(
  //   accessToken,
  //   process.env.ACCESS_TOKEN_SECRET,
  //   (err, decode) => {
  //     if (err) {
  //       return new NextResponse(
  //         JSON.stringify({ message: 'authentication failed' }),
  //         { status: 403 }
  //       )
  //     };

  //     return
  //   }
  // );



  // const url = req.url;

  // if (!verifiedToken) {
  //   if (req.nextUrl.pathname.startsWith('/api/auth/getuser') && verifiedToken) {
  //     return new NextResponse(
  //       JSON.stringify({ message: 'authentication failed' }),
  //       { status: 401 }
  //     )
  //   }
  // }

}



export const config = {
  matcher: ['/user-page', '/login', '/register']
}


