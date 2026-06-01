import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Megaphone,
  Send,
  Users,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { getCampaigns, createCampaign, getContacts } from "@/lib/api";

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendToAll, setSendToAll] = useState(true);
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [sending, setSending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const loadContacts = async () => {
    if (contacts.length > 0) return;
    setLoadingContacts(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      toast.error("Failed to load contacts");
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    if (!sendToAll) {
      loadContacts();
    }
  }, [sendToAll]);

  const toggleContact = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllContacts = () => {
    if (selectedIds.length === contacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(contacts.map((c) => c.id));
    }
  };

  const recipientCount = sendToAll ? contacts.length || "All" : selectedIds.length;

  const handleSend = async () => {
    setConfirmOpen(false);
    setSending(true);
    try {
      const payload: any = { title, message };
      if (!sendToAll && selectedIds.length > 0) {
        payload.recipientIds = selectedIds;
      }
      await createCampaign(payload);
      toast.success("Campaign sent successfully!");
      setTitle("");
      setMessage("");
      setSelectedIds([]);
      setSendToAll(true);
      fetchCampaigns();
    } catch (err: any) {
      toast.error(err?.message || "Failed to send campaign");
    } finally {
      setSending(false);
    }
  };

  const canSend = title.trim() && message.trim() && (sendToAll || selectedIds.length > 0);

  return (
    <AdminLayout title="Campaigns">
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="create" className="data-[state=active]:bg-medical-primary data-[state=active]:text-white">
            <Send className="h-4 w-4 mr-2" />
            Create Campaign
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-medical-primary data-[state=active]:text-white">
            <Clock className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Create Campaign Tab */}
        <TabsContent value="create">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message Form */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-gray-200/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Campaign Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-title" className="text-sm font-medium">
                      Campaign Title
                    </Label>
                    <Input
                      id="campaign-title"
                      placeholder="e.g., Diwali Health Offer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                      disabled={sending}
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign-message" className="text-sm font-medium">
                      Message Body
                    </Label>
                    <Textarea
                      id="campaign-message"
                      placeholder="e.g., Get 10% OFF on all MRI scans this week! Visit Swastik Imaging & Diagnostics. Call +91-7303034849"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 min-h-[150px] resize-none"
                      disabled={sending}
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {message.length} characters
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recipient Selection */}
              <Card className="border-gray-200/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Recipients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="recipients"
                          checked={sendToAll}
                          onChange={() => setSendToAll(true)}
                          className="w-4 h-4 text-medical-primary"
                        />
                        <span className="text-sm font-medium">All Contacts</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="recipients"
                          checked={!sendToAll}
                          onChange={() => setSendToAll(false)}
                          className="w-4 h-4 text-medical-primary"
                        />
                        <span className="text-sm font-medium">Select Contacts</span>
                      </label>
                    </div>

                    {!sendToAll && (
                      <div className="border rounded-lg max-h-[300px] overflow-y-auto">
                        {loadingContacts ? (
                          <div className="p-6 space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <Skeleton key={i} className="h-8 w-full" />
                            ))}
                          </div>
                        ) : contacts.length === 0 ? (
                          <div className="p-6 text-center text-gray-500 text-sm">
                            No contacts available. Upload contacts first.
                          </div>
                        ) : (
                          <>
                            <div className="p-2 border-b bg-gray-50/50 flex items-center justify-between">
                              <label className="flex items-center gap-2 cursor-pointer text-sm px-2">
                                <Checkbox
                                  checked={selectedIds.length === contacts.length && contacts.length > 0}
                                  onCheckedChange={selectAllContacts}
                                />
                                Select All ({contacts.length})
                              </label>
                              <Badge variant="secondary" className="text-xs">
                                {selectedIds.length} selected
                              </Badge>
                            </div>
                            {contacts.map((contact: any) => (
                              <label
                                key={contact.id}
                                className="flex items-center gap-3 px-4 py-2 border-b border-gray-50 hover:bg-gray-50/80 cursor-pointer transition-colors"
                              >
                                <Checkbox
                                  checked={selectedIds.includes(contact.id)}
                                  onCheckedChange={() => toggleContact(contact.id)}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {contact.patientName || contact.name || "—"}
                                  </p>
                                  <p className="text-xs text-gray-400">{contact.phone}</p>
                                </div>
                              </label>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview & Send */}
            <div>
              <Card className="border-gray-200/60 sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Preview & Send</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {title || message ? (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                      <p className="text-xs font-semibold text-green-800 mb-2">WhatsApp Preview</p>
                      {title && (
                        <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
                      )}
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{message || "Your message will appear here..."}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                      <MessageSquare className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-400">Enter a title and message to preview</p>
                    </div>
                  )}

                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Recipients: </span>
                    {sendToAll ? "All contacts" : `${selectedIds.length} selected`}
                  </div>

                  <Button
                    className="w-full bg-medical-primary hover:bg-medical-secondary text-white"
                    disabled={!canSend || sending}
                    onClick={() => setConfirmOpen(true)}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Campaign
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="border-gray-200/60">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : campaigns.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <Megaphone className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium text-lg">No campaigns yet</p>
                  <p className="text-sm mt-1">Create your first campaign to get started.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {campaigns.map((campaign: any, idx: number) => (
                    <div
                      key={campaign.id || idx}
                      className="p-5 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {campaign.message}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {campaign.totalRecipients} recipients
                            </span>
                            {campaign.successCount !== undefined && (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {campaign.successCount} delivered
                              </span>
                            )}
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {campaign.createdAt
                                ? new Date(campaign.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Send Confirmation */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a WhatsApp message to{" "}
              <strong>{sendToAll ? "all contacts" : `${selectedIds.length} selected contacts`}</strong>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSend}
              className="bg-medical-primary hover:bg-medical-secondary text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              Confirm & Send
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
