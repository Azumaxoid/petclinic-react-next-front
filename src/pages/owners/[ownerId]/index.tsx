import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import OwnerDetail from "../../../organisms/OwnerDetail";
import PetList from "../../../organisms/PetList";
export {getServerSideProps}from "../../../utils/newrelic"

export default function OwnerDetailPage({browserTimingHeader}:{browserTimingHeader: string}) {
    const router = useRouter();

    const [ownerId, setOwnerId] = useState<number>(-1)

    useEffect(() => {
        if (router.isReady && router.query?.ownerId) {
            const ownerId = parseInt(router.query?.ownerId as string)
            if (!isNaN(ownerId) && ownerId > 0) {
                setOwnerId(ownerId)
            }
        }
    }, [router, router.isReady, router.query, router.query?.ownerId, setOwnerId])

    const handleSelectPet = useCallback((petId: number) => {
        router.push({ pathname: `/owners/${ownerId}/pets/${petId}` })
    }, [ownerId, router])

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <div dangerouslySetInnerHTML={{__html: browserTimingHeader}}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <OwnerDetail ownerId={ownerId}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <PetList ownerId={ownerId} onSelectPet={handleSelectPet} />
                </Grid>
            </Grid>
        </Container>
    )
}
