import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const serverUrl = process.env.SERVER_URL || 'http://localhost:8000'
    const apiUrl = `${serverUrl}/auth/signin`
    
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body) })

    const result = await response.json()
    
    try {
      const data = result
      
      if (!response.ok) {
        return NextResponse.json({ error: data.detail || data.error || 'Authentication failed', details: data }, { status: response.status || 401 })
      }
      
      return NextResponse.json(data)

    } catch (error) {
      return NextResponse.json({ error: 'Unexpected response from server', details: error || 'Empty response', status: response.status }, { status: 500 })
    }
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}