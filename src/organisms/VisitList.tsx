import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {TableCardRow, Owner, InputField, Pet, PetType, Visit} from '../types/';
import * as API from '../utils/api'
import Button from "@mui/material/Button";
import {InputCard} from "../molecules/InputCard";
import {debounce, Snackbar} from "@mui/material";
import {getFieldByPropName} from "../utils/utils";
import {SavedFeedBack} from "../molecules/SavedFeedback";
import dayjs from "dayjs";
import {TableCard} from "../molecules/TableCard";

interface VisitListProps {
    ownerId: number
    petId: number
}

const VisitList: React.FC<VisitListProps> = ({ownerId, petId}) => {

    const [pet, setPet] = useState<Pet>()
    const [rows, setRows] = useState<TableCardRow[]>([])

    const visitToTableCardRow = (visit: Visit) => ({
        id: visit.id,
        cols: [
            visit.date,
            visit.description
        ],
        item: visit,
    })

    useEffect(()=> {
        if (ownerId < 0 || petId < 0) {
            return
        }
        API.get(`/owners/${ownerId}/pets/${petId}`).then((data) => {
            const pet = data as Pet
            const newRows = pet.visits?.map(visit=>visitToTableCardRow(visit)) || []
            setPet(pet)
            setRows(newRows)
        })
    }, [ownerId, petId])

    return (
        <TableCard
            title={'訪問履歴'}
            headers={['訪問日', '訪問理由']}
            rows={rows}
            heightFixed={false}
        />
    );
}

export default VisitList;