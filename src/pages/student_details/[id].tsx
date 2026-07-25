import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {};

type StudentDetails = {
  id: string;
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
};

const Student_details = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const studentId = Array.isArray(id) ? id[0] : id;

    if (!studentId) {
      return;
    }

    const fetchStudent = async () => {
      setLoading(true);
      setError(null);
      setStudent(null);

      try {
        const response = await fetch(`/api/student?${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Student not found.");
        }

        setStudent(data.student);
      } catch (fetchError) {
        setError((fetchError as Error).message);
      } finally {
        setLoading(false);
      }
    };

    void fetchStudent();
  }, [id]);

  if (!id || loading) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-slate-950 px-4 py-10">
        <div className="rounded-4xl border border-slate-700 bg-slate-900/95 p-10 text-center shadow-2xl shadow-slate-950/40">
          <div className="mx-auto mb-6 h-20 w-20 animate-spin rounded-full border-4 border-slate-700 border-t-purple-500" />
          <h1 className="text-2xl font-bold text-white">
            Loading student details
          </h1>
          <p className="mt-3 text-sm text-slate-400 max-w-xs mx-auto">
            Hang tight while we fetch the student information from the database.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
            <span className="h-3 w-3 rounded-full bg-slate-500 animate-pulse animation-delay-75" />
            <span className="h-3 w-3 rounded-full bg-slate-500 animate-pulse animation-delay-150" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-slate-950 px-4 py-10">
        <div className="rounded-4xl border border-rose-700 bg-slate-900/95 p-10 text-center shadow-2xl shadow-slate-950/40">
          <h1 className="text-2xl font-bold text-white">
            Unable to load student
          </h1>
          <p className="mt-3 text-sm text-slate-400 max-w-xs mx-auto">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const handleDownloadJSON = () => {
    if (!student) return;
    const data = JSON.stringify(student, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${student.student_id || student.id}-details.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/Logo.png"
              alt="Company logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Student
              </p>
              <h2 className="text-2xl font-bold text-white">Profile</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {student.certificate_url ? (
              <a
                href={student.certificate_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-95"
              >
                View Certificate
              </a>
            ) : null}
            
          </div>
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40">
          <div className="grid gap-6 md:grid-cols-3 md:items-start">
            <div className="md:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-semibold text-white">
                  {student.std_name}
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  {student.cource_name} • {student.intership_domain}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Student ID:{" "}
                  <span className="font-medium text-slate-200">
                    {student.student_id}
                  </span>
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-5">
                  <h3 className="text-sm font-semibold text-slate-200">
                    Certificate
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    ID: {student.certidicate_id}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Issue: {student.issue_date}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Batch: {student.batch_no}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-5">
                  <h3 className="text-sm font-semibold text-slate-200">
                    Internship
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Mode: {student.intership_mode}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Project: {student.project_title}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Duration: {student.start_date} → {student.end_date}
                  </p>
                </div>
              </div>
            </div>

            <aside className="flex flex-col items-center gap-4">
              {student.student_photo ? (
                <img
                  src={student.student_photo}
                  alt={student.std_name}
                  className="h-44 w-44 rounded-2xl object-top object-cover  shadow-xl"
                />
              ) : (
                <div className="flex h-44 w-44 items-center justify-center rounded-2xl bg-slate-800 text-slate-500">
                  No Photo
                </div>
              )}

              <div className="w-full">
                <button
                  onClick={() =>
                    navigator.clipboard?.writeText(window.location.href)
                  }
                  className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700"
                >
                  Copy Link
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Student_details;
