// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful civic AI assistant.' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      return NextResponse.json({ reply: data.choices[0].message.content });
    } else {
      return NextResponse.json({ reply: 'Something went wrong with the AI response.' });
    }
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ reply: 'Something went wrong. Try again later.' });
  }
}
