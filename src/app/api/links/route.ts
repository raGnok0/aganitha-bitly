import { NextResponse } from 'next/server'
import Prisma from '@/lib/db'
import { generateShortId } from '@/lib/shortIdGenerator'

export async function GET() {
    const all = await Prisma.link.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(all)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { url, customCode } = body;

        if (!url) return new NextResponse("URL is Required", { status: 400 })

        let code = customCode?.trim() || generateShortId()

        let exists = await Prisma.link.findUnique({ where: { code } })

        while (exists) {
            code = generateShortId();
            exists = await Prisma.link.findUnique({ where: { code } })
        }

        const link = await Prisma.link.create({
            data: { url, code }
        })
        return NextResponse.json({ link }, { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "internal" }, { status: 500 })
    }
}