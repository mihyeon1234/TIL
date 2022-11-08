require('babel-register')({
  presets: ['es2015', 'react'],
});

const Sitemap = require('react-router-sitemap').default;
const router = require('./sitemap-router').default;

function generateSitemap() {
  return new Sitemap(router)
    .build('https://sellha.kr')
    .save('./public/sitemap.xml');
}

generateSitemap();
