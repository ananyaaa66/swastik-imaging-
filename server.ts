import express from "express";
import { handler as appointmentHandler } from "./src/pages/api/appointment";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// API route for appointments
app.post("/api/appointment", async (req, res) => {
  try {
    const response = await appointmentHandler(
      new Request("http://localhost/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      })
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
