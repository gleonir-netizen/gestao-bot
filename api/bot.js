// api/bot.js
export default function handler(request, response) {
  return response.status(200).json({ 
    success: true,
    message: "🚀 BOT TELEGRAM FUNCIONANDO!",
    timestamp: new Date().toISOString()
  });
}
