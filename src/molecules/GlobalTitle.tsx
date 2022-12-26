import Typography from "@mui/material/Typography";
import SpringLogo from "../images/spring-pivotal-logo.png";
import ReactLogo from "../images/logo.svg";
import PetClinicImage from "../images/petclinic.png";
import Image from "next/image";
import Stack from "@mui/material/Stack";

export const GlobalTitle = () => {
    return (
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            sx={{ height: '100%' }}
        >
            <Stack
                direction="row"
                spacing={2}
            >
                <Image height={64} src={SpringLogo} alt={""}/>
                <Image height={64} src={PetClinicImage} alt={""} className={'petClinic'} unoptimized={true} />
                <Image height={64} src={ReactLogo} alt={""} className={'App-logo'}/>
            </Stack>
        </Typography>
    )
}