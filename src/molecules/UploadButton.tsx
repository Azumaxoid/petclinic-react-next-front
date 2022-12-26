import {createStyles, makeStyles} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";

interface UploadButtonProps {
    name: string
    onChange: (event:any) => void
}
export const UploadButton:React.FC<UploadButtonProps> = ({
    name, onChange
                                                         }) => {
    return (
        <Button
            variant="contained"
            component="label"
        >
            {name}
            <input
                type="file"
                onChange={onChange}
                hidden
            />
        </Button>
    );
};