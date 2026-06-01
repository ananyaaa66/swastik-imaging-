import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Search, Trash2, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { getAppointments, deleteAppointment } from "@/lib/api";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAppointments = useCallback(async (search?: string) => {
    setLoading(true);
    try {
      const data = await getAppointments(search);
      setAppointments(data);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAppointments(searchQuery || undefined);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchAppointments]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAppointment(deleteTarget);
      setAppointments((prev) => prev.filter((a) => a.id !== deleteTarget));
      toast.success("Appointment deleted");
    } catch (err) {
      toast.error("Failed to delete appointment");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout title="Appointments">
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, phone, email, or test..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card className="border-gray-200/60">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <CalendarDays className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium text-lg">No appointments found</p>
              <p className="text-sm mt-1">
                {searchQuery ? "Try a different search term." : "Appointments will appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Patient Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 hidden sm:table-cell">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 hidden md:table-cell">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 hidden lg:table-cell">Test Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date / Time</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt: any, idx: number) => (
                    <tr
                      key={appt.id || idx}
                      className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{appt.fullName}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{appt.phoneNumber}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 hidden sm:table-cell">{appt.phoneNumber}</td>
                      <td className="py-3 px-4 text-gray-600 hidden md:table-cell">
                        <span className="max-w-[180px] truncate inline-block">{appt.email}</span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-medical-light text-medical-primary max-w-[200px] truncate">
                          {appt.testSelection}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        <div>
                          <p>
                            {appt.appointmentDate
                              ? new Date(appt.appointmentDate).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "—"}
                          </p>
                          <p className="text-xs text-gray-400">{appt.appointmentTime}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => setDeleteTarget(appt.id)}
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The appointment record will be permanently removed.
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
