import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.type === "parking_create") {
    const { fullName, vehicleType, vehicleregNum, email, idNum, contactNum } = req.body;
    const newParking = await prisma.parkingdetail.create({
      data: {
        fullName,
        vehicleType,
        vehicleregNum,
        email,
        idNum,
        contactNum,
      },
    });
    if (newParking) {
      return res.status(200).json({
        error: false,
        message: `Parking:${newParking.parkId} Is Created`,
        data: newParking,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Parking could not be created`,
      data: [],
    });
  } else if (req.query.type === "parking_update") {
    const { parkId, fullName, vehicleType, vehicleregNum, email, idNum, contactNum } =
      req.body;
    const updatedParking = await prisma.parkingdetail.update({
      where: {
        parkId: +parkId,
      },
      data: {
        fullName,
        vehicleType,
        vehicleregNum,
        email,
        idNum,
        contactNum,
      },
    });
    if (updatedParking) {
      return res.status(200).json({
        error: false,
        message: `Parking:${updatedParking.parkId} Is Updated`,
        data: updatedParking,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Parking could not be updated`,
      data: [],
    });
  } else if (req.query.type === "parking_delete_one") {
    const { parkId } = req.body;
    const deletedParking = await prisma.parkingdetail.delete({
      where: {
        parkId: +parkId,
      },
    });
    if (deletedParking) {
      return res.status(200).json({
        error: false,
        message: `Parking:${deletedParking.parkId} Is deleted`,
        data: deletedParking,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Parking could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "parking_delete_all") {
    const deletedParking = await prisma.parkingdetail.deleteMany();
    if (deletedParking) {
      return res.status(200).json({
        error: false,
        message: `All parking deleted`,
        data: [],
      });
    }
    return res.status(500).send({
      error: true,
      message: `Parking could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "parking_get") {
    const allParkings = await prisma.parkingdetail.findMany();
    if (allParkings) {
      return res.status(200).json({
        error: false,
        message: ``,
        data: allParkings,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Parking could not be retrieved`,
      data: [],
    });
  }
  return res.status(500).send({
    error: true,
    message: `Something went wrong`,
    data: [],
  });
}
