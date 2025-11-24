exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // 处理预检请求
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const params = event.queryStringParameters;
    
    // 构建目标API URL
    const targetUrl = `https://suoniapi.com/api.php/provide/vod/?${new URLSearchParams(params)}`;
    
    console.log('Proxying request to:', targetUrl);
    
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    const data = await response.text();

    return {
      statusCode: 200,
      headers,
      body: data
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Proxy failed', 
        message: error.message 
      })
    };
  }
};
