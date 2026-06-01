import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  Users,
  Megaphone,
  CalendarCheck,
  ArrowRight,
  Upload,
  Send,
} from "lucide-react";
import { getAppointmentStats, getAppointments, getContactCount, getCampaigns } from "@/lib/api";
import type { AppointmentStats } from "@/lib/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AppointmentStats | null>(null);
  const [contactCount, setContactCount] = useState<number | null>(null);
  const [campaignCount, setCampaignCount] = useState<number | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [s, cc, campaigns, appts] = await Promise.all([
          getAppointmentStats(),
          getContactCount(),
          getCampaigns(),
          getAppointments(undefined, 5),
        ]);
        setStats(s);
        setContactCount(cc.total);
        setCampaignCount(campaigns.length);
        setRecentAppointments(appts);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Appointments",
      value: stats?.total ?? 0,
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      label: "Today's Appointments",
      value: stats?.today ?? 0,
      icon: CalendarCheck,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100",
    },
    {
      label: "Total Contacts",
      value: contactCount ?? 0,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      label: "Campaigns Sent",
      value: campaignCount ?? 0,
      icon: Megaphone,
      color: "bg-orange-50 text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Card key={card.label} className="border-gray-200/60 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-5">
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                    <card.icon className={`h-5 w-5 ${card.color.split(" ")[1]}`} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card
          className="border-gray-200/60 hover:border-medical-primary/30 hover:shadow-md cursor-pointer transition-all duration-200 group"
          onClick={() => navigate("/admin/appointments")}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-medical-light group-hover:bg-medical-primary transition-colors">
              <CalendarDays className="h-5 w-5 text-medical-primary group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">View Appointments</p>
              <p className="text-sm text-gray-500">Manage all bookings</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-medical-primary transition-colors" />
          </CardContent>
        </Card>

        <Card
          className="border-gray-200/60 hover:border-medical-primary/30 hover:shadow-md cursor-pointer transition-all duration-200 group"
          onClick={() => navigate("/admin/contacts")}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-50 group-hover:bg-purple-500 transition-colors">
              <Upload className="h-5 w-5 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Upload Contacts</p>
              <p className="text-sm text-gray-500">Import CSV/Excel</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </CardContent>
        </Card>

        <Card
          className="border-gray-200/60 hover:border-medical-primary/30 hover:shadow-md cursor-pointer transition-all duration-200 group"
          onClick={() => navigate("/admin/campaigns")}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-50 group-hover:bg-orange-500 transition-colors">
              <Send className="h-5 w-5 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Create Campaign</p>
              <p className="text-sm text-gray-500">Send WhatsApp blast</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card className="border-gray-200/60">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg font-semibold">Recent Appointments</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-medical-primary hover:text-medical-secondary"
            onClick={() => navigate("/admin/appointments")}
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : recentAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarDays className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p className="font-medium">No appointments yet</p>
              <p className="text-sm">Appointments will appear here once patients book.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500">Patient</th>
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500 hidden sm:table-cell">Phone</th>
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500 hidden md:table-cell">Test</th>
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appt: any, idx: number) => (
                    <tr
                      key={appt.id || idx}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-2.5 px-3 font-medium text-gray-900">
                        {appt.fullName}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600 hidden sm:table-cell">
                        {appt.phoneNumber}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600 hidden md:table-cell">
                        <span className="inline-block max-w-[200px] truncate">
                          {appt.testSelection}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-600">
                        {appt.appointmentDate
                          ? new Date(appt.appointmentDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
