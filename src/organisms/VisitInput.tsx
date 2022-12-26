import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {TableCardRow, Owner, InputField, Pet, PetType, Visit} from '../types/';
import * as API from '../utils/api'
import Button from "@mui/material/Button";
import {InputCard} from "../molecules/InputCard";
import dayjs from 'dayjs';
import {debounce, Snackbar} from "@mui/material";
import {getFieldByPropName} from "../utils/utils";
import {SavedFeedBack} from "../molecules/SavedFeedback";

interface VisitInputProps {
    ownerId: number
    petId: number
}

const VisitInput: React.FC<VisitInputProps> = ({ownerId, petId}) => {

    const [pet, setPet] = useState<Pet>()
    const [fields, setFields] = useState<InputField[]>([])
    const [savedTimestamp, setSavedTimestamp] = useState<number>(-1)

    const visitInputField = ():InputField[] => ([
        { type: 'date', propName: 'date', label: '訪問日', value: dayjs(new Date()).format('YYYY-MM-DD'), required: true},
        { type: 'text', propName: 'description', label: '訪問理由', value: '', required: true},
        { type: 'image', propName: 'images', label: '訪問理由', value: '', required: true},
    ])

    const setInputFieldToVisit = (visit: Visit, fields:InputField[]) => {
        visit.date = getFieldByPropName(fields, 'date')?.value;
        visit.description = getFieldByPropName(fields, 'description')?.value;
        visit.images = [{image: getFieldByPropName(fields, 'images')?.value}];
    }

    useEffect(()=>{
        setFields(visitInputField())
    }, [setFields])

    useEffect(()=>{
        if (ownerId < 0  || petId < 0 ) {
            return
        }
        API.get(`/owners/${ownerId}/pets/${petId}`).then((data) => {
                const pet = data as Pet
                setPet(pet)
        })
    }, [ownerId, petId])

    const onSave = debounce(useCallback((fields: InputField[]) => {
        if (!pet || !pet.owner) {
            return
        }
        const tmpVisit = {
            new: true,
            pet: JSON.parse(JSON.stringify(pet))
        } as Visit
        delete tmpVisit.pet?.visits
        delete tmpVisit.pet?.owner
        setInputFieldToVisit(tmpVisit, fields)
        API.post(`/owners/${pet.owner.id}/pets/${pet.id}/visits/new`, tmpVisit).then(() => {
            setSavedTimestamp(new Date().getTime())
        })
    }, [pet]))

    return (
        <React.Fragment>
        <InputCard
            title={`新規訪問予定を立てる`}
            fields={fields}
            onSave={onSave}
            heightFixed={false}
        />
            <SavedFeedBack feedbackText={'ペット情報を保存しました'} savedTimestamp={savedTimestamp} />
        </React.Fragment>
    );
}

export default VisitInput;