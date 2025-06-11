import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey); 


export const generationConfig = {
  temperature: 1,           
  topP: 0.95,                 
  topK: 64,                  
  maxOutputTokens: 8192,      
  responseMimeType: "application/json", 
};

// Model configuration
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
   
});



// Start chat session with history
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{
        text: `Generate a 3-day Las Vegas travel plan for couples on a budget.
        Include:
        - Hotel options with name, address, price, image URL, coordinates, rating, description
        - Daily itinerary with place name, details, image URL, coordinates, pricing, rating, duration
        - Format response as valid JSON`
      }]
    },
    {
      role: "model",
      parts: [{
        text: `\`\`\`json
{
  "travelPlan": {
    "hotels": [
      {
        "hotelName": "The D Las Vegas",
        "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
        "price": "$50-$100 per night",
        "hotelImageUrl": "https://www.theDcasino.com/images/hero/main-hero-02.jpg",
        "geoCoordinates": {
          "latitude": 36.1695,
          "longitude": -115.1438
        },
        "rating": 3.5,
        "description": "A budget-friendly hotel located in downtown Las Vegas with retro decor and modern amenities. Close to Fremont Street Experience."
      },
      {
        "hotelName": "Circus Circus Hotel & Casino",
        "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$40-$90 per night",
        "hotelImageUrl": "https://example.com/circus-circus.jpg",
        "geoCoordinates": {
          "latitude": 36.1350,
          "longitude": -115.1680
        },
        "rating": 3.0,
        "description": "Family-friendly budget option with circus acts and amusement park. North Strip location."
      }
    ],
    "itinerary": {
      "day1": [
        {
          "placeName": "Fremont Street Experience",
          "details": "Free light shows and street performers",
          "imageUrl": "https://example.com/fremont.jpg",
          "coordinates": {
            "latitude": 36.1706,
            "longitude": -115.1450
          },
          "pricing": "Free",
          "rating": 4.7,
          "duration": "2-3 hours"
        }
      ],
      "day2": [
        // Additional itinerary items
      ]
    }
  }
}
\`\`\``
      }]
    }
  ]
});

