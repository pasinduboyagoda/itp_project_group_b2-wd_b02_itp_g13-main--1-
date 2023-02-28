import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const offers = await prisma.offer.findMany();
        return res.send(offers);
    } else if (req.method === 'POST') {
        const { body: data } = req;
        const newOffer = await prisma.offer.create({ data });
        return res.status(201).send(newOffer);
    }
}