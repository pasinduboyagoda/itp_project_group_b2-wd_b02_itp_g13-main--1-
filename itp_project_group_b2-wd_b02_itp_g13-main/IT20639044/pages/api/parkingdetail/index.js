import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const parkingdetail = await prisma.parkingdetail.findMany();
        return res.send(parkingdetail);
    } else if (req.method === 'POST') {
        const { body: data } = req;
        const newOffer = await prisma.parkingdetail.create({ data });
        return res.status(201).send(newOffer);
    }
}