"use client"

import {useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("9ede74a2-249f-44d1-925b-9f0ad475effb");
    }, []);

    return null
}