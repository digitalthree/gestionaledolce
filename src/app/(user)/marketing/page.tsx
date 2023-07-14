'use client';
import React from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import MainSection from "@/app/(user)/marketing/components/MainSection";

export default function Page() {
    const {user} = useUser()
    if (user) {
        if (user.nickname !== "user") {
            window.alert("Non hai i permessi necessari per accedere a questa sezione")
            window.history.back()
        }
    }

    return (
        <>
            <MainSection/>
        </>

    )

}

