"use client";

import {signIn, signOut} from "next-auth/react";

// NOTE:ログインボタン
export const LoginButton = () => {
    return (
        <button style={{marginRight: 10}} onClick={() => signIn()}>
            Sign in
        </button>
    );
};

// NOTE:ログアウトボタン
export const LogoutButton = () => {
    return (
        <button style={{marginRight: 10}} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};