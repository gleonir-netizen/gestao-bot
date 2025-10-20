// bot.js - SISTEMA CHECKPROPRIO BOT
const TelegramBot = require('node-telegram-bot-api');

// TOKEN DO SEU BOT - JÁ CONFIGURADO
const token = '8286230955:AAH64YT_hc-71szNGllEK88voPDFoC1q6Yw';

// Criar instância do bot
const bot = new TelegramBot(token, { polling: false });

console.log('🤖 CheckProprioSystem Bot - Inicializado');

// Função para enviar mensagem de boas-vindas
async function sendWelcome(chatId) {
  try {
    const message = `✅ *CheckProprioSystem - CONFIGURADO!* \n\n` +
      `🚀 *Sistemas Integrados:*\n` +
      `• GitHub: gestao-bot ✅\n` +
      `• Domínio: gestao-bot.wetod.app ✅\n` +
      `• Hostinger: chec.com.br ✅\n` +
      `• SharePoint: STC ✅\n\n` +
      `📋 *Comandos Disponíveis:*\n` +
      `/start - Iniciar sistema\n` +
      `/status - Status completo\n` +
      `/deploy - Notificar deploy\n\n` +
      `🌐 *Links Importantes:*\n` +
      `• Site: https://gestao-bot.wetod.app\n` +
      `• Domínio: https://chec.com.br\n\n` +
      `⚡ *Desenvolvimento ativo*`;

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    console.log(`✅ Mensagem de boas-vindas enviada para chat: ${chatId}`);
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error.message);
  }
}

// Função para notificar deploy
async function notifyDeploy(version = '1.0.0') {
  try {
    const message = `🚀 *DEPLOY REALIZADO!* \n\n` +
      `*Sistema:* CheckProprioSystem\n` +
      `*Versão:* ${version}\n` +
      `*Domínio:* https://gestao-bot.wetod.app\n` +
      `*Status:* ✅ Sucesso\n` +
      `*Data:* ${new Date().toLocaleString('pt-BR')}\n\n` +
      `📊 *Todos os sistemas operacionais*`;

    // Aqui você precisa configurar o CHAT_ID depois
    // await bot.sendMessage(CHAT_ID, message, { parse_mode: 'Markdown' });
    
    console.log('📢 Notificação de deploy preparada');
    return message;
  } catch (error) {
    console.error('❌ Erro na notificação de deploy:', error);
  }
}

// Função para verificar status do bot
async function getBotInfo() {
  try {
    const botInfo = await bot.getMe();
    return {
      name: botInfo.first_name,
      username: botInfo.username,
      status: 'Online ✅'
    };
  } catch (error) {
    return {
      status: 'Offline ❌',
      error: error.message
    };
  }
}

// Exportar funções para usar em outros arquivos
module.exports = {
  bot,
  sendWelcome,
  notifyDeploy,
  getBotInfo
};
