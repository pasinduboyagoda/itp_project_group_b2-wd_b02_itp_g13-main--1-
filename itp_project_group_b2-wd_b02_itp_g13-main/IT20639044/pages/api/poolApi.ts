import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.type === "pool_create") {
    const { fullName, numAttendance, date, time} = req.body;
    const newPool = await prisma.pooldetail.create({
      data: {
        fullName,
        numAttendance,
        date,
        time,
        
        
      },
    });
    if (newPool) {
      return res.status(200).json({
        error: false,
        message: `Pool:${newPool.poolId} Is Created`,
        data: newPool,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Pool could not be created`,
      data: [],
    });
  } else if (req.query.type === "pool_update") {
    const { poolId, fullName, numAttendance, date, time} =
      req.body;
    const updatedPool = await prisma.pooldetail.update({
      where: {
        poolId: +poolId,
      },
      data: {
        fullName,
        numAttendance,
        date,
        time,
       
        
      },
    });
    if (updatedPool) {
      return res.status(200).json({
        error: false,
        message: `Pool:${updatedPool.poolId} Is Updated`,
        data: updatedPool,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Pool could not be updated`,
      data: [],
    });
  } else if (req.query.type === "pool_delete_one") {
    const { poolId } = req.body;
    const deletedPool = await prisma.pooldetail.delete({
      where: {
        poolId: +poolId,
      },
    });
    if (deletedPool) {
      return res.status(200).json({
        error: false,
        message: `Parking:${deletedPool.poolId} Is deleted`,
        data: deletedPool,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Pool could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "pool_delete_all") {
    const deletedPool = await prisma.pooldetail.deleteMany();
    if (deletedPool) {
      return res.status(200).json({
        error: false,
        message: `All pool deleted`,
        data: [],
      });
    }
    return res.status(500).send({
      error: true,
      message: `Pool could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "pool_get") {
    const allPools = await prisma.pooldetail.findMany();
    if (allPools) {
      return res.status(200).json({
        error: false,
        message: ``,
        data: allPools,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Poolcould not be retrieved`,
      data: [],
    });
  }
  return res.status(500).send({
    error: true,
    message: `Something went wrong`,
    data: [],
  });
}
