'use client';
import Profile from "@/app/(admin)/dashboard/components/UserProfile";
import React, {useEffect} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Gantt, Task} from "gantt-task-react";

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
            <Profile/>
        </>

    )

}