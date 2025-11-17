import React, { useState, useEffect } from "react";
import { supabase } from "../../integrations/supabase/client";
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function BrowsePapers() {
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [branchId, setBranchId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [papers, setPapers] = useState([]);

  // Load initial dropdown options
  useEffect(() => {
    loadBranches();
    loadSemesters();
  }, []);

  useEffect(() => {
    if (branchId && semesterId) loadSubjects();
  }, [branchId, semesterId]);

  useEffect(() => {
    if (subjectId) loadPapers();
  }, [subjectId]);

  const loadBranches = async () => {
    const { data } = await supabase.from("branches").select("*");
    setBranches(data || []);
  };

  const loadSemesters = async () => {
    const { data } = await supabase.from("semesters").select("*");
    setSemesters(data || []);
  };

  const loadSubjects = async () => {
    const { data } = await supabase
      .from("subjects")
      .select("*")
      .eq("branch_id", branchId)
      .eq("semester_id", semesterId);

    setSubjects(data || []);
  };

  const loadPapers = async () => {
    const { data } = await supabase
      .from("question_papers")
      .select("*")
      .eq("subject_id", subjectId)
      .order("year", { ascending: false });

    setPapers(data || []);
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Browse Question Papers</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Branch */}
          <div>
            <Label>Branch</Label>
            <select
              className="w-full p-2 border rounded"
              value={branchId}
              onChange={(e) => {
                setBranchId(e.target.value);
                setSemesterId("");
                setSubjectId("");
                setPapers([]);
              }}
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
              onChange={(e) => {
                setSemesterId(e.target.value);
                setSubjectId("");
                setPapers([]);
              }}
            >
              <option value="">Select Semester</option>
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <Label>Subject</Label>
            <select
              className="w-full p-2 border rounded"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Render Papers */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Available Papers</h3>

            {papers.length === 0 ? (
              <p className="text-muted-foreground">No papers available.</p>
            ) : (

              <div className="space-y-3">
                {papers.map((p) => (
                  <div
                    key={p.id}
                    className="border rounded p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">
                        {p.year} — {p.exam_type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {p.file_name}
                      </p>
                    </div>

                    {/* Download button */}
                    <Button
                      onClick={() =>
                        window.open(
                          `https://https://fduzeanxevrttxrfkhiy.supabase.co/storage/v1/object/public/question-papers/${p.file_key}`,
                          "_blank"
                        )
                      }
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>

            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}