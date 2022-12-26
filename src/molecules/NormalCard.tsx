import * as React from 'react';
import Title from '../atoms/Title';
import Paper from "@mui/material/Paper";

interface NormalCardProps {
    children: React.ReactNode
    title: string
    heightFixed?: boolean
    height?: string
}
export const NormalCard: React.FC<NormalCardProps> = ({
    children,
    title,heightFixed = true, height}) => {

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: heightFixed ? '240px' : height ? height : 'inherit',
            }}
        >
            <Title>{title}</Title>
            {children}
        </Paper>
    );
}
