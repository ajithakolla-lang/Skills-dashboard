
import { GoogleGenAI, Type } from "@google/genai";
import { Filters } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. AI functionality will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        domain: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of domain expertise to filter by (e.g., 'Finance', 'Healthcare')." },
        certification: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of certifications to filter by (e.g., 'AWS', 'PMP')." },
        client: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of clients the employee has worked with." },
        location: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of employee office locations." },
        manager: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of reporting managers." },
        skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords, technologies, or concepts to search for in employee experience details." },
        hasPreSalesExperience: { type: Type.BOOLEAN, description: "Set to true if the user is asking for people with any pre-sales experience." },
        clarification: { type: Type.STRING, description: "Only use this to ask a clarifying question if the user's query is a question you cannot answer and no filters can be applied. For simple keyword searches, use the 'skills' filter instead." },
    },
};


export const parseQueryToFilters = async (
  query: string
): Promise<{ filters?: Partial<Filters>; clarification?: string; error?: string }> => {
  if (!process.env.API_KEY) {
    return { error: "API key is not configured. Please set the API_KEY environment variable." };
  }
    
  const prompt = `
    You are an expert data analyst AI. Your purpose is to translate a user's natural language question into a structured JSON filter object to query an employee database. You must be very accurate and intelligent in interpreting the user's intent.

    **DATABASE CONTEXT:**
    You are querying a database of employees with the following data structure:
    - \`name: string\` (e.g., "John Doe")
    - \`jobTitle: string\` (e.g., "Senior Product Manager")
    - \`location: string\` (Possible values: "Santa Clara", "Toronto", "Bellevue")
    - \`reportingManager: string\` (e.g., "Priya Shah")
    - \`project: string\` (e.g., "DISA Modernization")
    - \`clients: string[]\` (e.g., ["Medtronic", "Verizon"])
    - \`expertise: { domain: string, level: string }[]\` (e.g., [{ domain: "Finance", level: "Expert" }])
    - \`certifications: string[]\` (e.g., ["AWS", "PMP", "CSM"])
    - \`domainExperienceDetails: string\` (Free-text paragraph describing work history.)
    - \`preSalesExperience: string\` (Free-text paragraph about pre-sales work.)
    - \`genAITechnologies: string\` (e.g., "Azure OpenAI", "LLM")

    **FILTERING RULES:**
    Based on the user's query, create a JSON object. The JSON should only contain keys for the filters the user mentioned.
    1.  **domain**: Use for broad expertise areas like "Finance" or "Automotive".
    2.  **certification**: Use for official certifications like "AWS certified", "PMP", "CSM". Be flexible with wording (e.g., "aws cert" -> "AWS").
    3.  **client**: Use for company names the employee has worked with.
    4.  **location**: Use for cities. Be smart about regions:
        - "USA", "US", "United States" should map to: ["Santa Clara", "Bellevue"]
        - "Canada" should map to: ["Toronto"]
    5.  **manager**: Use for names of reporting managers.
    6.  **skills**: This is a CRITICAL and flexible filter. Use it for any ability, technology, concept, or experience that would be found in the free-text fields (\`domainExperienceDetails\`, \`preSalesExperience\`, etc.). Extract the core concepts.
        - **Phrase Priority Rule**: If the user's query is a multi-word phrase that looks like a project name or specific concept (e.g., "USA Transition", "DISA Modernization"), you MUST treat the ENTIRE phrase as a single entry in the 'skills' array. Do NOT break it apart. For example, the query "USA Transition" must result in \`{"skills": ["USA Transition"]}\`, not a location filter for "USA". This is crucial for project names.
        - **IMPORTANT**: Do NOT use this filter for general "pre-sales" queries. Use the \`hasPreSalesExperience\` flag for that. Only use the skills filter for *other* keywords in the query.
        - "who has worked on data platforms?" -> \`{"skills": ["data platform"]}\`
        - "experience with API and billing systems" -> \`{"skills": ["API", "billing"]}\`
        - "worked on fraud prevention" -> \`{"skills": ["fraud prevention"]}\`
        - "knows Python" -> \`{"skills": ["Python"]}\`
        - "omnichannel platform experience" -> \`{"skills": ["omnichannel"]}\`
    7.  **hasPreSalesExperience**: This is a SPECIAL boolean filter. If the user's query asks for people with "pre-sales experience", "pre sales", "presales", or similar general variations, you MUST set this flag to \`true\`.
        - "people with pre-sales experience" -> \`{"hasPreSalesExperience": true}\`
        - "who has presales background?" -> \`{"hasPreSalesExperience": true}\`
        - If the query is more specific, like "pre-sales experience with ERP systems", then use both filters: \`{"hasPreSalesExperience": true, "skills": ["ERP"]}\`

    **GENERAL INSTRUCTIONS:**
    - Your primary goal is to return a valid filter object based on the user's query.
    - For complex queries with multiple conditions (e.g., "AWS certified in Toronto"), populate multiple filter fields.
    - **Ambiguity Rule**: If a query is simple or ambiguous (e.g., a single name like 'Ajitha'), do NOT ask for clarification. Treat it as a general keyword search and populate the \`skills\` filter. For example, a query of "ajitha" must result in \`{"skills": ["ajitha"]}\`. A query for "Medtronic" should also become \`{"skills": ["Medtronic"]}\`.
    - Only use the 'clarification' field as a last resort, for example, if the user asks a question completely unrelated to the employee data.
    - You MUST respond in a valid JSON format conforming to the provided schema.

    **USER QUERY:** "${query}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text.trim();
     // A simple check to handle potentially non-JSON responses gracefully, though the API should return JSON.
    if (!text.startsWith("{") && !text.startsWith("[")) {
       throw new Error("Received non-JSON response from AI.");
    }
    const parsedJson = JSON.parse(text);

    const filters: Partial<Filters> = {};
    if (parsedJson.domain) filters.domain = parsedJson.domain;
    if (parsedJson.certification) filters.certification = parsedJson.certification;
    if (parsedJson.client) filters.client = parsedJson.client;
    if (parsedJson.location) filters.location = parsedJson.location;
    if (parsedJson.manager) filters.manager = parsedJson.manager;
    if (parsedJson.skills) filters.skills = parsedJson.skills;
    if (parsedJson.hasPreSalesExperience) filters.hasPreSalesExperience = parsedJson.hasPreSalesExperience;

    return { filters, clarification: parsedJson.clarification };

  } catch (error) {
    console.error("Error parsing query with Gemini API:", error);
    if (error instanceof SyntaxError) {
      return { error: "The AI returned an invalid response. Please try rephrasing your query." };
    }
    return { error: "I'm having trouble understanding that. Could you please try rephrasing your question?" };
  }
};