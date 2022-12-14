import * as React from 'react';
import Title from '../atoms/Title';
import Paper from "@mui/material/Paper";
import {Switch, TextField} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {InputField} from "../types";
import {useCallback, useEffect, useState} from "react";
import debounce from "@mui/utils/debounce";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';

interface InputCardProps {
    title: string
    fields: InputField[]
    onSave: (fields: InputField[]) => void
    heightFixed?: boolean
}

export const InputCard: React.FC<InputCardProps> = ({
    title,fields,　onSave,  heightFixed = true}) => {

    const [privateFields, setPrivateFields] = useState<InputField[]>([])

    useEffect(()=> {
        const newFields = JSON.parse(JSON.stringify(fields))
        setPrivateFields(newFields)
    }, [fields])

    const handleChange = debounce(useCallback((propName: string, value: any)=> {
        const newFields = JSON.parse(JSON.stringify(privateFields)) as InputField[]
        const field = newFields.find(field => field.propName === propName)
        if (!field) {
          return
        }
        field.value = value
        setPrivateFields(newFields)
    }, [privateFields]))

    const renderField = (field: InputField) => {
        return field.type === 'text' ?
            <TextField
                required
                key={field.propName}
                label={field.label}
                defaultValue={field.value}
                margin="normal"
                onChange={(event) => handleChange(field.propName, event.target.value)}
            />
            : field.type === 'number' ?
                <TextField
                    required
                    type={'number'}
                    key={field.propName}
                    label={field.label}
                    defaultValue={field.value}
                    margin="normal"
                    onBlur={(event) => handleChange(field.propName, event.target.value)}
                />
                : field.type === 'date' ?
                    <LocalizationProvider key={field.propName} dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        key={field.propName}
                        label="Date desktop"
                        inputFormat="YYYY-MM-DD"
                        value={dayjs(field.value)}
                        onChange={(value) => value && handleChange(field.propName, value.format("YYYY-MM-DD"))}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                    : field.type === 'select' ?
                        <TextField
                            required
                            select
                            key={field.propName}
                            label={field.label}
                            defaultValue={field.value}
                            margin="normal"
                            onChange={(event) => handleChange(field.propName, event.target.value)}
                        >
                            {field.options?.map(option => <MenuItem key={`input-option-${option.id}`} value={option.id}>{option.name}</MenuItem>)}
                            </TextField>
                        : <></>
    }

    const handleSave = useCallback(() => {
        onSave(privateFields)
    }, [privateFields])

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
            {fields.map(field => renderField(field))}
            <Button variant="contained" onClick={handleSave}>保存</Button>
        </Paper>
    );
}
