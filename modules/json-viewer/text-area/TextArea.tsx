import { styled } from "@mui/material";
import { Row } from "../components/Row";
import { Token, TokenTypes } from "../jsonTokenizer";
import { getColor } from "../themes";

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '8px 0',
    backgroundColor: theme.palette.primary.main,
    cursor: 'text',
    overflow: 'auto',
}));

const TokenRow = styled('p', {
    shouldForwardProp: (prop) => prop !== 'color',
})(({ color }) => ({
    margin: 0,
    display: 'inline',
    color: color,
}));

type TextAreaProps = {
    parsedData: any[];
    themeType: string;
    selected: number;
    setSelected: (index: number) => void;
    bracketPairs: number[];
    collapsed: boolean[];
}

const getOpposite = (value: string) => {
    if (value === '{') return '},';
    if (value === '}') return '{';
    if (value === '[') return '],';
    if (value === ']') return '[';
    return '';
}


/*
    Check if the current row is inside a collapsed object/array
 */
function getRowInfo(currentRow: number, collapsed: boolean[], bracketPairs: number[]) {
    let hideCurrentRow = false;
    let showSummaryRow = false;

    // We don't need to check more than the current row
    for (let i = 0; i <= currentRow; i++) { // <= because we want to check the current row as well
        const collapsedRow = collapsed[i];

        if (collapsedRow) { // if collapsed check if this row is in the collapsed range
            const end = bracketPairs[i];

            if (currentRow === i) { // if this row is the start of the collapsed range
                showSummaryRow = true;
                break;
            }
            if (currentRow > i && currentRow <= end) { // if this row is in the collapsed range
                hideCurrentRow = true;
                break;
            }
        }
    }
    return { hideCurrentRow, showSummaryRow };
}

const TextArea = ({ parsedData, themeType, setSelected, selected, collapsed, bracketPairs }: TextAreaProps) => <Container>
    {parsedData.map((tokens, currentRow) => {
        const { hideCurrentRow, showSummaryRow } = getRowInfo(currentRow, collapsed, bracketPairs);

        if (hideCurrentRow)
            return null;

        return (
            <Row
                key={currentRow}
                onClick={() => setSelected(currentRow)}
                selected={selected === currentRow}
                style={{ position: 'relative' }}
            >
                {tokens.map((token: Token, index: number) => (
                    <TokenRow color={getColor(token.type, themeType)} key={index}>
                        {showSummaryRow && token.type !== TokenTypes.whiteSpace && token.type !== TokenTypes.variable && token.type !== TokenTypes.keyValueSeparator ?
                            token.value + "..." + getOpposite(token.value) : token.value + ""}
                    </TokenRow>
                )
                )}
            </Row>
        );
    })}
</Container>

export { TextArea }