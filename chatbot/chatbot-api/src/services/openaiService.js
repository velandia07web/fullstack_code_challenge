const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const getIAResponse = async (mensaje) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: mensaje,
        },
      ],
    });

    return response.choices[0]?.message?.content || 'Lo siento, no entendí eso.';
  } catch (error) {
    if (error.status === 429) {
    console.error('❌ Límite de uso de OpenAI alcanzado.');
    return 'Hemos alcanzado el límite de uso de IA por ahora. Por favor, intenta más tarde.';
  }
  }
};

module.exports = getIAResponse;
