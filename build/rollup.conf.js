import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';


export default {
  input: 'src/index.js',
  plugins: [commonjs(), vue(), babel()],
  output: [
    {
      format: 'umd',
      name: 'VRating',
      file: 'dist/v-rating.js',
    },
    {
      format: 'es',
      file: 'dist/v-rating.esm.js',
    },
  ],
};
