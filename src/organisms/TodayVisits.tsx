import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import {TableCardRow, Visit} from '../types/';
import * as API from '../utils/api'
import {TableCard} from "../molecules/TableCard";
import Button from "@mui/material/Button";

export default function TodayVisits() {

    const [rows, setRows] = useState<TableCardRow[]>([])

    const visitButton = (id: number, visitedTimestamp: number) => (
        <Button onClick={()=>onVisit(id)}
                disabled={visitedTimestamp>0}>{visitedTimestamp>0 ? '訪問済' : '訪問'}
        </Button>
    )

    const visitToTableCardRow = (visit: Visit) => ({
        id: visit.id,
        cols: [
            `${visit.pet?.owner?.firstName} ${visit.pet?.owner?.lastName}`,
            visit.pet?.name,
            visit.description,
            visitButton(visit.id || 0, visit.visitedTimestamp || 0),
        ],
        item: visit,
    })
    useEffect(()=>{
        API.get('/visits').then((data) => {
            const visits = (Array.isArray(data) ? data : data.content) as Visit[]
            const newRows: TableCardRow[] = visits.map((visit)=>visitToTableCardRow(visit))
            setRows(newRows)
        })
    }, [])

    const onVisit = useCallback((id: number)=> {
        const visit = rows.find((row) => row.id === id)
        if (!visit) {
            return
        }
        const newVisit = JSON.parse(JSON.stringify(visit)) as Visit
        delete newVisit.pet?.owner
        delete newVisit.pet?.visits
        API.post(`/visits/${visit.id}/edit`, newVisit)
            .then(data=>{
                const newRows = rows.slice()
                const visitIndex = rows.findIndex((row) => row.id === id)
                if (visitIndex < 0) {
                    return
                }
                newRows[visitIndex] = visitToTableCardRow(data as Visit)
                setRows(newRows.sort((v1, v2)=>v1.item.visitedTimestamp-v2.item.visitedTimestamp))
            })
    }, [rows])

    return (
        <TableCard
            title={'今日の来訪者'}
            headers={['オーナー', 'ペット', 'メッセージ', '来訪済']}
            rows={rows}
            heightFixed={false}
        />
    );
}
