"use client";

import { useUser } from "../../components/user-provider";

export const ProfileCard = () => {
    const { username, email, sex, age, userContext } = useUser();
    return (
        <div>
            <div>{username}</div>
            <div>{email}</div>
            <div>{sex}</div>
            <div>{age}</div>
            <div>{userContext}</div>
        </div>
    );
};
