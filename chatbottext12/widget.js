(() => {
  // Configuration – read from script tag attributes
  const scriptTag = document.currentScript;
  const apiUrl = scriptTag.getAttribute('data-bot-url') || '/api/message';

  // Create container
  const container = document.createElement('div');
  container.id = 'simple-chatbot-container';
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.width = '300px';
  container.style.maxHeight = '400px';
  container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  container.style.borderRadius = '8px';
  container.style.overflow = 'hidden';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.background = '#fff';
  container.style.zIndex = '999999';
  document.body.appendChild(container);

  // Header
  const header = document.createElement('div');
  header.style.background = '#4a90e2';
  header.style.color = '#fff';
  header.style.padding = '8px';
  header.style.textAlign = 'center';
  header.textContent = 'Chatbot';
  container.appendChild(header);

  // Message area
  const messages = document.createElement('div');
  messages.style.flex = '1';
  messages.style.padding = '8px';
  messages.style.overflowY = 'auto';
  messages.style.fontSize = '14px';
  container.appendChild(messages);

  // Input area
  const inputWrapper = document.createElement('div');
  inputWrapper.style.display = 'flex';
  inputWrapper.style.borderTop = '1px solid #ddd';
  container.appendChild(inputWrapper);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Écrire un message…';
  input.style.flex = '1';
  input.style.border = 'none';
  input.style.padding = '8px';
  inputWrapper.appendChild(input);

  const sendBtn = document.createElement('button');
  sendBtn.textContent = '→';
  sendBtn.style.border = 'none';
  sendBtn.style.background = '#4a90e2';
  sendBtn.style.color = '#fff';
  sendBtn.style.padding = '0 12px';
  sendBtn.style.cursor = 'pointer';
  inputWrapper.appendChild(sendBtn);

  let sessionId = null;

  function addMessage(text, from) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.marginBottom = '6px';
    msg.style.textAlign = from === 'bot' ? 'left' : 'right';
    msg.style.color = from === 'bot' ? '#000' : '#0066cc';
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    try {
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text })
      });
      const data = await resp.json();
      if (data.sessionId) sessionId = data.sessionId;
      addMessage(data.reply || 'Erreur', 'bot');
    } catch (e) {
      addMessage('Erreur de communication', 'bot');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
})();
