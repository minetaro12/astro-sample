import { defineConfig } from 'astro/config';

function setDafaultLayout() {
  return function (_, file) {
    const { frontmatter } = file.data.astro;
    if (!frontmatter.layout) frontmatter.layout = "@layouts/Post.astro";
  }
}

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'directory'
  },
  markdown: {
    remarkPlugins: [setDafaultLayout]
  }
});
