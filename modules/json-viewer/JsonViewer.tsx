import { styled, ThemeProvider } from "@mui/material";
import React from "react";
import { simpleTestJsonWithArray } from "../test/testData";
import { generateBracketPairs, tokenizeJson } from "./jsonTokenizer";
import { LineNumbers } from "./line-numbers/LineNumbers";
import { TextArea } from "./text-area/TextArea";
import { createCustomTheme } from "./themes";

const Main = styled('div')({
    display: 'flex',
    minWidth: 450,
    maxWidth: 600,
    fontSize: 16,
});

type JsonViewerProps = {
    themeType: string;
    json?: any;
    showLineNumbers?: boolean;
}

const bracketPairs = generateBracketPairs(simpleTestJsonWithArray);

/*
    0 {
    1    "name": "John",
    2    [
    3        1, 
    4        2,
    5        3   
    6    ],
    7    a: {
    8        s: "s",
    9   }
    10 }

    [
        10,
        -1
        6,
        -1,
        -1,
        -1,
        2,
        9,
        -1,
        7,
        0
    ]
*/


const JsonViewer = ({ json, showLineNumbers, themeType }: JsonViewerProps) => {
    const parsedData = tokenizeJson(json || simpleTestJsonWithArray);
    const [selected, setSelected] = React.useState(-1);
    const [collapsed, setCollapsed] = React.useState<boolean[]>(new Array(bracketPairs.length).fill(false));

    const theme = React.useMemo(
        () => createCustomTheme(themeType)
        , [themeType]
    );


    return (
        <ThemeProvider theme={theme}>
            <Main>
                {showLineNumbers && <LineNumbers
                    selected={selected}
                    rowCount={parsedData.length}
                    bracketPairs={bracketPairs}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                }
                <TextArea
                    selected={selected}
                    setSelected={setSelected}
                    parsedData={parsedData}
                    themeType={themeType}
                />
            </Main>
        </ThemeProvider>
    );

}

export { JsonViewer };

