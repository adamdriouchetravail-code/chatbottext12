const { execSync } = require('child_process');

module.exports = async function(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'no message' });
  const prompt = `Human: ${message}\nAssistant:`;
  try {
    // Placeholder response – le vrai modèle sera appelé ici
    const answer = `🤖 ${message}`;
    res.json({ answer });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'LLM failed' });
  }
};