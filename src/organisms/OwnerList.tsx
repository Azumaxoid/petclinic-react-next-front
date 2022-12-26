import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {TableCardRow, Owner} from '../types/';
import * as API from '../utils/api'
import Button from "@mui/material/Button";
import {TableCard} from "../molecules/TableCard";

interface OwnerListProps {
    page: number
    onSelectOwner: (ownerId: number) => void
}

const OwnerList: React.FC<OwnerListProps> = ({page, onSelectOwner}) => {

    const [maxPage, setMaxPage] = useState<number>(1)
    const [rows, setRows] = useState<TableCardRow[]>([])

    const editButton = (id: number) => (
        <Button onClick={()=>onEdit(id)}>編集</Button>
    )

    const ownerToTableCardRow = (owner: Owner) => ({
        id: owner.id,
        cols: [
            `${owner.firstName} ${owner.lastName}`,
            owner.address,
            owner.city,
            owner.telephone,
            owner.pets?.map(pet=>pet.name).join(','),
            editButton(owner.id),
        ],
        item: owner,
    })
    useEffect(()=>{
        API.get(`/owners?page=${page}`).then((data) => {
            const owners = data.content as Owner[]
            const newRows: TableCardRow[] = owners.map((owner)=>ownerToTableCardRow(owner))
            setRows(newRows)
            setMaxPage(data.totalPages)
        })
    }, [page, ownerToTableCardRow])

    const onEdit = useCallback((id: number)=> {
        onSelectOwner(id)
    }, [rows, onSelectOwner])

    return (
        <TableCard
            title={'今日の来訪者'}
            headers={['オーナー名', '住所', '都市', '電話番号', 'ペット', '編集']}
            rows={rows}
            maxPage={maxPage}
            heightFixed={false}
        />
    );
}

export default OwnerList;