const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

export async function submitLead(data: LeadData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY format
        status: "New"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit inquiry");
    }

    return await response.json();
  } catch (error) {
    console.error("Lead submission error:", error);
    throw error;
  }
}
