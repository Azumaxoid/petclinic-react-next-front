import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TodayVeterinarians from "../../organisms/TodayVeterinarians";
import TodayVisits from "../../organisms/TodayVisits";
import TodayVisitStats from "../../organisms/TodayVisitStats";

function DashboardContent() {

    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <TodayVeterinarians />
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <TodayVisitStats />
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <TodayVisits />
                </Grid>
            </Grid>
        </Container>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
