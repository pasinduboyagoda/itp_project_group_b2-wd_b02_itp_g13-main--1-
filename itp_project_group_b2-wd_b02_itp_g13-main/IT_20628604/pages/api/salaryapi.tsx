import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.type === "salary_create") {
    const { empname, empbankacc, emptype, basicsal, allownce, numofday } = req.body;
    const newsalary = await prisma.salary.create({
      data: {
        empname,
        empbankacc,
        emptype,
        basicsal,
        allownce,
        numofday,
      },
    });
    if (newsalary) {
      return res.status(200).json({
        error: false,
        message: `salary:${newsalary.empId} Is Created`,
        data: newsalary,
      });
    }
    return res.status(500).send({
      error: true,
      message: `salary could not be created`,
      data: [],
    });
  } else if (req.query.type === "salary_update") {
    const { empId, empname, empbankacc, emptype, basicsal, allownce, numofday } =
      req.body;
    const updatedsalary = await prisma.salary.update({
      where: {
        empId: +empId,
      },
      data: {
        empname,
        empbankacc,
        emptype,
        basicsal,
        allownce,
        numofday,
      },
    });
    if (updatedsalary) {
      return res.status(200).json({
        error: false,
        message: `salary:${updatedsalary.empId} Is Updated`,
        data: updatedsalary,
      });
    }
    return res.status(500).send({
      error: true,
      message: `salary could not be updated`,
      data: [],
    });
  } else if (req.query.type === "salary_delete_one") {
    const { empId } = req.body;
    const deletedsalary = await prisma.salary.delete({
      where: {
        empId: +empId,
      },
    });
    if (deletedsalary) {
      return res.status(200).json({
        error: false,
        message: `salary:${deletedsalary.empId} Is deleted`,
        data: deletedsalary,
      });
    }
    return res.status(500).send({
      error: true,
      message: `salary could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "salary_delete_all") {
    const deletedsalarys = await prisma.salary.deleteMany();
    if (deletedsalarys) {
      return res.status(200).json({
        error: false,
        message: `All salarys deleted`,
        data: [],
      });
    }
    return res.status(500).send({
      error: true,
      message: `salarys could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "salary_get") {
    const allsalarys = await prisma.salary.findMany();
    if (allsalarys) {
      return res.status(200).json({
        error: false,
        message: ``,
        data: allsalarys,
      });
    }
    return res.status(500).send({
      error: true,
      message: `salarys could not be retrieved`,
      data: [],
    });
  }
  return res.status(500).send({
    error: true,
    message: `Something went wrong`,
    data: [],
  });
}
