import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OrchesT Documentation',
  // tagline: 'OrchesT Documentation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://orchest-doc.github.io', // Your website URL
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dt', // Usually your GitHub org/user name.
  projectName: 'orchest-doc', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
    // [
    //   "docusaurus-preset-openapi",
    //   /** @type {import('docusaurus-preset-openapi').Options} */
    //   {
    //     api: {
    //       path: "<PATH_TO_YOUR_OPENAPI_DOCUMENT>", // e.g., 'swagger.yaml' or 'openapi.json'
    //       routeBasePath: "/api", // The base path where your API docs will be accessible
    //     },
    //     docs: {
    //       sidebarPath: require.resolve("./sidebars.js"),
    //       routeBasePath: "/",
    //     },
    //     theme: {
    //       customCss: require.resolve("./src/css/custom.css"),
    //     },
    //   },
    // ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'OrchesT',
      logo: {
        alt: 'OrchesT Logo',
        src: 'https://www.telekom.de/resources/images/974660/telekom-logo.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://gitlab.devops.telekom.de/oneapp/teams/tyrell/platforms/orchest/orchest-doc',
          label: 'Gitlab',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/category/getting-started',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitLab',
              href: 'https://gitlab.devops.telekom.de/oneapp/teams/tyrell/platforms/orchest',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OrchesT Docs, Deutsche Telekom GmbH`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'yaml'],

    },
  } satisfies Preset.ThemeConfig,
};

export default config;
