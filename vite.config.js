
import path from 'path';
export const resolve = (dir) => path.resolve(__dirname, dir);
export const alias = {
  '@': resolve('src'),
  '@components': resolve('src/components'),
  '@assets': resolve('src/assets'),
  '@styles': resolve('src/styles'),
};




export default {
  root: './src',
  base: '/goit-js-hw-11/',
  build: {
    outDir: '../dist',
  },
  define: {
    global: 'window',
  },
};
