import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/calculate-destance", async (req, res) => {
  try {
    const { location1, location2 } = req.body;

    const apiKey = process.env.GOOGLE_API_KEY;
    const apiUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";

    const response = await axios.get(apiUrl, {
      params: {
        origins: location1,
        destinations: location2,
        key: apiKey,
      },
    });

    console.log("Google Maps API Response:", response.data);

    const distance = response.data.rows[0]?.elements[0]?.distance?.text;
    const duration = response.data.rows[0]?.elements[0]?.duration?.text;

    res.status(200).send({
      success: true,
      message: "Distance Calulated Successfully",
      distance,
      duration,
    });
  } catch (error) {
    console.error("Error:", error.message);
    console.error("API Response:", error.response?.data);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
