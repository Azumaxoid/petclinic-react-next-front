import * as React from 'react';
import {TableCard} from "../molecules/TableCard";
import Button from "@mui/material/Button";
import { users } from "../data"
import {useCallback, useState} from "react";
import { setCookie } from 'nookies'
import {Pet, TableCardRow, User} from "../types";
import dayjs from "dayjs";
import {setCustomAttribute} from "../utils/newrelic-browser";

interface UsersProps {
    onSelectUser: (userId: string) => void
}
export const Users: React.FC<UsersProps> = ({ onSelectUser }) => {
    const [rows, setRows] = useState<TableCardRow[]>([])

    const onSelectButton = useCallback((userId: string) => {
      setCookie(null, 'userid', userId, {
          maxAge: 30 * 24 * 60 * 60,
          }
      )
        setCustomAttribute('userId', userId)
        onSelectUser(userId)
    }, [onSelectUser])

    const userToTableCardRow = (user: User) => ({
        id: user.userId,
        cols: [
            user.userId,
            user.name,
            user.email,
            <Button key={user.userId} onClick={()=>onSelectButton(user.userId)}>選択</Button>,
        ],
        item: user,
    })
    return (
        <React.Fragment>
            <TableCard
                headers={['社員番号', '氏名', 'メールアドレス', '']}
                heightFixed={false}
                rows={users.map(userToTableCardRow)}
                title={'従業員を選択'} />
        </React.Fragment>
    )
}