import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import run from '@rollup/plugin-run';

export default {
  input: 'src/app.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    process.env.ROLLUP_WATCH === 'true' && run(),
    typescript(),
    alias({
      entries: [{ find: '@', replacement: 'src' }],
    }),
  ],
};
