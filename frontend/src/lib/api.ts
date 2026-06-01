import { getToken, removeToken } from "./auth";

// In production (Vercel), API calls go to the Render backend URL.
// In dev, Vite proxy forwards /api to localhost:8001 so we use "".
const API_BASE = import.meta.env.VITE_API_URL || "";

// ── Types ────────────────────────────────────────────────────────────────────

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface MessageResponse {
  message: string;
}

export interface AppointmentStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  testType: string;
  dateTime: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: "website" | "manual-import";
  createdAt: string;
}

export interface ContactCount {
  total: number;
}

export interface UploadResult {
  imported: number;
  skipped: number;
  failed: { row: number; error: string }[];
}

export interface Campaign {
  id: string;
  title: string;
  message: string;
  recipientCount: number;
  createdAt: string;
}

export interface CreateCampaignPayload {
  title: string;
  message: string;
  recipientIds?: string[];
}

// ── Fetch Wrapper ────────────────────────────────────────────────────────────

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets boundary automatically)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    window.location.href = "/admin/login";
    throw new ApiError("Unauthorized", 401);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.detail || errorData.message || `Request failed (${response.status})`,
      response.status
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// ── Auth Endpoints ───────────────────────────────────────────────────────────

export async function loginAdmin(
  username: string,
  password: string
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function registerAdmin(
  username: string,
  password: string
): Promise<MessageResponse> {
  return apiFetch<MessageResponse>("/api/admin/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function verifyToken(): Promise<MessageResponse> {
  return apiFetch<MessageResponse>("/api/admin/verify");
}

// ── Appointment Endpoints ────────────────────────────────────────────────────

export async function getAppointments(
  search?: string,
  limit?: number
): Promise<Appointment[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (limit) params.set("limit", String(limit));
  const qs = params.toString();
  return apiFetch<Appointment[]>(`/api/appointments${qs ? `?${qs}` : ""}`);
}

export async function getAppointmentStats(): Promise<AppointmentStats> {
  return apiFetch<AppointmentStats>("/api/appointments/stats");
}

export async function deleteAppointment(id: string): Promise<void> {
  return apiFetch<void>(`/api/appointments/${id}`, { method: "DELETE" });
}

// ── Contact Endpoints ────────────────────────────────────────────────────────

export async function getContacts(search?: string): Promise<Contact[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  const qs = params.toString();
  return apiFetch<Contact[]>(`/api/contacts${qs ? `?${qs}` : ""}`);
}

export async function getContactCount(): Promise<ContactCount> {
  return apiFetch<ContactCount>("/api/contacts/count");
}

export async function uploadContacts(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch<UploadResult>("/api/contacts/upload", {
    method: "POST",
    body: formData,
  });
}

export async function deleteContact(id: string): Promise<void> {
  return apiFetch<void>(`/api/contacts/${id}`, { method: "DELETE" });
}

// ── Campaign Endpoints ───────────────────────────────────────────────────────

export async function getCampaigns(): Promise<Campaign[]> {
  return apiFetch<Campaign[]>("/api/campaigns");
}

export async function createCampaign(
  data: CreateCampaignPayload
): Promise<Campaign> {
  return apiFetch<Campaign>("/api/campaigns", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCampaignById(id: string): Promise<Campaign> {
  return apiFetch<Campaign>(`/api/campaigns/${id}`);
}
