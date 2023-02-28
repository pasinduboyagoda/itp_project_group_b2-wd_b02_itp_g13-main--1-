import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const eventdetails = await prisma.eventdetails.findMany();
        return res.send(eventdetails);
    } else if (req.method === 'POST') {
        const { body: data } = req;
        const newOffer = await prisma.eventdetails.create({ data });
        return res.status(201).send(newOffer);
    }
}