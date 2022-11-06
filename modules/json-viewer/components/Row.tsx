import { useTheme } from "@mui/material";

type RowProps = {
    text?: string;
    style?: any;
    children: any;
    onClick?: () => void;
    rest?: any;
    selected?: boolean,
}

const Row = ({ text, style, children, selected, ...rest }: RowProps) => {
    const theme = useTheme();

    return (
        <pre {...rest} style={{ ...style, margin: 0, backgroundColor: selected ? theme.palette.divider : 'revert' }}>
            {children || text}
        </pre>
    );
};

export { Row };