import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function PublicBrowse() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    const { data, error } = await supabase
      .from("question_papers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPapers(data);
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Browse Question Papers</h1>

      {papers.length === 0 && <p>No question papers uploaded yet.</p>}

      <ul className="space-y-3">
        {papers.map((q) => (
          <li key={q.id} className="border p-4 rounded-lg">
            <p className="font-semibold">
              {q.branch} – Sem {q.semester} – {q.subject} ({q.subject_code})
            </p>

            <a
              href={q.file_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              Download PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}