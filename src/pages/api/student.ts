import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

type StudentRecord = {
  student_photo?: string;
  certificate_url?: string;
  std_name: string;
  std_roll_num: string;
  cource_name: string;
  certidicate_id: string;
  issue_date: string;
  batch_no: string;
  student_id: string;
  start_date: string;
  end_date: string;
  intership_domain: string;
  project_title: string;
  intership_mode: string;
  createdAt: string;
  updatedAt?: string;
};

const requiredFields = [
  "std_name",
  "std_roll_num",
  "cource_name",
  "certidicate_id",
  "issue_date",
  "batch_no",
  "student_id",
  "start_date",
  "end_date",
  "intership_domain",
  "project_title",
  "intership_mode",
];

function validateStudent(body: Partial<StudentRecord>) {
  return requiredFields.find(
    (field) =>
      !body[field as keyof StudentRecord] ||
      body[field as keyof StudentRecord] === "",
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === "GET") {
    const recordId = String(req.query.id || "").trim();
    const certificateId = String(
      req.query.certificate_id || req.query.certidicate_id || "",
    ).trim();
    const issueDate = req.query.issue_date
      ? String(req.query.issue_date).trim()
      : undefined;

    if (recordId) {
      try {
        const doc = await db
          .collection("students")
          .findOne({ _id: new ObjectId(recordId) });
        if (!doc) {
          return res
            .status(404)
            .json({ ok: false, error: "Student not found." });
        }

        return res.status(200).json({
          ok: true,
          student: {
            id: doc._id.toString(),
            student_photo: doc.student_photo,
            certificate_url: doc.certificate_url,
            std_name: doc.std_name,
            std_roll_num: doc.std_roll_num,
            cource_name: doc.cource_name,
            certidicate_id: doc.certidicate_id,
            issue_date: doc.issue_date,
            batch_no: doc.batch_no,
            student_id: doc.student_id,
            start_date: doc.start_date,
            end_date: doc.end_date,
            intership_domain: doc.intership_domain,
            project_title: doc.project_title,
            intership_mode: doc.intership_mode,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
          },
        });
      } catch (error) {
        return res
          .status(400)
          .json({ ok: false, error: "Invalid student id." });
      }
    }

    if (certificateId) {
      const filter: Record<string, unknown> = { certidicate_id: certificateId };
      if (issueDate) {
        filter.issue_date = issueDate;
      }

      const doc = await db.collection("students").findOne(filter);

      if (!doc) {
        return res
          .status(404)
          .json({ ok: false, error: "Certificate not found." });
      }

      return res.status(200).json({
        ok: true,
        student: {
          id: doc._id.toString(),
          student_photo: doc.student_photo,
          certificate_url: doc.certificate_url,
          std_name: doc.std_name,
          std_roll_num: doc.std_roll_num,
          cource_name: doc.cource_name,
          certidicate_id: doc.certidicate_id,
          issue_date: doc.issue_date,
          batch_no: doc.batch_no,
          student_id: doc.student_id,
          start_date: doc.start_date,
          end_date: doc.end_date,
          intership_domain: doc.intership_domain,
          project_title: doc.project_title,
          intership_mode: doc.intership_mode,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        },
      });
    }

    const docs = await db
      .collection("students")
      .find()
      .sort({ createdAt: 1 })
      .toArray();
    const students = docs.map((doc) => ({
      id: doc._id.toString(),
      student_photo: doc.student_photo,
      certificate_url: doc.certificate_url,
      std_name: doc.std_name,
      std_roll_num: doc.std_roll_num,
      cource_name: doc.cource_name,
      certidicate_id: doc.certidicate_id,
      issue_date: doc.issue_date,
      batch_no: doc.batch_no,
      student_id: doc.student_id,
      start_date: doc.start_date,
      end_date: doc.end_date,
      intership_domain: doc.intership_domain,
      project_title: doc.project_title,
      intership_mode: doc.intership_mode,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
    return res.status(200).json({ ok: true, students });
  }

  if (req.method === "POST") {
    const body = req.body as Partial<StudentRecord>;
    const missingField = validateStudent(body);

    if (missingField) {
      return res
        .status(400)
        .json({ ok: false, error: `${missingField} is required.` });
    }

    try {
      const student: StudentRecord = {
        student_photo: body.student_photo,
        certificate_url: body.certificate_url,
        std_name: body.std_name!.trim(),
        std_roll_num: body.std_roll_num!.trim(),
        cource_name: body.cource_name!.trim(),
        certidicate_id: body.certidicate_id!.trim(),
        issue_date: body.issue_date!.trim(),
        batch_no: body.batch_no!.trim(),
        student_id: body.student_id!.trim(),
        start_date: body.start_date!.trim(),
        end_date: body.end_date!.trim(),
        intership_domain: body.intership_domain!.trim(),
        project_title: body.project_title!.trim(),
        intership_mode: body.intership_mode!.trim(),
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection("students").insertOne(student);
      return res.status(201).json({ ok: true, insertedId: result.insertedId });
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, error: (error as Error).message });
    }
  }

  if (req.method === "PUT") {
    const body = req.body as Partial<StudentRecord> & { id?: string };
    const recordId = body.id;
    if (!recordId) {
      return res
        .status(400)
        .json({ ok: false, error: "Student id is required for update." });
    }

    const missingField = validateStudent(body);
    if (missingField) {
      return res
        .status(400)
        .json({ ok: false, error: `${missingField} is required.` });
    }

    try {
      const update = {
        student_photo: body.student_photo,
        certificate_url: body.certificate_url,
        std_name: body.std_name!.trim(),
        std_roll_num: body.std_roll_num!.trim(),
        cource_name: body.cource_name!.trim(),
        certidicate_id: body.certidicate_id!.trim(),
        issue_date: body.issue_date!.trim(),
        batch_no: body.batch_no!.trim(),
        student_id: body.student_id!.trim(),
        start_date: body.start_date!.trim(),
        end_date: body.end_date!.trim(),
        intership_domain: body.intership_domain!.trim(),
        project_title: body.project_title!.trim(),
        intership_mode: body.intership_mode!.trim(),
        updatedAt: new Date().toISOString(),
      };

      const result = await db
        .collection("students")
        .updateOne({ _id: new ObjectId(recordId) }, { $set: update });

      if (result.matchedCount === 0) {
        return res.status(404).json({ ok: false, error: "Student not found." });
      }

      return res.status(200).json({ ok: true, updatedId: recordId });
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, error: (error as Error).message });
    }
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
}
