export const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  attempt: number = 0
): Promise<any> => {
  const apiKeys = [process.env.LOSTARK_API_KEY_1, process.env.LOSTARK_API_KEY_2];

  const apiKey = apiKeys[attempt];
  if (!apiKey) {
    throw new Error('No valid API keys available');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (response.ok) {
    return response;
  }

  if (response.status === 403 && attempt < apiKeys.length - 1) {
    console.log(`API key ${attempt + 1} limit reached. Trying next key...`);
    return fetchWithRetry(url, options, attempt + 1);
  }

  throw new Error(`Failed to fetch data: ${response.statusText}`);
};
