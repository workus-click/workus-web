import { globalFontFace, globalStyle } from '@vanilla-extract/css'

const fontBasePath = '/fonts/pretendard-gov'

const fontConfigs = [
    { file: 'PretendardGOV-Regular', weight: 400 },
    { file: 'PretendardGOV-Medium', weight: 500 },
    { file: 'PretendardGOV-SemiBold', weight: 600 },
    { file: 'PretendardGOV-Bold', weight: 700 },
]

fontConfigs.forEach(({ file, weight }) => {
    globalFontFace('Pretendard GOV', {
        fontStyle: 'normal',
        fontWeight: weight,
        fontDisplay: 'swap',
        src: `
            url('${fontBasePath}/${file}.woff2') format('woff2'),
            url('${fontBasePath}/${file}.woff') format('woff')
        `,
    })
})

globalStyle(':root', {
    fontFamily: '"Pretendard GOV","Pretendard",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
})

globalStyle('*, *::before, *::after', {
    boxSizing: 'border-box',
})

globalStyle('body', {
    margin: 0,
    minHeight: '100vh',
    backgroundColor: '#ffffff',
})
