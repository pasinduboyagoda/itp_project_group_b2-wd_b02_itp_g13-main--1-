import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const Eventinformation = await prisma.Eventinformation.findMany();
        return res.send(Eventinformation);
    } else if (req.method === 'POST') {
        const { body: data } = req;
        const newOffer = await prisma.Eventinformation.create({ data });
        return res.status(201).send(newOffer);
    }
}