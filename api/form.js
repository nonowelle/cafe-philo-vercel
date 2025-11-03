export default async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    console.log("Form reçu :", req.body);

    if (!process.env.GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL is not set");
      return res.status(500).json({ error: "Configuration error: GOOGLE_SCRIPT_URL not set" });
    }

    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log('Réponse brute Google Script:', text);

    try {
      const result = JSON.parse(text);
      return res.status(200).json(result);
    } catch (e) {
      console.error("Réponse non JSON :", text);
      return res.status(500).json({ error: "Réponse non JSON reçue du Google Script" });
    }
  } catch (error) {
    console.error("Erreur proxy:", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

