import React, { useEffect, useState } from "react";
import { supabase } from "../../integrations/supabase/client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";

export default function UploadPaper() {
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [branchId, setBranchId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("");
  const [file, setFile] = useState(null);

  // Load branches + semesters
  useEffect(() => {
    loadBranches();
    loadSemesters();
  }, []);

  const loadBranches = async () => {
    const { data } = await supabase.from("branches").select("*");
    setBranches(data || []);
  };

  const loadSemesters = async () => {
    const { data } = await supabase.from("semesters").select("*");
    setSemesters(data || []);
  };

  // Find or create subject automatically
  const getSubjectId = async () => {
    if (!subjectName.trim()) return toast.error("Subject name is required");
    if (!subjectCode.trim()) return toast.error("Subject code is required");

    // Check if subject already exists
    const { data: existing } = await supabase
      .from("subjects")
      .select("*")
      .eq("branch_id", branchId)
      .eq("semester_id", semesterId)
      .eq("name", subjectName.trim());

    if (existing && existing.length > 0) {
      return existing[0].id;
    }

    // Create subject
    const { data: inserted, error } = await supabase
      .from("subjects")
      .insert([
        {
          branch_id: branchId,
          semester_id: semesterId,
          name: subjectName.trim(),
          code: subjectCode.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error("Failed to create subject: " + error.message);
      return null;
    }

    return inserted.id;
  };

  const uploadPaper = async (e) => {
    e.preventDefault();

    if (!branchId || !semesterId || !year || !examType || !file) {
      return toast.error("Please fill all required fields");
    }

    const subjectId = await getSubjectId();
    if (!subjectId) return;

    const sanitizedSubject = subjectName.replace(/\s+/g, "-").toLowerCase();

    const fileKey = `${branchId}/${semesterId}/${sanitizedSubject}/${year}/${examType}.pdf`;

    // Upload PDF to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("question-papers")
      .upload(fileKey, file, { upsert: true });

    if (uploadError) {
      return toast.error("Upload failed: " + uploadError.message);
    }

    // Call RPC to insert DB row & log admin action
    const { error: rpcError } = await supabase.rpc("create_question_paper", {
      p_branch_id: branchId,
      p_semester_id: Number(semesterId),
      p_subject_id: subjectId,
      p_year: Number(year),
      p_exam_type: examType,
      p_file_key: fileKey,
      p_file_name: file.name,
      p_file_size: file.size,
    });

    if (rpcError) {
      return toast.error("Database error: " + rpcError.message);
    }

    toast.success("Question paper uploaded successfully!");

    // Reset form
    setSubjectName("");
    setSubjectCode("");
    setFile(null);
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Upload Question Paper</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={uploadPaper} className="space-y-4">

            {/* Branch */}
            <div>
              <Label>Branch</Label>
              <select
                className="w-full p-2 border rounded"
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <Label>Semester</Label>
              <select
                className="w-full p-2 border rounded"
                value={semesterId}
                onChange={(e) => setSemesterId(e.target.value)}
              >
                <option value="">Select Semester</option>
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Subject Name */}
            <div>
              <Label>Subject Name</Label>
              <Input
                placeholder="Engineering Mathematics"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </div>

            {/* Subject Code */}
            <div>
              <Label>Subject Code</Label>
              <Input
                placeholder="MAT101"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              />
            </div>

            {/* Year */}
            <div>
              <Label>Year</Label>
              <Input
                type="number"
                min="2000"
                max="2099"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            {/* Exam Type */}
            <div>
              <Label>Exam Type</Label>
              <select
                className="w-full p-2 border rounded"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              >
                <option value="">Select Exam Type</option>
                <option value="Minor-1">Minor-1 (Before 2024)</option>
                <option value="Minor-2">Minor-2 (Before 2024)</option>
                <option value="Minor">Minor (After 2024)</option>
                <option value="Major">Major</option>
              </select>
            </div>

            {/* File */}
            <div>
              <Label>PDF File</Label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <Button className="w-full" type="submit">
              Upload
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}