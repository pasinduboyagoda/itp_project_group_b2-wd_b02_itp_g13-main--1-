import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const customerdetail = await prisma.customerdetail.findMany();
        return res.send(customerdetail);
    } else if (req.method === 'POST') {
        const { body: data } = req;
        const newOffer = await prisma.customerdetail.create({ data });
        return res.status(201).send(newOffer);
    }
}