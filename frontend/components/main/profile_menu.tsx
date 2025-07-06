'use client'

import { DropdownMenu } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CiUser, CiGlobe } from "react-icons/ci"

export default function ProfileMenu() {
    const router = useRouter()
    return (<>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Image src={'/assets/images/avatar.png'} alt="Profile" width={40} height={40} priority />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size={'2'} color={'gray'} highContrast>
                <DropdownMenu.Item onClick={() => {router.push('/main/profile')}}><CiUser/>My Profile</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={() => {}}><CiGlobe/>Sign Out</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </>)
}