import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Groups2Icon from '@mui/icons-material/Groups2';
import React, {useEffect} from "react";
import { parseCookies } from 'nookies'
import {AppBar} from "../molecules/AppBar";
import {GlobalTitle} from "../molecules/GlobalTitle";
import {Drawer} from "../molecules/Drawer";
import Link from "next/link";
import {LinkMenuItem} from "../molecules/LinkMenuItem";
import * as newrelic from "../utils/newrelic-browser";
import logger from "../logs/logger"

import PetClinicTracer from "../tracers/PetClinicTracer"
import { context, trace, Tracer, Span, Exception, SpanStatusCode } from '@opentelemetry/api'

export const GlobalNavigation = () => {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(()=>{
        const span = PetClinicTracer.getTracer().startSpan('Start!!', {startTime: new Date().getTime()})
        context.with(trace.setSpan(context.active(), span), ()=>{
            const span2 = PetClinicTracer.getTracer().startSpan('test2', {startTime: new Date().getTime()})
            try {
                throw new Error('TestError')
            } catch (e) {
                if (typeof e === 'string') {
                    span2.setStatus({code: SpanStatusCode.ERROR, message: e})
                } else {
                    const err = e as Error
                    span2.setStatus({code: SpanStatusCode.ERROR, message: (err.message + '\n' + err.stack)})
                }
            }
            span2.end(new Date().getTime())
        })
        span.end(new Date().getTime())
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                // @ts-ignore
                const lcp = entry as any
                logger.info(`LCP candidate : ${lcp.url}`);
                newrelic.addPageAction('LCPCandidate', {
                    startTime: lcp.startTime,
                    loadTime: lcp.loadTime,
                    duration: lcp.duration,
                    renderTime: lcp.renderTime,
                    size: lcp.size,
                    resourceUrl: lcp.url,
                    element: lcp.element?.innerText.substring(0, 50)
                })

            }
        }).observe({type: 'largest-contentful-paint', buffered: true});
        setTimeout(()=> {
            new PerformanceObserver((entryList) => {
                let worstElement: any = null
                for (const entry of entryList.getEntries()) {
                    let cls = entry as any
                    if (!worstElement || worstElement.value < cls.value) {
                        worstElement = cls
                    }
                }
                if (!!worstElement && worstElement.value > 0.001) {
                    // @ts-ignore
                    const souceCount = worstElement.sources?.length ?? 0
                    const clsEvent = {
                        startTime: worstElement.startTime,
                        lastInputTime: worstElement.lastInputTime,
                        value: worstElement.value,
                        source1Tag: souceCount > 0 ? worstElement.sources[0].node?.tagName : '',
                        source1ClassName: souceCount > 0 ? worstElement.sources[0].node?.className : '',
                        source1InnerText50: souceCount > 0 ? worstElement.sources[0].node?.innerText?.substring(0, 50) : '',
                        source2Tag: souceCount > 1 ? worstElement.sources[1].node?.tagName : '',
                        source2ClassName: souceCount > 1 ? worstElement.sources[1].node?.className : '',
                        source2InnerText50: souceCount > 1 ? worstElement.sources[1].node?.innerText?.substring(0, 50) : '',
                    }
                    logger.info(`CLS candidate : ${JSON.stringify(clsEvent)}`);
                    newrelic.addPageAction('CLSCandidate', clsEvent)
                }
            }).observe({type: 'layout-shift', buffered: true});
        }, 2000)
        const cookies = parseCookies()
        newrelic.setCustomAttribute('userId', cookies.userId || -1)
    }, [])
    return (<>
        <AppBar position="absolute" open={open}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <GlobalTitle />
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <LinkMenuItem href={'/dashboard'} label={'Dashboard'} icon={<DashboardIcon />} />
                <LinkMenuItem href={'/owners'} label={'Owners'} icon={<Groups2Icon />} />
            </List>
        </Drawer>
    </>)
}