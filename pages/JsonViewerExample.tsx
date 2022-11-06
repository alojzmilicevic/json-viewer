import React from "react";
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, styled, Typography } from "@mui/material";
import { JsonViewer } from "../modules/json-viewer/JsonViewer";
import { Themes } from "../modules/json-viewer/themes";

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
    color: 'black'
});

const Settings = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    color: 'black',
});

const JsonViewerExample = () => {
    const [themeType, setThemeType] = React.useState(Themes.Darcula);
    const [showLineNumbers, setShowLineNumbers] = React.useState(true);

    return (
        <Wrapper>
            <JsonViewer themeType={themeType} showLineNumbers={showLineNumbers} />
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
                    color="secondary.main"
                    label="Show line numbers"
                    control={
                        <Checkbox
                            checked={showLineNumbers}
                            onChange={() => setShowLineNumbers(!showLineNumbers)}
                        />
                    }
                />
            </Settings>

        </Wrapper>
    )

}

export { JsonViewerExample };