import {Alert, Snackbar} from "@mui/material";
import * as React from "react";
import {useEffect, useState, useCallback} from "react";

interface SavedFeedbackProps {
    feedbackText: string
    savedTimestamp: number
}
export const SavedFeedBack:React.FC<SavedFeedbackProps> = ({
    feedbackText, savedTimestamp,
                                                           }) => {

    const [open, setOpen] = useState<boolean>(false)

    useEffect(()=> {
        savedTimestamp > 0 && setOpen(true)
    }, [savedTimestamp])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {feedbackText}
            </Alert>
        </Snackbar>
    )
}