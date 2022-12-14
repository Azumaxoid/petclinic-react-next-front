import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {TableCardRow, Owner, InputField} from '../types/';
import * as API from '../utils/api'
import Button from "@mui/material/Button";
import {InputCard} from "../molecules/InputCard";
import {debounce, Snackbar} from "@mui/material";
import {getFieldByPropName} from "../utils/utils";
import {SavedFeedBack} from "../molecules/SavedFeedback";

interface OwnerDetailProps {
    ownerId: number
}

const OwnerDetail: React.FC<OwnerDetailProps> = ({ownerId}) => {

    const [owner, setOwner] = useState<Owner>()
    const [fields, setFields] = useState<InputField[]>([])
    const [savedTimestamp, setSavedTimestamp] = useState<number>(-1)

    const ownerToInputField = (owner: Owner):InputField[] => ([
        { type: 'text', propName: 'lastName', label: '姓', value: owner.lastName, required: true},
        { type: 'text', propName: 'firstName', label: '名', value: owner.firstName, required: true},
        { type: 'text', propName: 'city', label: '都道府県', value: owner.city, required: true},
        { type: 'text', propName: 'address', label: '住所', value: owner.address, required: true},
        { type: 'text', propName: 'telephone', label: '住所', value: owner.telephone, required: true},
    ])

    const setInputFieldToOwner = (owner: Owner, fields:InputField[]) => {
        owner.lastName = getFieldByPropName(fields, 'lastName')?.value ?? owner.lastName;
        owner.firstName = getFieldByPropName(fields, 'firstName')?.value ?? owner.firstName;
        owner.city = getFieldByPropName(fields, 'city')?.value ?? owner.city;
        owner.address = getFieldByPropName(fields, 'address')?.value ?? owner.address;
        owner.telephone = getFieldByPropName(fields, 'telephone')?.value ?? owner.telephone;
    }

    useEffect(()=>{
        if (ownerId < 0 ) {
            return
        }
        API.get(`/owners/${ownerId}`).then((data) => {
            const owner = data as Owner
            const newFields = ownerToInputField(owner)
            setOwner(owner)
            setFields(newFields)
        })
    }, [ownerId])

    const onSave = debounce(useCallback((fields: InputField[]) => {
        if (!owner) {
            return
        }
        const tmpOwner = JSON.parse(JSON.stringify(owner))
         setInputFieldToOwner(tmpOwner, fields)
        API.post(`/owners/${ownerId}/edit`, tmpOwner).then((data) => {
            setSavedTimestamp(new Date().getTime())
        })
    }, [owner]))

    return (
        <React.Fragment>
        <InputCard
            title={'今日の来訪者'}
            fields={fields}
            onSave={onSave}
            heightFixed={false}
        />
            <SavedFeedBack feedbackText={'オーナー情報を保存しました'} savedTimestamp={savedTimestamp} />
        </React.Fragment>
    );
}

export default OwnerDetail;