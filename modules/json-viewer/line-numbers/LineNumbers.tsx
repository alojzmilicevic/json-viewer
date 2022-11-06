import { styled, useTheme } from "@mui/material";
import React from "react";
import { Row } from "../components/Row";
import styles from '../JsonViewer.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RowCounter = styled("div", {
    shouldForwardProp: (prop) => prop !== 'backgroundColor'
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.main,
    padding: '8px 32px',
    color: theme.palette.grey[700],
    borderRight: `1px solid ${theme.palette.divider}`,
    userSelect: 'none',
    alignItems: 'flex-end',
}));

type LineNumbersProps = {
    rowCount: number;
    selected: number;
    bracketPairs: number[];
    collapsed: boolean[];
    setCollapsed: (collapsed: boolean[]) => void,
}

const LineNumbers = ({ rowCount, selected = -1, bracketPairs, collapsed, setCollapsed }: LineNumbersProps) => {
    const [hovered, setHovered] = React.useState(false);
    const theme = useTheme();
    return <RowCounter onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {Array.from({ length: rowCount }, (_, i) => (
            <Row key={i} style={{ color: i === selected ? '#bababa' : 'revert' }}>
                {i + 1}

                {bracketPairs[i] !== -1 && <ExpandMoreIcon
                    onClick={() => {
                        collapsed[i] = !collapsed[i];
                        setCollapsed([...collapsed]);
                    }}
                    className={`${hovered ? styles.delayHover : styles.delay} ${collapsed[i] && styles.rotatedExpandIcon}`}
                    style={{ position: "absolute" }} />}
            </Row>
        ))}
    </RowCounter>;
}

export { LineNumbers };

