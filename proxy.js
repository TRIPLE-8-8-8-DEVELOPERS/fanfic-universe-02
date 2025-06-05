import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 3001;

app.use(
  '/supabase',
  createProxyMiddleware({
    target: 'https://bhgwipcwsndpyvrzcpma.supabase.co',
    changeOrigin: true,
    pathRewrite: {
      '^/supabase': '', // Remove '/supabase' from the path
    },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('Access-Control-Allow-Origin', '*');
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});