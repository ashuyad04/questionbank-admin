import React, { useEffect, useState } from "react";
import { supabase } from "../../integrations/supabase/client";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

export default function ManagePapers() {
  const [papers, setPapers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [editingPaper, setEditingPaper] = useState(null);
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: papersData } = await supabase
      .from("question_papers")
      .select("*")
      .order("created_at", { ascending: false });

    setPapers(papersData || []);

    const { data: b } = await supabase.from("branches").select("*");
    setBranches(b || []);

    const { data: s } = await supabase.from("semesters").select("*");
    setSemesters(s || []);

    const { data: sub } = await supabase.from("subjects").select("*");
    setSubjects(sub || []);
  };

  // DELETE PAPER
  const deletePaper = async (paper) => {
    if (!window.confirm("Delete this paper permanently?")) return;

    // Delete file from storage
    await supabase.storage
      .from("question-papers")
      .remove([paper.file_key]);

    // Delete DB row
    const { error } = await supabase
      .from("question_papers")
      .delete()
      .eq("id", paper.id);

    if (error) return toast.error("Delete failed: " + error.message);

    toast.success("Deleted successfully");
    loadData();
  };

  // SAVE EDITED DETAILS
  const saveEdit = async () => {
    if (!editingPaper) return;

    const { error } = await supabase
      .from("question_papers")
      .update({
        branch_id: editingPaper.branch_id,
        semester_id: editingPaper.semester_id,
        subject_id: editingPaper.subject_id,
        year: editingPaper.year,
        exam_type: editingPaper.exam_type,
      })
      .eq("id", editingPaper.id);

    if (error) return toast.error("Update failed: " + error.message);

    toast.success("Updated successfully");
    setEditingPaper(null);
    loadData();
  };

  // ⭐ REPLACE THE PDF FILE
  const replaceFile = async () => {
    if (!newFile) return toast.error("Please upload a file");

    const paper = editingPaper;

    // 1️⃣ Delete old file
    await supabase.storage
      .from("question-papers")
      .remove([paper.file_key]);

    // 2️⃣ Upload new file to same file_key
    const { error: uploadError } = await supabase.storage
      .from("question-papers")
      .upload(paper.file_key, newFile, { upsert: true });

    if (uploadError)
      return toast.error("Failed to upload new file: " + uploadError.message);

    // 3️⃣ Update file name and size in database
    const { error: dbError } = await supabase
      .from("question_papers")
      .update({
        file_name: newFile.name,
        file_size: newFile.size,
      })
      .eq("id", paper.id);

    if (dbError)
      return toast.error("Failed to update DB: " + dbError.message);

    toast.success("PDF file replaced successfully!");

    setNewFile(null);
    loadData();
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Manage Uploaded Papers</CardTitle>
        </CardHeader>

        <CardContent>
          {papers.length === 0 ? (
            <p>No papers found.</p>
          ) : (
            <div className="space-y-6">
              {papers.map((paper) => (
                <div key={paper.id} className="border rounded p-4">
                  <p className="font-semibold">
                    {paper.year} — {paper.exam_type}
                  </p>
                  <p className="text-sm text-muted-foreground">{paper.file_name}</p>

                  <div className="flex gap-4 mt-3">
                    <Button
                      variant="outline"
                      onClick={() => setEditingPaper({ ...paper })}
                    >
                      Edit
                    </Button>

                    <Button variant="destructive" onClick={() => deletePaper(paper)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ⭐ EDIT MODAL */}
      {editingPaper && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Edit Paper</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Branch */}
              <div>
                <Label>Branch</Label>
                <select
                  className="w-full p-2 border rounded"
                  value={editingPaper.branch_id}
                  onChange={(e) =>
                    setEditingPaper({ ...editingPaper, branch_id: e.target.value })
                  }
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <Label>Semester</Label>
                <select
                  className="w-full p-2 border rounded"
                  value={editingPaper.semester_id}
                  onChange={(e) =>
                    setEditingPaper({ ...editingPaper, semester_id: e.target.value })
                  }
                >
                  {semesters.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <Label>Subject</Label>
                <select
                  className="w-full p-2 border rounded"
                  value={editingPaper.subject_id}
                  onChange={(e) =>
                    setEditingPaper({ ...editingPaper, subject_id: e.target.value })
                  }
                >
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <Label>Year</Label>
                <Input
                  type="number"
                  value={editingPaper.year}
                  onChange={(e) =>
                    setEditingPaper({ ...editingPaper, year: e.target.value })
                  }
                />
              </div>

              {/* Exam Type */}
              <div>
                <Label>Exam Type</Label>
                <select
                  className="w-full p-2 border rounded"
                  value={editingPaper.exam_type}
                  onChange={(e) =>
                    setEditingPaper({ ...editingPaper, exam_type: e.target.value })
                  }
                >
                  <option value="Minor-1">Minor-1</option>
                  <option value="Minor-2">Minor-2</option>
                  <option value="Minor">Minor</option>
                  <option value="Major">Major</option>
                </select>
              </div>

              {/* ⭐ Replace File */}
              <div className="border p-3 rounded">
                <Label>Replace PDF File</Label>
                <Input type="file" accept="application/pdf" onChange={(e) => setNewFile(e.target.files[0])} />

                <Button
                  className="mt-2"
                  onClick={replaceFile}
                  disabled={!newFile}
                >
                  Replace File
                </Button>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setEditingPaper(null)}>
                  Cancel
                </Button>
                <Button onClick={saveEdit}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}