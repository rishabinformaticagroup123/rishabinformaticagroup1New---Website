// app/api/ai-sql/route.ts
import { NextRequest, NextResponse } from 'next/server'

const MODEL_URL = 'https://api-inference.huggingface.co/models/defog/sqlcoder-7b-2'

export async function POST(request: NextRequest) {
  try {
    const { prompt, dialect = 'SQL' } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 })
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not set' }, { status: 500 })
    }

    const response = await fetch(MODEL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Question: ${prompt}\nAnswer:`,
      }),
    })

    const text = await response.text()
    console.log('Raw response:', text) // Debug

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json(
        { error: 'AI service returned invalid response', raw: text },
        { status: 500 }
      )
    }

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Failed' }, { status: 500 })
    }

    let sql = data.generated_text || ''
    sql = sql.trim().replace(/```sql|```/g, '')
    if (!sql.endsWith(';')) sql += ';'

    return NextResponse.json({ sql })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate SQL' }, { status: 500 })
  }
}