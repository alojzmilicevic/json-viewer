import { createTheme } from "@mui/material";
import { TokenType, TokenTypes } from "./jsonTokenizer";

const Darcula = {
    [TokenTypes.string]: '#6a8759',
    [TokenTypes.number]: '#5f9ec2',
    [TokenTypes.boolean]: '#cc8235',
    [TokenTypes.variable]: '#9e7bb0',
    [TokenTypes.keyValueSeparator]: '#fff',
    [TokenTypes.whiteSpace]: '#fff',
    [TokenTypes.lineEndingComma]: '#fff',
    [TokenTypes.objectOpen]: '#fff',
    [TokenTypes.objectClose]: '#fff',
    [TokenTypes.arrayOpen]: '#fff',
    [TokenTypes.arrayClose]: '#fff',
};

const AtomOneDark = {
    [TokenTypes.string]: '#7bc36e',
    [TokenTypes.number]: '#d17c44',
    [TokenTypes.boolean]: '#d19a66',
    [TokenTypes.variable]: '#abb2b2',
    [TokenTypes.keyValueSeparator]: '#56b6b9',
    [TokenTypes.whiteSpace]: '#fff',
    [TokenTypes.lineEndingComma]: '#abb2b2',
    [TokenTypes.objectOpen]: '#ffc922',
    [TokenTypes.objectClose]: '#ffc922',
    [TokenTypes.arrayOpen]: '#a866d6',
    [TokenTypes.arrayClose]: '#a866d6',
};

const AtomOneLight = {
    [TokenTypes.string]: '#50a14f',
    [TokenTypes.number]: '#b26801',
    [TokenTypes.boolean]: '#b26801',
    [TokenTypes.variable]: '#383a42',
    [TokenTypes.keyValueSeparator]: '#8184bc',
    [TokenTypes.whiteSpace]: '#fff',
    [TokenTypes.lineEndingComma]: '#383a42',
    [TokenTypes.objectOpen]: '#53aefa',
    [TokenTypes.objectClose]: '#53aefa',
    [TokenTypes.arrayOpen]: '#319331',
    [TokenTypes.arrayClose]: '#319331',
};

const Plain = {
    [TokenTypes.string]: '#000',
    [TokenTypes.number]: '#000',
    [TokenTypes.boolean]: '#000',
    [TokenTypes.variable]: '#000',
    [TokenTypes.keyValueSeparator]: '#000',
    [TokenTypes.whiteSpace]: '#000',
    [TokenTypes.lineEndingComma]: '#000',
    [TokenTypes.objectOpen]: '#000',
    [TokenTypes.objectClose]: '#000',
    [TokenTypes.arrayOpen]: '#000',
    [TokenTypes.arrayClose]: '#000',
};

export const Themes = {
    Darcula: "Darcula",
    AtomOneDark: "AtomOneDark",
    AtomOneLight: "AtomOneLight",
    Plain: "Plain",
};

const ThemeOptions = {
    [Themes.Darcula]: {
        backgroundColor: '#2b2b2b',
        colorMap: Darcula,
        sideColor: '#1e1e1e',
    },
    [Themes.AtomOneLight]: {
        backgroundColor: '#fff',
        colorMap: AtomOneLight,
        sideColor: '#fff',
    },
    [Themes.AtomOneDark]: {
        backgroundColor: '#282c34',
        colorMap: AtomOneDark,
        sideColor: '#1c1e24',
    },
    [Themes.Plain]: {
        backgroundColor: '#fff',
        colorMap: Plain,
        sideColor: '#fff',
    }
}

export function getColor(token: TokenType, theme = Themes.Darcula) {
    const color = ThemeOptions[theme].colorMap[token];
    if (!color) {
        return '#fff';
    }

    return color;
}

export function getBackgroundColor(theme = Themes.Darcula) {
    if (ThemeOptions[theme]) {
        return ThemeOptions[theme].backgroundColor;
    }
    return '#fff';
}

export function getLineNumbersBackground(theme = Themes.Darcula) {
    if (ThemeOptions[theme]) {
        return ThemeOptions[theme].sideColor;
    }
    return '#fff';
}

export const createCustomTheme = (themeType: string) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: getBackgroundColor(themeType),
            },
            secondary: {
                main: getLineNumbersBackground(themeType),
            }
        },
    });
    return theme;
}
