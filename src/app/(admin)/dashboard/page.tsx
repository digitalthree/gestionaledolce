'use client';
import React from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Gantt, Task, ViewMode} from "gantt-task-react";
import {ViewSwitcher} from "@/app/(shared)/ViewSwitcher";
import Profile from "@/app/(admin)/dashboard/components/UserProfile";
import MainSection from "@/app/(admin)/dashboard/components/MainSection";

export default function Page() {
    const {user} = useUser()

    if (user) {
        if (user.nickname !== "admin") {
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

