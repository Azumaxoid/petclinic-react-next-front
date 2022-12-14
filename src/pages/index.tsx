import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Users} from "../organisms/Users";
import {useCallback} from "react";
import {useRouter} from "next/router";
export {getServerSideProps}from "../utils/newrelic"
export default function Home({browserTimingHeader}:{browserTimingHeader: string}) {
    const router = useRouter();

    const handleSelectUser = useCallback((userId: string) => {
        router.push('/dashboard')
    }, [router])

  return (
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
          <div dangerouslySetInnerHTML={{__html: browserTimingHeader}}/>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Users onSelectUser={handleSelectUser}/>
              </Grid>
          </Grid>
      </Container>
  )
}
