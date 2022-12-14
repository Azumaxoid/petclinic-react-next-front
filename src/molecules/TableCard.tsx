import * as React from 'react';
import { useRouter } from 'next/router'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../atoms/Title';
import {TableCardRow} from "../types";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import {useCallback} from "react";


interface TableCardProps {
    title: string
    headers: string[]
    rows: TableCardRow[]
    heightFixed?: boolean
    maxPage?: number
}
export const TableCard: React.FC<TableCardProps> = ({
    title,
    headers,
    rows, heightFixed = true, maxPage}) => {

    const router = useRouter()

    const handleChangePage = useCallback((page: number) => {
        //手抜き実装
        router.push({query: {page}})
    }, [router])

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: heightFixed ? '240px' : 'inherit',
            }}
        >
            <Title>{title}</Title>
            {rows.length > 0 ? (<Table size="small">
                <TableHead>
                    <TableRow>
                        {headers.map((header, idx)=><TableCell key={`tc-${idx}`}>{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody sx={{
                    overflow: 'auto'
                }}>
                    {rows.map((row, idx) => (
                        <TableRow key={row.id}>
                            {row.cols.map((col, idx)=><TableCell key={`trc-${idx}`}>{col}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>) : (<LinearProgress />)}
            {maxPage && <Pagination count={maxPage} color="primary" onChange={(event, page) => handleChangePage(page)} />}
        </Paper>

    );
}
