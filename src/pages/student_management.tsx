"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Hedder";
import Sidebar from "@/components/Sidebar";

type StudentFormState = {
  student_photo: string;
  certificate_url: string;
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

type StudentData = StudentFormState & { id: string };

const initialState: StudentFormState = {
  student_photo: "",
  certificate_url: "",
  std_name: "",
  std_roll_num: "",
  cource_name: "",
  certidicate_id: "",
  issue_date: "",
  batch_no: "",
  student_id: "",
  start_date: "",
  end_date: "",
  intership_domain: "",
  project_title: "",
  intership_mode: "",
};

const StudentManagement = () => {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<StudentFormState>(initialState);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      fetchStudents();
    }
  }, [mounted]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/student");
      const data = await response.json();
      if (response.ok) {
        setStudents(data.students ?? []);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Unable to load students.",
        });
      }
    } catch (error) {
      setStatus({ type: "error", message: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const formatCertificateId = (value: string, issueDate: string) => {
    const cleaned = value.toUpperCase().replace(/\s+/g, "");
    const dateValue = issueDate ? issueDate.slice(0, 7) : "";
    let withoutPrefix = cleaned.replace(/^JWT-/, "");
    const [datePart, codePart] = withoutPrefix.split(/\//, 2);

    let normalizedDate = "";
    let normalizedCode = "";

    if (/^\d{4}-\d{2}$/.test(datePart)) {
      normalizedDate = datePart;
      normalizedCode = codePart ?? "";
    } else {
      normalizedCode = withoutPrefix;
      normalizedDate = dateValue;
    }

    normalizedCode = normalizedCode.replace(/[^0-9,]/g, "");
    normalizedCode = normalizedCode.split(",").filter(Boolean).join(",");

    let formatted = "JWT-";
    if (normalizedDate) formatted += normalizedDate;
    if (normalizedCode) formatted += `/${normalizedCode}`;
    return formatted;
  };

  const handleCertificateIdBlur = () => {
    if (!form.certidicate_id) return;
    setForm((current) => ({
      ...current,
      certidicate_id: formatCertificateId(
        current.certidicate_id,
        current.issue_date,
      ),
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setForm((current) => ({ ...current, student_photo: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCertificateUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setForm((current) => ({ ...current, certificate_url: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(initialState);
    setStatus({ type: "idle", message: "" });
    setShowModal(true);
  };

  const handleEdit = (student: StudentData) => {
    setEditingId(student.id);
    setForm({
      student_photo: student.student_photo,
      certificate_url: student.certificate_url ?? "",
      std_name: student.std_name,
      std_roll_num: student.std_roll_num,
      cource_name: student.cource_name,
      certidicate_id: student.certidicate_id,
      issue_date: student.issue_date,
      batch_no: student.batch_no,
      student_id: student.student_id,
      start_date: student.start_date,
      end_date: student.end_date,
      intership_domain: student.intership_domain,
      project_title: student.project_title,
      intership_mode: student.intership_mode,
    });
    setStatus({ type: "idle", message: "Editing selected student." });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({
      type: "idle",
      message: editingId
        ? "Updating student record..."
        : "Saving student record...",
    });

    try {
      const response = await fetch("/api/student", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });

      const text = await response.text();
      const data = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? JSON.parse(text)
        : { error: text };

      setShowModal(false);
      fetchStudents();
    } catch (error) {
      setStatus({ type: "error", message: (error as Error).message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-5xl font-black text-white mb-3 gradient-text drop-shadow-lg">
                Student Management
              </h1>
              <p className="text-slate-300 max-w-3xl">
                Manage student internship details, upload photos, and edit
                records using the same dashboard style.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              <div className="card group relative overflow-hidden p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl shadow-slate-950/20 hover:shadow-purple-500/20 transition-all">
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-purple-600/7 group-hover:to-purple-600/0 transition-all" />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
                    Total Students
                  </p>
                  <p className="text-4xl font-black text-white">
                    {students.length}
                  </p>
                </div>
              </div>
              <div className="card group relative overflow-hidden p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl shadow-slate-950/20 hover:shadow-sky-500/20 transition-all">
                <div className="absolute inset-0 bg-linear-to-r from-sky-600/0 via-sky-600/0 to-sky-600/0 group-hover:from-sky-600/10 group-hover:via-sky-600/7 group-hover:to-sky-600/0 transition-all" />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
                    Recent Action
                  </p>
                  <p className="text-4xl font-black text-white">
                    {editingId ? "Editing" : "Ready"}
                  </p>
                </div>
              </div>
              <div className="card group relative overflow-hidden p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl shadow-slate-950/20 hover:shadow-fuchsia-500/20 transition-all">
                <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600/0 via-fuchsia-600/0 to-fuchsia-600/0 group-hover:from-fuchsia-600/10 group-hover:via-fuchsia-600/7 group-hover:to-fuchsia-600/0 transition-all" />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
                    Upload ETA
                  </p>
                  <p className="text-4xl font-black text-white">Instant</p>
                </div>
              </div>
            </div>

            <div className="card rounded-3xl bg-slate-950/90 border border-slate-800 shadow-xl shadow-slate-950/20 p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Student Records
                  </h2>
                  <p className="text-slate-400">
                    View stored students and open the form to add or edit a
                    record.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform"
                >
                  Add Student
                </button>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/90">
                <table className="min-w-full divide-y divide-slate-700 text-left text-sm text-slate-300">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr>
                      <th className="px-4 py-4 font-semibold">
                        Certificate ID
                      </th>
                      <th className="px-4 py-4 font-semibold">Name</th>
                      <th className="px-4 py-4 font-semibold">Roll</th>
                      <th className="px-4 py-4 font-semibold">Course</th>
                      <th className="px-4 py-4 font-semibold">Batch</th>
                      <th className="px-4 py-4 font-semibold">Student ID</th>
                      <th className="px-4 py-4 font-semibold">Domain</th>
                      <th className="px-4 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {students.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-8 text-center text-slate-500"
                        >
                          No students found. Click Add Student to create one.
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-slate-900/70 transition-colors"
                        >
                          <td className="px-4 py-4 font-medium text-white">
                            {student.certidicate_id}
                          </td>
                          <td className="px-4 py-4 font-medium text-white">
                            {student.std_name}
                          </td>
                          <td className="px-4 py-4">{student.std_roll_num}</td>
                          <td className="px-4 py-4">{student.cource_name}</td>
                          <td className="px-4 py-4">{student.batch_no}</td>
                          <td className="px-4 py-4">{student.student_id}</td>
                          <td className="px-4 py-4">
                            {student.intership_domain}
                          </td>
                          <td className="px-4 py-4">
                            <button
                              type="button"
                              onClick={() => handleEdit(student)}
                              className="rounded-2xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4   backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-screen overflow-auto rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-2 border-b border-slate-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingId ? "Edit Student" : "Add Student"}
                </h3>
                <p className="text-sm text-slate-400">
                  Upload photo and complete the student details below.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6">
              {mounted && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="text-sm font-medium text-slate-300">
                        Upload Student Photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 shadow-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm font-medium text-slate-300">
                        Student Photo URL
                      </span>
                      <input
                        name="student_photo"
                        value={form.student_photo}
                        onChange={handleChange}
                        type="text"
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                        placeholder="https://example.com/photo.jpg or uploaded image"
                      />
                      {form.student_photo ? (
                        <img
                          src={form.student_photo}
                          alt="Student preview"
                          className="mt-3 h-32 w-32 rounded-3xl object-cover shadow-xl"
                        />
                      ) : null}
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm font-medium text-slate-300">
                        Upload Certificate
                      </span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleCertificateUpload}
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 shadow-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm font-medium text-slate-300">
                        Certificate URL
                      </span>
                      <input
                        name="certificate_url"
                        value={form.certificate_url}
                        onChange={handleChange}
                        type="text"
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                        placeholder="https://example.com/certificate.pdf or uploaded certificate"
                      />
                      {form.certificate_url ? (
                        <p className="mt-3 text-sm text-slate-400 wrap-break-word">
                          Uploaded certificate ready to save.
                        </p>
                      ) : null}
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Student Name
                      </span>
                      <input
                        name="std_name"
                        value={form.std_name}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Roll Number
                      </span>
                      <input
                        name="std_roll_num"
                        value={form.std_roll_num}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Course Name
                      </span>
                      <input
                        name="cource_name"
                        value={form.cource_name}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Certificate ID
                      </span>
                      <input
                        name="certidicate_id"
                        value={form.certidicate_id}
                        onChange={handleChange}
                        onBlur={handleCertificateIdBlur}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                        placeholder="JWT-yyyy-mm/101,102"
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        Format example: JWT-2026-07/101,102
                      </p>
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Issue Date
                      </span>
                      <input
                        name="issue_date"
                        value={form.issue_date}
                        onChange={handleChange}
                        type="date"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Batch No
                      </span>
                      <input
                        name="batch_no"
                        value={form.batch_no}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Student ID
                      </span>
                      <input
                        name="student_id"
                        value={form.student_id}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        Start Date
                      </span>
                      <input
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                        type="date"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-300">
                        End Date
                      </span>
                      <input
                        name="end_date"
                        value={form.end_date}
                        onChange={handleChange}
                        type="date"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm font-medium text-slate-300">
                        Internship Domain
                      </span>
                      <input
                        name="intership_domain"
                        value={form.intership_domain}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm font-medium text-slate-300">
                        Project Title
                      </span>
                      <input
                        name="project_title"
                        value={form.project_title}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm font-medium text-slate-300">
                        Internship Mode
                      </span>
                      <input
                        name="intership_mode"
                        value={form.intership_mode}
                        onChange={handleChange}
                        type="text"
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:scale-[1.02]"
                    >
                      {editingId ? "Update Student" : "Save Student"}
                    </button>
                    <p
                      className={`text-sm ${status.type === "success" ? "text-emerald-500" : "text-rose-500"}`}
                    >
                      {status.message}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
