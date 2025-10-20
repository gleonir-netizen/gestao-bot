// app.js - APLICAÇÃO PRINCIPAL CHECKPROPRIOSYSTEM
const express = require('express');
const { bot, sendWelcome, notifyDeploy, getBotInfo } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// ==================== ROTAS DA API ====================

// Rota principal - Saúde do sistema
app.get('/', (req, res) => {
  res.json({
    status: 'Online ✅',
    system: 'CheckProprioSystem',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      status: '/status',
      bot: '/bot/info',
      deploy: '/deploy (POST)'
    },
    integrations: {
      github: 'gestao-bot',
      domain: 'gestao-bot.wetod.app',
      hosting: 'chec.com.br',
      sharepoint: 'STC'
    }
  });
});

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Status do sistema
app.get('/status', async (req, res) => {
  try {
    const botInfo = await getBotInfo();
    
    res.json({
      system: 'CheckProprioSystem',
      status: 'operational',
      bot: botInfo,
      server: {
        port: PORT,
        environment: process.env.NODE_ENV || 'development'
      },
      lastUpdate: new Date().toLocaleString('pt-BR')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Informações do bot
app.get('/bot/info', async (req, res) => {
  try {
    const botInfo = await getBotInfo();
    res.json(botInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para simular deploy (TESTE)
app.post('/deploy', async (req, res) => {
  try {
    const { version = '1.0.0' } = req.body;
    const deployMessage = await notifyDeploy(version);
    
    res.json({
      success: true,
      message: 'Notificação de deploy gerada',
      deployMessage: deployMessage,
      nextStep: 'Configurar CHAT_ID para enviar para Telegram'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Rota para teste do bot (webhook futuro)
app.post('/webhook', (req, res) => {
  console.log('📨 Webhook recebido:', req.body);
  // Aqui vamos processar mensagens do Telegram depois
  res.status(200).json({ received: true });
});

// Rota não encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /status',
      'GET /bot/info',
      'POST /deploy',
      'POST /webhook'
    ]
  });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
  console.log('🚀 =================================');
  console.log('🤖 CheckProprioSystem - INICIADO!');
  console.log(`🌐 Servidor rodando na porta: ${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 =================================');
  
  // Verificar status do bot ao iniciar
  getBotInfo().then(info => {
    console.log('🤖 Status do Bot:', info.status);
    if (info.name) {
      console.log(`📝 Nome do Bot: ${info.name} (@${info.username})`);
    }
  });
});

// Manipular encerramento graceful
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  process.exit(0);
});

module.exports = app;
