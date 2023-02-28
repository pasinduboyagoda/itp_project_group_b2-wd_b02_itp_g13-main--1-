import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.type === "deposit_create") {
    const { date, basic_salary, allowances, deductions, email } = req.body;
    const newDeposit = await prisma.deposit.create({
      data: {
        date: date,
        email,
        basic_salary,
        allowances,
        deductions,
      },
    });
    if (newDeposit) {
      return res.status(200).json({
        error: false,
        message: `Deposit:${newDeposit.id} Is Created`,
        data: newDeposit,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Deposit could not be created`,
      data: [],
    });
  } else if (req.query.type === "deposit_update") {
    const { date, basic_salary, allowances, deductions, email, id } = req.body;
    const updatedDeposit = await prisma.deposit.update({
      where: {
        id: +id,
      },
      data: {
        date,
        email,
        basic_salary,
        allowances,
        deductions,
      },
    });
    if (updatedDeposit) {
      return res.status(200).json({
        error: false,
        message: `Deposit:${updatedDeposit.id} Is Updated`,
        data: updatedDeposit,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Deposit could not be updated`,
      data: [],
    });
  } else if (req.query.type === "deposit_delete_one") {
    const { id } = req.body;
    const deletedDeposit = await prisma.deposit.delete({
      where: {
        id: +id,
      },
    });
    if (deletedDeposit) {
      return res.status(200).json({
        error: false,
        message: `Deposit:${deletedDeposit.id} Is deleted`,
        data: deletedDeposit,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Deposit could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "deposit_delete_all") {
    const deletedCustomers = await prisma.deposit.deleteMany();
    if (deletedCustomers) {
      return res.status(200).json({
        error: false,
        message: `All deposits deleted`,
        data: [],
      });
    }
    return res.status(500).send({
      error: true,
      message: `Deposits could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "deposit_get") {
    const allDeposits = await prisma.deposit.findMany();
    if (allDeposits) {
      return res.status(200).json({
        error: false,
        message: ``,
        data: allDeposits,
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
