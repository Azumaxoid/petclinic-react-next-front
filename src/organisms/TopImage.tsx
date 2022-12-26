import * as React from 'react';
import {useEffect, useState, useRef} from "react";
import {Visit} from '../types/';
import * as API from '../utils/api'
import {NormalCard} from "../molecules/NormalCard";
import Typography from "@mui/material/Typography";
import topimage from "../images/topimage.png";
import Image from "next/image";

export default function TopImage() {

    return (
        <NormalCard heightFixed={false} height={"660px"} title={''}>
            <Image style={{width: '100%'}} src={topimage} alt={""} className={'petClinic'} unoptimized={true} />
        </NormalCard>
    );
}
