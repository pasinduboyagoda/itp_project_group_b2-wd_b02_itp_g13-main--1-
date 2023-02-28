import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.type === "Attendance_create") {
    const { 
        firstName,
        lastName,
        Date,
        in_time,
        out_time, } = req.body;
    const newAttendance = await prisma.Attendance.create({
      data: {
        firstName,
        lastName,
        Date,
        in_time,
        out_time,
      },
    });
    if (newAttendance) {
      return res.status(200).json({
        error: false,
        message: `Attendance:${newAttendance.cuId} Is Created`,
        data: newAttendance,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Attendance could not be created`,
      data: [],
    });
  } else if (req.query.type === "Attendance_update") {
    const { employeeId, firstName, lastName, Date, in_time, out_time, } =
      req.body;
    const updatedAttendance = await prisma.Attendance.update({
      where: {
        employeeId: +employeeId,
      },
      data: {
        firstName,
        lastName,
        Date,
        in_time,
        out_time,
      },
    });
    if (updatedAttendance) {
      return res.status(200).json({
        error: false,
        message: `Attendance:${updatedAttendance.employeeId} Is Updated`,
        data: updatedAttendance,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Attendance could not be updated`,
      data: [],
    });
  } else if (req.query.type === "Attendance_delete_one") {
    const { employeeId } = req.body;
    const deletedAttendance = await prisma.Attendance.delete({
      where: {
        employeeId: +employeeId,
      },
    });
    if (deletedAttendance) {
      return res.status(200).json({
        error: false,
        message: `Attendance:${deletedAttendance.employeeId} Is deleted`,
        data: deletedAttendance,
      });
    }
    return res.status(500).send({
      error: true,
      message: `Customer could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "Attendance_delete_all") {
    const deletedAttendance = await prisma.Attendance.deleteMany();
    if (deletedAttendance) {
      return res.status(200).json({
        error: false,
        message: `All Attendance deleted`,
        data: [],
      });
    }
    return res.status(500).send({
      error: true,
      message: `Attendance could not be deleted`,
      data: [],
    });
  } else if (req.query.type === "Attendancer_get") {
    const allAttendance = await prisma.Attendance.findMany();
    if (allAttendance) {
      return res.status(200).json({
        error: false,
        message: ``,
        data: allAttendance,
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
