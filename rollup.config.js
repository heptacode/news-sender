import run from '@rollup/plugin-run';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/app.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    run(),
    typescript(),
    alias({
      entries: [{ find: '@', replacement: 'src' }],
    }),
  ],
};
