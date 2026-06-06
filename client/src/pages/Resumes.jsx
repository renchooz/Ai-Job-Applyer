import { useRef, useState } from "react";
import { Upload, FileText, Eye, Pencil, Trash2, Loader2 } from "lucide-react";

import { useResume } from "../context/ResumeContext";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Resumes = () => {
  const fileInputRef = useRef(null);
  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    resumes,
    resumeLoading,
    uploadResume,
    previewResume,
    renameResume,
    deleteResume,
  } = useResume();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    await uploadResume(file);

    e.target.value = "";
  };

  const startRename = (resume) => {
    setRenamingId(resume._id);
    setNewName(resume.originalName);
  };

  const handleRename = async (resumeId) => {
    const updated = await renameResume(resumeId, newName);

    if (updated) {
      setRenamingId(null);
      setNewName("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge className="mb-3">
            <FileText size={14} />
            My Resumes
          </Badge>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Manage your resumes
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Upload multiple resumes, preview them, rename based on role, and let
            AI choose the best one for every job description.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={resumeLoading}
          >
            {resumeLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Upload size={18} />
            )}
            Upload Resume
          </Button>
        </div>
      </div>

      {resumeLoading && resumes.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-10 text-slate-400">
            <Loader2 className="mr-2 animate-spin" />
            Loading resumes...
          </CardContent>
        </Card>
      ) : resumes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
              <FileText size={30} />
            </div>

            <h2 className="text-xl font-semibold text-white">
              No resumes uploaded yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-400">
              Upload your first PDF resume to start AI analysis, best resume
              selection, and one-click applications.
            </p>

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mt-6"
            >
              <Upload size={18} />
              Upload Resume
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resumes.map((resume) => (
            <Card key={resume._id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <FileText size={24} />
                  </div>

                  <Badge variant="outline">PDF</Badge>
                </div>

                {renamingId === resume._id ? (
                  <div className="space-y-3">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-violet-500"
                    />

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleRename(resume._id)}
                      >
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setRenamingId(null);
                          setNewName("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="line-clamp-2 text-lg font-semibold text-white">
                      {resume.originalName}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      {(resume.fileSize / 1024).toFixed(1)} KB
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Uploaded {new Date(resume.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => previewResume(resume._id)}
                      >
                        <Eye size={15} />
                        Preview
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startRename(resume)}
                      >
                        <Pencil size={15} />
                        Rename
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteTarget(resume)}
                      >
                        <Trash2 size={15} />
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {deleteTarget && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
        <Trash2 size={24} />
      </div>

      <h2 className="text-xl font-semibold">
        Delete resume?
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Are you sure you want to delete{" "}
        <span className="font-medium text-white">
          {deleteTarget.originalName}
        </span>
        ? This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => setDeleteTarget(null)}
        >
          Cancel
        </Button>

        <Button
          variant="destructive"
          onClick={async () => {
            const deleted = await deleteResume(deleteTarget._id);

            if (deleted) {
              setDeleteTarget(null);
            }
          }}
        >
          Delete Resume
        </Button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Resumes;
