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
                base: '#191724',
                surface: '#1f1d2e',
                overlay: '#26233a',
                muted: '#6e6a86',
                subtle: '#908caa',
                text: '#e0def4',
                love: '#eb6f92',
                gold: '#f6c177',
                rose: '#ebbcba',
                pine: '#31748f',
                foam: '#9ccfd8',
                iris: '#c4a7e7',
                highlightlow: '#21202e',
                highlighthigh: '#403d52',
                highlight: '#524f67',
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
