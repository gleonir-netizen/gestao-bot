// api/index.js - SERVER COMPLETO PARA VERCEL
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
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Arial', sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 600px;
                width: 90%;
            }
            h1 { color: #333; margin-bottom: 20px; font-size: 2.5em; }
            .status { 
                color: #10b981; 
                font-weight: bold; 
                font-size: 1.5em;
                margin: 20px 0;
                padding: 10px;
                background: #ecfdf5;
                border-radius: 8px;
            }
            .info-box {
                background: #f8fafc;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: left;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 CheckProprioSystem</h1>
            <div class="status">✅ SISTEMA ONLINE</div>
            
            <div class="info-box">
                <p><strong>🌐 Domínio:</strong> gestao-bot.wetod.app</p>
                <p><strong>🤖 Bot Telegram:</strong> @chec_proprio_bot</p>
                <p><strong>📊 GitHub:</strong> gestao-bot</p>
                <p><strong>🕒 Status:</strong> Deploy realizado com sucesso</p>
            </div>

            <div style="margin-top: 20px;">
                <a href="/api/health" style="color: #3b82f6; text-decoration: none; margin-right: 15px;">Health Check</a>
                <a href="/api/status" style="color: #3b82f6; text-decoration: none;">Status API</a>
            </div>
            
            <p style="margin-top: 20px; color: #6b7280; font-size: 0.9em;">
                Última atualização: ${new Date().toLocaleString('pt-BR')}
            </p>
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    system: 'CheckProprioSystem',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    bot: {
      name: 'CheckProprioSystem',
      username: 'chec_proprio_bot',
      status: 'configured'
    },
    server: 'running',
    domain: 'gestao-bot.wetod.app'
  });
});

// INICIAR SERVIDOR - LINHA ESSENCIAL QUE FALTAVA!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 Server running on port', PORT);
});

// Export para Vercel
module.exports = app;
