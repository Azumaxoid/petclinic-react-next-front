import * as React from 'react';
import {useEffect, useState, useRef} from "react";
import {Visit} from '../types/';
import * as API from '../utils/api'
import {NormalCard} from "../molecules/NormalCard";
import Typography from "@mui/material/Typography";

export default function TodayVisitStats() {

    const refFirstRef = useRef(true);
    const [visits, setVisits] = useState<Visit[]>([])
    const [timer, setTimer] = useState<any>()
    useEffect(()=>{
        if (process.env.NODE_ENV === "development") {
            if (refFirstRef.current) {
                refFirstRef.current = false;
                return;
            }
        }
        if (timer !== undefined) {
            return
        }
        const newTimer = setInterval(()=> {
            API.get('/visits').then((data) => {
                const newVisits = ((Array.isArray(data) ? data : data.content) as Visit[]).filter(row => row.pet && row.pet.owner)
                setVisits(newVisits)
            })
        }, 1000)
        setTimer(newTimer)
    }, [timer])

    return (
        <NormalCard title={'今日の来訪者'}>
            <Typography component="p" variant="h4">
                訪問率 {visits.filter(visit=>!!visit.visitedTimestamp && visit.visitedTimestamp>0).length / visits.length * 100} %
            </Typography>
            <br />
            <Typography component="p" variant="h5">
                未訪問 {visits.filter(visit=>!visit.visitedTimestamp || visit.visitedTimestamp<0).length} / 訪問済 {visits.filter(visit=>!!visit.visitedTimestamp && visit.visitedTimestamp>0).length}
            </Typography>
        </NormalCard>
    );
}
