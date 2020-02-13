import { createMuiTheme } from '@material-ui/core/styles';

export const themeOptions = {
    palette: {
        primary: {
            light: '#78308C',
            main: '#78308C',
            dark: '#000000',
            contrastText: '#FFF',
        },
        secondary: {
            light: '#F2B705',
            main: '#F2B705',
            dark: '#C99804',
            contrastText: '#FFF',
        },
        lines: {
            divider: '#e4e4e4',
        },
        error: {
            main: '#F24405',
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
