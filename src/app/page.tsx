'use client';
import React, {useEffect} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";

export default function Home() {
    const { user } = useUser();
    useEffect(() => {
        if(!user){
            window.location.href = "http://localhost:3000/api/auth/login"
        }
        else {
            if(user?.nickname === "admin"){
                window.location.href = "http://localhost:3000/dashboard"
            }
            if(user?.nickname === "user"){
                window.location.href = "http://localhost:3000/marketing"
            }
        }
    }, [user])
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"/>
    )
}