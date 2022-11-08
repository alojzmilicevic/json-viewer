import { Checkbox, createTheme, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Snackbar, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { JsonViewer } from "../modules/json-viewer/JsonViewer";
import { Themes } from "../modules/json-viewer/themes";
import { simpleTestJsonWithArray } from "../modules/test/testData";

const Wrapper = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

const Settings = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    color:'black',
});

const JsonViewerExample = () => {
    const [themeType, setThemeType] = React.useState(Themes.Darcula);
    const [showLineNumbers, setShowLineNumbers] = React.useState(true);
    const [tabSize, setTabSize] = useState(4);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [json, setJson] = useState(simpleTestJsonWithArray);
    const [mounting, setMounting] = useState(false);


    const onCopyJson = () => {
        setShowSnackbar(true);
        navigator.clipboard.writeText(JSON.stringify(json, null, tabSize));
    }

    return (
        <Wrapper>
            <JsonViewer
                json={json}
                tabSize={tabSize}
                themeType={themeType}
                showLineNumbers={showLineNumbers}
                onCopyJson={onCopyJson}
                mounting={mounting}
            />
            <Settings>
                <Typography sx={{ mt: 4 }} variant="h6">Settings</Typography>
                <FormControl variant="standard" sx={{ minWidth: 240 }}>
                    <InputLabel id="theme-select-label">Theme</InputLabel>
                    <Select
                        labelId="theme-select-label"
                        id="theme-select-labeal"
                        value={themeType}
                        label="theme"
                        onChange={(e) => setThemeType(e.target.value)}
                    >
                        {Object.keys(Themes).map((item: string, index: number) => (
                            <MenuItem key={`${item}${index}`} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel
                    sx={{ mt: 2 }}
                    label="Show line numbers"
                    control={
                        <Checkbox
                            checked={showLineNumbers}
                            onChange={() => {
                                setMounting(!mounting);
                                return setShowLineNumbers(!showLineNumbers);
                            }}
                        />
                    }
                />
                <FormControl variant="standard" sx={{ minWidth: 240 }}>
                    <InputLabel id="tab-size-select-label">Tab Size</InputLabel>
                    <Select
                        labelId="tab-size-select-label"
                        id="tab-size-select-label"
                        value={tabSize}
                        label="Tab Size"
                        onChange={(e) => setTabSize(e.target.value as number)}
                        MenuProps={{
                            sx: {
                                "&& .Mui-selected": {
                                    backgroundColor: "#66749d3b",
                                }
                            }
                        }}
                    >
                        {[2, 4, 6].map((item: number) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Settings>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                message="Json copied to clipboard!"
            />
        </Wrapper>
    )

}

export { JsonViewerExample };

