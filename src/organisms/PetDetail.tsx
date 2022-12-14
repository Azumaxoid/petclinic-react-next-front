import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {TableCardRow, Owner, InputField, Pet, PetType} from '../types/';
import * as API from '../utils/api'
import Button from "@mui/material/Button";
import {InputCard} from "../molecules/InputCard";
import {debounce, Snackbar} from "@mui/material";
import {getFieldByPropName} from "../utils/utils";
import {SavedFeedBack} from "../molecules/SavedFeedback";

interface PetDetailProps {
    ownerId: number
    petId: number
}

const PetDetail: React.FC<PetDetailProps> = ({ownerId, petId}) => {

    const [pet, setPet] = useState<Pet>()
    const [petTypes, setPetTypes] = useState<PetType[]>([])
    const [fields, setFields] = useState<InputField[]>([])
    const [savedTimestamp, setSavedTimestamp] = useState<number>(-1)

    const petToInputField = (pet: Pet):InputField[] => ([
        { type: 'text', propName: 'name', label: '名前', value: pet.name, required: true},
        { type: 'date', propName: 'birthDate', label: '誕生日', value: pet.birthDate, required: true},
        { type: 'select', propName: 'type', label: '種類', value: pet.type.id, required: true, options: petTypes},
    ])

    const setInputFieldToPet = (pet: Pet, fields:InputField[], petTypes: PetType[]) => {
        pet.name = getFieldByPropName(fields, 'name')?.value ?? pet.name;
        pet.birthDate = getFieldByPropName(fields, 'birthDate')?.value ?? pet.birthDate;
        if (getFieldByPropName(fields, 'type')?.value) {
            pet.type = petTypes.find(petType => petType.id === getFieldByPropName(fields, 'type')?.value) ?? pet.type
        }
    }

    useEffect(()=>{
        if (ownerId < 0  || petId < 0 ) {
            return
        }
        new Promise((res)=>{
            if (petTypes.length > 0) {
                res(petTypes)
            } else {
                API.get(`/pettypes`).then((data) => {
                    const petTypes = data as PetType[]
                    setPetTypes(petTypes)
                    res(petTypes)
                })
            }
        }).then(()=>{
            API.get(`/owners/${ownerId}/pets/${petId}`).then((data) => {
                const pet = data as Pet
                const newFields = petToInputField(pet)
                setPet(pet)
                setFields(newFields)
            })
        })
    }, [ownerId, petId, petTypes])

    const onSave = debounce(useCallback((fields: InputField[]) => {
        if (!pet) {
            return
        }
        const tmpPet = JSON.parse(JSON.stringify(pet))
         setInputFieldToPet(tmpPet, fields, petTypes)
        API.post(`/owners/${ownerId}/pets/${petId}/edit`, tmpPet).then((data) => {
            setSavedTimestamp(new Date().getTime())
        })
    }, [pet, petTypes]))

    return (
        <React.Fragment>
        <InputCard
            title={`${pet ? (pet.owner?.lastName + 'さんの') : '' }ペット`}
            fields={fields}
            onSave={onSave}
            heightFixed={false}
        />
            <SavedFeedBack feedbackText={'ペット情報を保存しました'} savedTimestamp={savedTimestamp} />
        </React.Fragment>
    );
}

export default PetDetail;