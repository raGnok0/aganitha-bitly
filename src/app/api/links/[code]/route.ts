import { NextResponse } from 'next/server'
import Prisma from '@/lib/db'

export async function GET(req: Request , ctx: {params: Promise<{code: string}>}){
    const { code }= await ctx.params

    if(code){
        const link = await Prisma.link.findUnique({ where: {code}})
        if(!link) return NextResponse.json({ error: `${code} does not exist`}, {status: 404})
        return NextResponse.json(link)
    }
}

export async function DELETE(req: Request, ctx: {params: Promise<{code: string}>}){
    try{
        const { code }  = await ctx.params;
        if(!code) return NextResponse.json({error: "code required"}, {status: 400})

        await Prisma.link.delete({where: {code}})
        return NextResponse.json({ok: true})
    }catch(err){
        console.log(err);
        return NextResponse.json({error: "Delection Error"}, {status: 500})
    }
}