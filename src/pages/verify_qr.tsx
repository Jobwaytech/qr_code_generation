import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

type StudentVerification = {
  id: string;
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
  certificate_url?: string;
  student_photo?: string;
};

const VerifyQrPage = () => {
  const [formData, setFormData] = useState({
    certificateId: "",
    issueDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [student, setStudent] = useState<StudentVerification | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.certificateId || !formData.issueDate) {
      setSubmitted(false);
      setStudent(null);
      setError("Please provide both certificate ID and issue date.");
      return;
    }

    setSubmitted(true);
    setStudent(null);
    setError(null);

    try {
      const response = await fetch(
        `/api/student?certificate_id=${encodeURIComponent(formData.certificateId)}&issue_date=${encodeURIComponent(
          formData.issueDate,
        )}`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Certificate not found.");
        setSubmitted(false);
        return;
      }

      window.location.href = `/student_details/id=${data.student.id}`;

      setStudent(data.student || null);
    } catch (fetchError) {
      setError(
        (fetchError as Error).message || "Unable to verify certificate.",
      );
      setSubmitted(false);
    }
  };

  return (
    <>
      <Head>
        <title>Certificate Verification</title>
        <meta name="description" content="Verify internship certificates" />
      </Head>

      <main className="min-h-screen min-w-screen flex align-middle items-center justify-center px-4 py-8 font-sans">
        <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-blue-50">
              <Image
                src="/Logo.png"
                alt="Company logo"
                width={80}
                height={80}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Certificate Verification
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Enter the certificate details below
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-slate-700"
                htmlFor="certificateId"
              >
                Certificate ID
              </label>
              <input
                id="certificateId"
                name="certificateId"
                type="text"
                value={formData.certificateId}
                onChange={handleChange}
                placeholder="Enter certificate ID"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-slate-700"
                htmlFor="issueDate"
              >
                Issue Date
              </label>
              <input
                id="issueDate"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Verify Certificate
            </button>
          </form>

          {error ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : student ? (
            <div className="mt-4 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 shadow-sm">
              <p className="text-sm text-slate-500">
                Certificate verified successfully.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Student Name
                  </p>
                  <p className="font-semibold">{student.std_name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Roll Number
                  </p>
                  <p className="font-semibold">{student.std_roll_num}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Course
                  </p>
                  <p className="font-semibold">{student.cource_name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Batch
                  </p>
                  <p className="font-semibold">{student.batch_no}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Issue Date
                  </p>
                  <p className="font-semibold">{student.issue_date}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Internship Domain
                  </p>
                  <p className="font-semibold">{student.intership_domain}</p>
                </div>
              </div>
              {student.certificate_url ? (
                <a
                  href={student.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Certificate
                </a>
              ) : null}
            </div>
          ) : submitted ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              Verification request submitted for certificate{" "}
              {formData.certificateId}.
            </p>
          ) : null}
        </section>
      </main>
    </>
  );
};

export default VerifyQrPage;
