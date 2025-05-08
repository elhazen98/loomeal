import Link from "next/link";
import { ProfileCard } from "./components/profile-card";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div>
            <ProfileCard />
            <Link href="/profile/edit">
                <Button>Edit Profile</Button>
            </Link>
        </div>
    );
}
