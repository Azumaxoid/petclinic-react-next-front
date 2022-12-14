import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import PetDetail from '../../../../../organisms/PetDetail';
import VisitInput from "../../../../../organisms/VisitInput";
import VisitList from "../../../../../organisms/VisitList";

export default function PetDetailPage() {
    const router = useRouter();

    const [ownerId, setOwnerId] = useState<number>(-1)
    const [petId, setPetId] = useState<number>(-1)

    useEffect(() => {
        if (router.isReady && router.query?.ownerId && router.query?.petId) {
            const ownerId = parseInt(router.query?.ownerId as string)
            const petId = parseInt(router.query?.petId as string)
            if (!isNaN(ownerId) && ownerId > 0 && !isNaN(petId) && petId > 0) {
                setOwnerId(ownerId)
                setPetId(petId)
            }
        }
    }, [router.isReady, router.query, router.query?.ownerId, router.query?.petId])

    const handleSelectPet = useCallback((ownerId: number, petId: number) => {
        router.push({ pathname: `/owners/${ownerId}/pets/${petId}` })
    }, [])

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <PetDetail ownerId={ownerId} petId={petId}/>
                </Grid>
                <Grid item xs={12}>
                    <VisitInput ownerId={ownerId} petId={petId}/>
                </Grid>
  　　          <Grid item xs={12}>
                    <VisitList ownerId={ownerId} petId={petId}/>
                </Grid>
            </Grid>
        </Container>
    )
}
