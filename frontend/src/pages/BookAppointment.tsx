import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const appointmentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  age: z.coerce
    .number()
    .min(1, "Age must be at least 1")
    .max(150, "Age must be realistic"),
  appointmentDate: z
    .string()
    .refine((date) => new Date(date) > new Date(), "Appointment date must be in the future"),
  appointmentTime: z.string().min(1, "Please select a time"),
  testSelection: z.string().min(1, "Please select a test type"),
  additionalNotes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const testOptions = [
  // X-RAY Tests
  "X-RAY CHEST PA",
  "X-RAY CHEST AP",
  "X-RAY CHEST AP/LAT",
  "X-RAY PNS WATER'S VIEW",
  "X-RAY PNS OBL",
  "X-RAY KUB",
  "X-RAY SKULL AP/LAT",
  "X-RAY CERVICAL SPINE AP/LAT",
  "X-RAY DORSAL SPINE AP/LAT",
  "X-RAY LUMBAR SPINE AP/LAT",
  "X-RAY LS SPINE AP/LAT",
  "X-RAY FACE AP/LAT",
  "X-RAY PELVIS AP",
  "X-RAY RIGHT HIP AP/LAT",
  "X-RAY LEFT HIP AP/LAT",
  "X-RAY BOTH HIP AP/LAT",
  "X-RAY RIGHT KNEE AP/LAT",
  "X-RAY LEFT KNEE AP/LAT",
  "X-RAY BOTH KNEE AP/LAT",
  "X-RAY RIGHT LEG AP/LAT",
  "X-RAY LEFT LEG AP/LAT",
  "X-RAY ANKLE AP/LAT",
  "X-RAY THIGH AP/LAT",
  "X-RAY FOOT AP/LAT",
  "X-RAY FOOT AP",
  "X-RAY RIGHT FOOT OBL",
  "X-RAY FEMUR AP/LAT",
  "X-RAY HEEL AP/LAT",
  "X-RAY NASAL BONE LAT",
  "X-RAY SHOULDER AP/LAT",
  "X-RAY BOTH SHOULDER AP/LAT",
  "X-RAY ARM AP/LAT",
  "X-RAY ELBOW AP/LAT",
  "X-RAY FORARM AP/LAT",
  "X-RAY WRIST AP/LAT",
  "X-RAY WRIST AP",
  "X-RAY FINGER AP/LAT",
  "X-RAY SCAPULA AP/LAT",
  "X-RAY THUMB AP/LAT",
  "X-RAY HUMERUS AP/LAT",
  "X-RAY HAND AP/LAT",
  "X-RAY SOFT TISSUES NECK",
  "X-RAY WHOLE SPINE AP/LAT",
  "X-RAY WHOLE LEG AP",
  "X-RAY FACIAL VIEW",
  "IVP (X-RAY)",
  "HSG (X-RAY)",
  // Ultrasound (USG)
  "USG WHOLE ABDOMEN",
  "USG WHOLE ABD + TVS",
  "USG WHOLE ABDOMEN WITH PVRU",
  "USG TVS STUDY",
  "USG TVS WITH DOPPLER",
  "USG KUB",
  "USG KUB WITH PVRU",
  "USG UPPER ABDOMEN",
  "USG PELVIS",
  "USG LOWER ABDOMEN",
  "USG OBS",
  "USG OBS WITH TVS STUDY",
  "USG OBS WITH WHOLE ABDOMEN",
  "OBS COLOR DOPPLER PREGNANCY",
  "OBS USG - BIOPHYSICAL PROFILE",
  "USG OBS TWIN PREGNANCY",
  "USG LEVEL-I SCAN (NT-NB)",
  "USG LEVEL-I SCAN (NT-NB) WITH COLOR DOPPLER",
  "USG LEVEL-I SCAN (NT-NB) TWIN",
  "USG LEVEL-II SCAN",
  "USG OBS COLOR DOPPLER TWIN PREGNANCY",
  "USG LEVEL II TWIN PREGNANCY",
  "USG FOLLICULAR ONE SITTING",
  "USG FOLLICULAR (3 SITTINGS) WITH LOWER ABDOMEN",
  "USG GUIDED FNAC",
  "USG GUIDED INTERVENTION / PLEURAL-ASCITIC TAPPING",
  "USG GUIDED INTERVENTION",
  "USG CHEST",
  "USG THYROID (NECK)",
  "USG ARTERIAL/VENOUS BOTH LIMBS (UPPER/LOWER)",
  "USG ARTERIAL/VENOUS SINGLE LIMB (UPPER/LOWER)",
  "USG SCROTUM",
  "USG SCROTUM WITH DOPPLER",
  "RENAL DOPPLER",
  "CAROTID DOPPLER",
  "B-SCAN",
  "USG BREAST UNILATERAL",
  "USG BOTH BREAST",
  "USG CRANIUM",
  "USG SOFT TISSUE OR SMALL PART",
  "USG 3D/4D SCAN",
  // Cardiac & Other Diagnostics
  "FETAL ECHO",
  "2D ECHOCARDIOGRAPHY",
  "STRESS ECHO",
  "STRESS ECHO (Dobutamine)",
  "ECG",
  "HOLTER MONITORING",
  "TMT",
  // Pulmonary / Neuro / Other
  "PFT (Pulmonary Function Test)",
  "PFT Pre and Post",
  "FIBRO SCAN",
  "EEG",
];

export default function BookAppointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: undefined,
      age: undefined,
      appointmentDate: "",
      appointmentTime: "",
      testSelection: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const backendUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${backendUrl}/api/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to book appointment");
      }

      setSubmitStatus("success");
      form.reset();

      setTimeout(() => {
        navigate("/appointment-confirmation", {
          state: { appointmentData: data },
        });
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to schedule your diagnostic test
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-medical-light border-b">
            <CardTitle className="text-medical-primary">Appointment Details</CardTitle>
            <CardDescription>Please fill out all required fields</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {submitStatus === "success" && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Appointment booked successfully! Redirecting to confirmation page...
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="9876543210"
                          maxLength={10}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>10-digit mobile number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender and Age - Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger disabled={isSubmitting}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="25"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Test Selection */}
                <FormField
                  control={form.control}
                  name="testSelection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Type *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger disabled={isSubmitting}>
                            <SelectValue placeholder="Select a test" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {testOptions.map((test) => (
                            <SelectItem key={test} value={test}>
                              {test}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date and Time - Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Date *</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            disabled={isSubmitting}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appointmentTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Time *</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger disabled={isSubmitting}>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                            <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                            <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                            <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Notes */}
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information or medical history we should know about..."
                          className="resize-none"
                          rows={4}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional - Tell us anything else that helps us serve you better
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-medical-primary hover:bg-medical-secondary text-white py-3 rounded-lg font-semibold text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className="text-center text-gray-600 mt-6 text-sm">
          * Required fields. We'll send a confirmation via WhatsApp to your registered number.
        </p>
      </div>
    </div>
  );
}
