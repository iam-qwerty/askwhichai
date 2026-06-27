import OpenAI from 'openai'

let client: OpenAI | undefined

function getClient() {
  if (!client) {
    client = new OpenAI({ 
      baseURL: 'https://api.deepinfra.com/v1/openai',
      apiKey: process.env.DEEP_INFRA_API_KEY || 'dummy', })
  }
  return client
}

export async function getEmbedding(text: string): Promise<number[]> {
  const c = getClient()
  const { data } = await c.embeddings.create({
    model: 'Qwen/Qwen3-Embedding-8B',
    input: text,
    encoding_format: 'float',
  })
  return data[0].embedding
}
