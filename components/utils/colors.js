export const hexToRGBA = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
}

export const colors = {
    primary: '#0071f3',
    secondary: '#ACB1B6',
    active: '#0366d6',
    activeLight: '#5da2f0',
    textPrimary: '#031323',
    divider: '#D9DCDE',
    blackPearl: '#59636e',
    primaryDim: '#FBF7FE',

    pink: '#f54768',
    green: '#8bd76b',
    black: '#111',

    destructive: '#E63644',
    destructiveActive: '#a62731',
    affirmative: '#189F59',
    affirmativeActive: '#11713f',
    warning: '#D97508',
    white: '#FFFFFF',
    redBackgroundLight: '#FFE1E1',
    greenBackgroundLight: '#E8F5E5',
    yellowBackgroundLight: '#FFF6D1',
    textInactive: '#BFBFBF',
    background: '#F2F3F4',

    redTile: '#e71d36',
    yellowTile: '#ffff3f',
    greenTile: '#2b9348',
}
