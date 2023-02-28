import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.type === "customer_create") {
    const { fullName, roomNum, address, email, idNum, contactNum } = req.body;
    const newCustomer = await prisma.customerdetail.create({
      data: {
        fullName,
        roomNum,
        address,
        email,
        idNum,
        contactNum,
      },
    });
    if (newCustomer) {
      return res.status(200).json({
        error: false,
        message: `Customer:${newCustomer.cuId} Is Created`,
        data: newCustomer,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Customer could not be created`,
      data: [],
    });
  } else if (req.query.type === "customer_update") {
    const { cuId, fullName, roomNum, address, email, idNum, contactNum } =
      req.body;
    const updatedCustomer = await prisma.customerdetail.update({
      where: {
        cuId: +cuId,
      },
      data: {
        fullName,
        roomNum,
        address,
        email,
        idNum,
        contactNum,
      },
    });
    if (updatedCustomer) {
      return res.status(200).json({
        error: false,
        message: `Customer:${updatedCustomer.cuId} Is Updated`,
        data: updatedCustomer,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Customer could not be updated`,
      data: [],
    });
  } else if (req.query.type === "customer_delete_one") {
    const { cuId } = req.body;
    const deletedCustomer = await prisma.customerdetail.delete({
      where: {
        cuId: +cuId,
      },
    });
    if (deletedCustomer) {
      return res.status(200).json({
        error: false,
        message: `Customer:${deletedCustomer.cuId} Is deleted`,
        data: deletedCustomer,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Customer could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "customer_delete_all") {
    const deletedCustomers = await prisma.customerdetail.deleteMany();
    if (deletedCustomers) {
      return res.status(200).json({
        error: false,
        message: `All customers deleted`,
        data: [],
      });
    }
    return res.status(500).send({
      error: true,
      message: `Customers could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "customer_get") {
    const allCustomers = await prisma.customerdetail.findMany();
    if (allCustomers) {
      return res.status(200).json({
        error: false,
        message: ``,
        data: allCustomers,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Customers could not be retrieved`,
      data: [],
    });
  }
  return res.status(500).send({
    error: true,
    message: `Something went wrong`,
    data: [],
  });
}
