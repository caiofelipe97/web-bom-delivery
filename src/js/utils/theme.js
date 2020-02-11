import { createMuiTheme } from '@material-ui/core/styles';

export const themeOptions = {
    palette: {
        primary: {
            light: '#800080',
            main: '#800080',
            dark: '#000000',
            contrastText: '#FFF',
        },
        secondary: {
            light: '#800080',
            main: '#800080',
            dark: '#000000',
            contrastText: '#FFFF00',
        },
        lines: {
            divider: '#e4e4e4',
        },
        error: {
            main: '#b3001b',
        },
    },
    typography: {
        fontFamily: 'Trebuchet MS',
        fontSize: 14,   
        fontStyle: 'normal',
        color: '#ffffff'
    }
};

const theme = createMuiTheme(themeOptions);

export default theme;
