# Criar uma versão corrigida do arquivo
cat > api/index.js << 'EOF'
// api/index.js - VERSÃO CORRIGIDA
const express = require('express');
const app = express();

// Rota principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>CheckProprioSystem - ONLINE</title>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
            .status { color: green; font-weight: bold; font-size: 24px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 CheckProprioSystem</h1>
            <p class="status">✅ SISTEMA ONLINE</p>
            <p><strong>Bot Telegram:</strong> @chec_proprio_bot</p>
            <p><strong>Domínio:</strong> gestao-bot.wetod.app</p>
            <hr>
            <p><a href="/health">Health Check</a></p>
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    system: 'CheckProprioSystem',
    timestamp: new Date().toISOString()
  });
});

// INICIAR SERVIDOR (LINHA QUE FALTAVA)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 Server running on port', PORT);
});

// Export para Vercel (mantém compatibilidade)
module.exports = app;
EOF
