import 'dotenv/config';
import path from 'path';
import run from '../lib/run';
import bundle from '../lib/bundle';
import getWebpackConfig from '../lib/getWebpackConfig';

const isDebug = !process.argv.includes('--release');
const isVerbose = !!process.argv.includes('--verbose');
const watch = !!process.argv.includes('--watch');
const stats = !!process.argv.includes('--stats');

const sourceDir = path.resolve(__dirname, './');
const outputDir = path.resolve(__dirname, 'dist', 'client');

const webpackConfig = getWebpackConfig({
  isDebug,
  isVerbose,
  isClient: true,
  sourceDir,
  outputDir,
  stats,
  publicPath: '/public',
  entry: {
    index: '../js/zoomin.js'
  }
});

/**
 * Uses webpack to compile the zoom client
 * into a single file executable by browser
 */
async function build() {
  await run(bundle, { webpackConfig, watch });
}

export default build();
