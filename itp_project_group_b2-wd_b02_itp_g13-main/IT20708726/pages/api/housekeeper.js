import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const Housekeeper = await prisma.Housekeeper.findMany();
        return res.send(Housekeeper);
    } else if (req.method === 'POST') {
        const { body: data } = req;
        const newHousekeeper = await prisma.Housekeeper.create({ data });
        return res.status(201).send(newHousekeeper);
    }
}