import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://mihirvk.github.io', output: 'static', trailingSlash: 'always',
  server: { host: '127.0.0.1', port: 4321 },
  redirects: { '/about/': '/#background', '/research/': '/publications/', '/projects/': '/course_list/#projects' },
});
