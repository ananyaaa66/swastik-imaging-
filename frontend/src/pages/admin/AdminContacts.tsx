import { useEffect, useState, useCallback, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Trash2,
  Users,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { getContacts, deleteContact, uploadContacts } from "@/lib/api";
import type { UploadResult } from "@/lib/api";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fetchContacts = useCallback(async (search?: string) => {
    setLoading(true);
    try {
      const data = await getContacts(search);
      setContacts(data);
    } catch (err) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts(searchQuery || undefined);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchContacts]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteContact(deleteTarget);
      setContacts((prev) => prev.filter((c) => c.id !== deleteTarget));
      toast.success("Contact deleted");
    } catch (err) {
      toast.error("Failed to delete contact");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadResult(null);
    try {
      const result = await uploadContacts(file);
      setUploadResult(result);
      toast.success(`Imported ${result.imported} contacts`);
      fetchContacts();
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const downloadSampleCsv = () => {
    const csv = "Name,Phone,Email\nJohn Doe,9876543210,john@example.com\nJane Smith,9123456789,jane@example.com\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_contacts.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Contacts">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="xl:col-span-2">
          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, phone, or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card className="border-gray-200/60">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium text-lg">No contacts found</p>
                  <p className="text-sm mt-1">
                    {searchQuery ? "Try a different search." : "Upload contacts or book appointments to get started."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 hidden md:table-cell">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 hidden sm:table-cell">Source</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact: any, idx: number) => (
                        <tr
                          key={contact.id || idx}
                          className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {contact.patientName || contact.name || "—"}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{contact.phone}</td>
                          <td className="py-3 px-4 text-gray-600 hidden md:table-cell">
                            <span className="max-w-[180px] truncate inline-block">
                              {contact.email || "—"}
                            </span>
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            <Badge
                              variant="secondary"
                              className={
                                contact.source === "website"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                            >
                              {contact.source === "website" ? "Website" : "Import"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                              onClick={() => setDeleteTarget(contact.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upload Panel */}
        <div className="space-y-4">
          <Card className="border-gray-200/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Drop zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? "border-medical-primary bg-medical-light"
                    : "border-gray-200 hover:border-medical-primary/50 hover:bg-gray-50"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={onFileChange}
                />
                {uploading ? (
                  <div className="space-y-2">
                    <div className="w-10 h-10 mx-auto rounded-full bg-medical-light flex items-center justify-center animate-pulse">
                      <Upload className="h-5 w-5 text-medical-primary" />
                    </div>
                    <p className="text-sm font-medium text-medical-primary">Uploading...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FileSpreadsheet className="h-10 w-10 mx-auto text-gray-300" />
                    <p className="text-sm font-medium text-gray-700">
                      Drop CSV/Excel file here
                    </p>
                    <p className="text-xs text-gray-400">or click to browse</p>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 text-xs"
                onClick={downloadSampleCsv}
              >
                <Download className="h-3 w-3 mr-1" />
                Download Sample CSV
              </Button>
            </CardContent>
          </Card>

          {/* Upload Results */}
          {uploadResult && (
            <Card className="border-gray-200/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Import Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-green-50">
                    <p className="text-lg font-bold text-green-700">{uploadResult.imported}</p>
                    <p className="text-xs text-green-600">Imported</p>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-50">
                    <p className="text-lg font-bold text-yellow-700">{uploadResult.skipped}</p>
                    <p className="text-xs text-yellow-600">Skipped</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-50">
                    <p className="text-lg font-bold text-red-700">
                      {Array.isArray(uploadResult.failed) ? uploadResult.failed.length : 0}
                    </p>
                    <p className="text-xs text-red-600">Failed</p>
                  </div>
                </div>

                {uploadResult.failed && Array.isArray(uploadResult.failed) && uploadResult.failed.length > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-xs text-red-700">
                      <p className="font-medium mb-1">Failed rows:</p>
                      <ul className="space-y-0.5">
                        {uploadResult.failed.slice(0, 5).map((err: any, i: number) => (
                          <li key={i}>Row {err.row}: {err.error}</li>
                        ))}
                        {uploadResult.failed.length > 5 && (
                          <li>...and {uploadResult.failed.length - 5} more</li>
                        )}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this contact from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
