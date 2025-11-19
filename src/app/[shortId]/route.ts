import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(req: Request, ctx: { params: Promise<{shortId : string}>} ){
    const { shortId } = await ctx.params
    const link = await prisma.link.findUnique({ where : { code: shortId }})

    if(!link) return new NextResponse("Not Found", {status: 404})

    await prisma.link.update({
        where: { code: shortId },
        data: { clicks: link.clicks+1 , lastClicked: new Date()}
    })
    return NextResponse.redirect(link.url, { status : 302})
}