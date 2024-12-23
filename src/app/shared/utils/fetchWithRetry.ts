export const fetchWithRetry = async (url: string, attempt: number = 0): Promise<any> => {
  const apiKeys = [process.env.LOSTARK_API_KEY_1, process.env.LOSTARK_API_KEY_2];

  const apiKey = apiKeys[attempt];

  if (!apiKey) {
    throw new Error('No valid API keys available');
  }

  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (response.ok) {
    return response.json();
  }

  if (response.status === 403 && attempt < apiKeys.length - 1) {
    console.log(`API key ${attempt + 1} limit reached. Trying next key...`);
    return fetchWithRetry(url, attempt + 1);
  }

  throw new Error(`Failed to fetch data: ${response.statusText}`);
};
