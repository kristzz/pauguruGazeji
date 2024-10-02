// app/api/register/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Add your registration logic here (e.g., saving user to database)

  return NextResponse.json({ message: 'User registered successfully', email });
}
