import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const VerifyQrPage = () => {
  const [formData, setFormData] = useState({
    certificateId: "",
    issueDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.certificateId || !formData.issueDate) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
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
              <Image src="/Logo.png" alt="Company logo" width={80} height={80} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Certificate Verification</h1>
              <p className="mt-1 text-sm text-slate-500">Enter the certificate details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="certificateId">
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
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="issueDate">
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

          {submitted && (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Verification request submitted for certificate {formData.certificateId}.
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default VerifyQrPage;