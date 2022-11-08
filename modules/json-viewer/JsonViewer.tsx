import { Button, styled, ThemeProvider } from "@mui/material";
import React from "react";
import { generateBracketPairs, tokenizeJson } from "./jsonTokenizer";
import { LineNumbers } from "./line-numbers/LineNumbers";
import { TextArea } from "./text-area/TextArea";
import { createCustomTheme } from "./themes";

const Main = styled('div')({
    display: 'flex',
    minWidth: 450,
    maxWidth: 600,
    minHeight: 300,
    fontSize: 16,
});

type JsonViewerProps = {
    themeType: string;
    json?: any;
    showLineNumbers?: boolean;
    tabSize: number;
    onCopyJson: () => void;
    mounting: boolean;
}


const JsonViewer = ({ json, showLineNumbers, themeType, tabSize, onCopyJson, mounting }: JsonViewerProps) => {
    const parsedData = tokenizeJson(json, tabSize);
    const bracketPairs = generateBracketPairs(json);

    const [selected, setSelected] = React.useState(-1);
    const [collapsed, setCollapsed] = React.useState<boolean[]>(new Array(bracketPairs.length).fill(false));

    const theme = React.useMemo(
        () => createCustomTheme(themeType)
        , [themeType]
    );

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div style={{ width: '100%', alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                    <Button size="small" variant="outlined" onClick={onCopyJson}>Copy Json</Button>
                </div>

                <Main>
                    {(showLineNumbers || mounting) && <LineNumbers
                        mounting={mounting}
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
                        collapsed={collapsed}
                        bracketPairs={bracketPairs}
                    />
                </Main>
            </div>
        </ThemeProvider>
    );

}

export { JsonViewer };

