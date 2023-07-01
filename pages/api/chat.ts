import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: JSON.parse(req.body),
    });

    res.json(response.data);
  } catch (error) {
    console.log('error', error);

    const errorMessage = 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};

export default chat;
