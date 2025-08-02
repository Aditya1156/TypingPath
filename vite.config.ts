import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        target: 'es2020',
        minify: 'terser',
        cssMinify: true,
        reportCompressedSize: true,
        chunkSizeWarningLimit: 800,
        rollupOptions: {
          treeshake: true,
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
              ai: ['@google/generative-ai'],
              'auth-components': [
                './components/auth/SignIn.tsx',
                './components/auth/SignUp.tsx',
                './components/auth/Profile.tsx'
              ],
              'dashboard-components': [
                './components/dashboard/Dashboard.tsx',
                './components/dashboard/PerformanceChart.tsx',
                './components/dashboard/StatsCards.tsx'
              ]
            },
            chunkFileNames: (chunkInfo) => {
              const facadeModuleId = chunkInfo.facadeModuleId ? 
                chunkInfo.facadeModuleId.split('/').pop()?.split('.')[0] || 'chunk' : 'chunk';
              return `assets/${facadeModuleId}-[hash].js`;
            }
          }
        },
        terserOptions: {
          compress: {
            drop_console: mode === 'production',
            drop_debugger: mode === 'production',
            pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : []
          }
        }
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore']
      }
    };
});
