module.exports = {
  title: 'miku-ui',
  description: 'miku-ui',
  themeConfig: {
    lastUpdated: '最后更新时间',
    doscDir: 'docs',
    editLinkText: '点此编辑网站',
    repo: 'https://github.com/miku39-zj/miku-ui',
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright 🌏'
    },
    nav: [
      {text: '指南', link: '/guide/installation', activeMatch: '/guide/'},
      {text: '组件', link: '/component/icon', activeMatch: '/component/'},
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            {text: '安装', link: '/guide/installation'},
            {text: '快速开始', link: '/guide/quikeStart'}
          ]
        }
      ],
      '/component/': [
        {
          text: '组件',
          items: [
            {text: 'Icon', link: '/component/icon'}
          ]
        }
      ]
    }
  }
}