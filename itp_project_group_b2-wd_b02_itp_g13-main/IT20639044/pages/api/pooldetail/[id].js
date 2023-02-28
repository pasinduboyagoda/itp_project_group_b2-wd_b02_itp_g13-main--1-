import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'DELETE') {
        const pooldetail = await prisma.pooldetail.delete({
            where: {
                parkId: +req.query.id
            }
        });
        return res.send(pooldetail);
    } else if (req.method === 'POST') {
        const { body: data } = req;
        const newOffer = await prisma.pooldetail.create({ data });
        return res.status(201).send(newOffer);
    }
}