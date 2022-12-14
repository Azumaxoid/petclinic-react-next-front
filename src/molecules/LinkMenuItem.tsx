import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

interface LinkMenuItemProps {
    href: string
    label: string
    icon: React.ReactNode
}
export const LinkMenuItem: React.FC<LinkMenuItemProps> = ({
    href,
    label,
    icon,
                             }) => {
    return (
        <Link href={href}>
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>
        </Link>
    )
}