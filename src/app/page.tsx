'use client';
import React, {useEffect} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";

export default function Home() {
    const { user } = useUser()
    useEffect(() => {
        if(!user){
            window.location.href = process.env.NEXT_PUBLIC_URL+'api/auth/login'
        }
        else {
            if(user?.nickname === "admin"){
                window.location.href = process.env.NEXT_PUBLIC_URL+'dashboard'
            }
            if(user?.nickname === "user"){
                window.location.href = process.env.NEXT_PUBLIC_URL+'marketing'
            }
        }
    }, [user])
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"/>
    )
}