import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import OwnerList from "../../organisms/OwnerList";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";

export default function Owners() {

    const router = useRouter();
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        if (router.query?.page) {
            const page = parseInt(router.query?.page as string)
            if (!isNaN(page)) {
                setPage(page)
            }
        }
    }, [router.query, router.query?.page, setPage])

    const handleSelectOwner = useCallback((ownerId: number) => {
        router.push({ pathname: `/owners/${ownerId}` })
    }, [])

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <OwnerList page={page} onSelectOwner={handleSelectOwner}/>
                </Grid>
            </Grid>
        </Container>
    )
}
