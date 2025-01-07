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

export const fetchPostWithPagination = async (
  url: string,
  body: { PageNo: number; [key: string]: any },
  options: Omit<RequestInit, 'body'>,
  attempt: number = 0
): Promise<{ items: any[]; ok: boolean; statusText: string }> => {
  const apiKeys = [process.env.LOSTARK_API_KEY_1, process.env.LOSTARK_API_KEY_2];
  const apiKey = apiKeys[attempt];

  if (!apiKey) {
    throw new Error('No valid API keys available');
  }

  let allItems: any[] = [];
  let currentPage = body.PageNo;

  while (true) {
    const response = await fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ ...body, PageNo: currentPage }),
    });

    if (response.ok) {
      const data = await response.json();
      allItems = allItems.concat(data.Items);

      // 다음 페이지가 없으면 종료
      if (data.PageNo * data.PageSize >= data.TotalCount) {
        break;
      }

      currentPage++;
    } else if (response.status === 403 && attempt < apiKeys.length - 1) {
      console.log(`API key ${attempt + 1} limit reached. Trying next key...`);
      return fetchPostWithPagination(url, body, options, attempt + 1);
    } else {
      return { items: allItems, ok: false, statusText: response.statusText };
    }
  }

  return { items: allItems, ok: true, statusText: '' };
};
