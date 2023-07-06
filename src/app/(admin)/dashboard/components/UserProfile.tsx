'use client';
import React from 'react';
import {useUser} from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
    const {user, error, isLoading} = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        user ? (
            <div className="flex flex-col items-center justify-center mt-10">

                <Image src={user.picture as string} alt={user.name as string} className="w-50 h-50 rounded-3xl mb-10"/>

                <h2>{user.name}</h2>
                <p>ROLE: {user.nickname}</p>
                <Link href="/api/auth/logout">Logout</Link>
            </div>
        ):
            <></>
    );
}