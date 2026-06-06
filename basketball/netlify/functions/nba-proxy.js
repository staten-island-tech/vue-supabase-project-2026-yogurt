export async function handler(event) {
  const { endpoint } = JSON.parse(event.body)

  const response = await fetch(`https://api.nba2kapi.com/api/${endpoint}`, {
    headers: { 'X-API-Key': process.env.VITE_NBA_API_KEY }
  })

  const data = await response.json()

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  }
}