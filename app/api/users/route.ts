import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
// if you remove NextRequest as parameter, Next.js will cache the output
// of the endpoint. So to prevent caching, we add the parameter.
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //     return NextResponse.json({}, { status: 401 })
  // }

  const users = await prisma.user.findMany({
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(users)
}
