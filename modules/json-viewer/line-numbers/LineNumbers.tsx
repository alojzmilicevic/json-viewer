import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material";
import { useState } from "react";
import { Row } from "../components/Row";
import styles from '../JsonViewer.module.css';

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
    mounting: boolean;
}

const LineNumbers = ({ rowCount, selected = -1, bracketPairs, collapsed, setCollapsed, mounting }: LineNumbersProps) => {
    const [hovered, setHovered] = useState(false);

    return <RowCounter
        className={`${mounting ? styles.mounting : styles.mounted}`}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {Array.from({ length: rowCount }, (_, i) => {
            let shouldShow = true;

            for (let j = 0; j < collapsed.length; j++) {
                if (collapsed[j]) {
                    const start = j;
                    const end = bracketPairs[j];

                    if (i > start && i <= end) {
                        shouldShow = false;
                        break;
                    }
                }
            }
            if (!shouldShow) return null;

            return (
                <Row key={i} style={{ color: (i === selected && !mounting) ? '#bababa' : 'revert' }}>
                    {i + 1}

                    {bracketPairs[i] !== -1 && <ExpandMoreIcon
                        onClick={() => {
                            collapsed[i] = !collapsed[i];
                            setCollapsed([...collapsed]);
                        }}
                        className={`${hovered ? styles.delayHover : styles.delay} ${collapsed[i] && styles.rotatedExpandIcon}`}
                        style={{ position: "absolute" }} />}
                </Row>
            );
        })}
    </RowCounter>;
}

export { LineNumbers };

