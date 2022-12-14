import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {TableCardRow, Owner, InputField, Pet} from '../types/';
import * as API from '../utils/api'
import Button from "@mui/material/Button";
import {TableCard} from "../molecules/TableCard";
import dayjs from "dayjs";

interface PetListProps {
    ownerId: number
    onSelectPet: (ownerId: number) => void
}

const PetList: React.FC<PetListProps> = ({ownerId, onSelectPet}) => {

    const [owner, setOwner] = useState<Owner>()
    const [rows, setRows] = useState<TableCardRow[]>([])

    const editButton = (id: number) => (
        <Button onClick={()=>onEdit(id)}>編集</Button>
    )

    const petToTableCardRow = (pet: Pet) => ({
        id: pet.id,
        cols: [
            pet.name,
            dayjs(pet.birthDate).format('YYYY-MM-DD'),
            pet.type.name,
            editButton(pet.id),
        ],
        item: owner,
    })
    useEffect(()=>{
        if (ownerId < 0) {
            return
        }
        API.get(`/owners/${ownerId}`).then((data) => {
            const owner = data as Owner
            const newRows = owner.pets?.map(petToTableCardRow) || []
            setOwner(owner)
            setRows(newRows)
        })
    }, [ownerId])

    const onEdit = useCallback((id: number)=> {
        onSelectPet(id)
    }, [onSelectPet])

    return (
        <TableCard
            title={'ペット一欄'}
            headers={['名前', '誕生日', '種類', '編集']}
            rows={rows}
            heightFixed={false}
        />
    );
}

export default PetList;