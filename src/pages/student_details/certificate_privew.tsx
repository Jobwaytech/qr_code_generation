"use client";

import React from "react";

const CertificatePreview = () => {
  const [certificateUrl, setCertificateUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const studentDetails = localStorage.getItem("studentDetails");
    if (!studentDetails) {
      console.error("No student details found in localStorage.");
      setLoading(false);
      return;
    }

    try {
      const student = JSON.parse(studentDetails);
      const url = student?.certificate_url ?? "";
      setCertificateUrl(url);
    } catch (error) {
      console.error("Failed to parse studentDetails from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null;
  }

  if (!certificateUrl) {
    return (
      <div className="text-white p-4 flex justify-center w-screen h-screen items-center">
        Certificate preview not available.
      </div>
    );
  }

  return (
    <iframe
      src={certificateUrl}
      className="w-screen h-screen border-0"
    ></iframe>
  );
};

export default CertificatePreview;
