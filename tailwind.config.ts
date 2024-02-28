import type { Config } from 'tailwindcss'
import { colors } from 'tailwindcss/defaultTheme'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                body: ["body", 'sans-serif'],
                logo: ["logo", 'sans-serif'],
                other: ["other", 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                ...colors,
                base: '#faf4ed',
                surface: '#fffaf3',
                overlay: 'f2e9e1',
                muted: '#9893a5',
                subtle: '#797593',
                text: '#575279',
                love: '#b4637a',
                gold: '#ea9d34',
                rose: '#d7827e',
                pine: '#286983',
                foam: '#56949f',
                iris: '#907aa9',
                highlightlow: '#f4ede8',
                highlighthigh: '#cecacd',
                highlight: '#dfdad9',
            },
            screens: {
                'mobile': '375px',
                'tablet': '768px',
                'laptop': '1024px',
                'desktop': '1440px',
            }
        },
    },
    plugins: [],
}
export default config
