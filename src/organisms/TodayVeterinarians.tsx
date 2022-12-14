import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {TableCardRow, Vet} from '../types/';
import * as API from '../utils/api'
import LinearProgress from "@mui/material/LinearProgress";
import {TableCard} from "../molecules/TableCard";

export default function TodayVeterinarians() {

    const [rows, setRows] = useState<TableCardRow[]>([])
    useEffect(()=>{
        API.get('/vets').then((data) => {
            const vets = (Array.isArray(data) ? data : data.content) as Vet[]
            const newRows: TableCardRow[] = vets.map((vet)=>{
                return {
                    id: vet.id,
                    cols: [
                        `${vet.firstName} ${vet.lastName}`,
                        vet.specialties.map(s=>s.name).join(', '),
                    ],
                    item: vet,
                }
            })
            setRows(newRows)
        })
    }, [])
    return (
        <TableCard
            title={'本日の担当獣医'}
            headers={['獣医', '専門']}
            rows={rows}
        />
    );
}
