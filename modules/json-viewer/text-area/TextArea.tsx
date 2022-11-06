import { styled } from "@mui/material";
import { Row } from "../components/Row";
import { Token } from "../jsonTokenizer";
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
}

const TextArea = ({ parsedData, themeType, setSelected, selected }: TextAreaProps) => {

    return <Container>
        {parsedData.map((tokens, i) => (
            <Row
                key={i}
                onClick={() => setSelected(i)}
                selected={selected === i}
                style={{ position: 'relative' }}
            >
                {tokens.map((token: Token, index: number) => (
                    <TokenRow color={getColor(token.type, themeType)} key={index}>
                        {token.value}
                    </TokenRow>
                )
                )}
            </Row>
        ))}
    </Container>;
}

export { TextArea }