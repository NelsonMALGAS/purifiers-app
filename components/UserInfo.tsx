"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Pencil,
    Mail,
    UserCircle,
    Phone,
    Fingerprint,
    Save,
    X,
} from "lucide-react";
import { updateProfile } from "firebase/auth";
import showToastMessage from "./showToastMessage";
import { authErrorMessages, authSuccessMessages } from "@/constants/success";

const UserInfo = () => {
    const { currentUser, loading } = useAuth();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || "Not provided");

    useEffect(() => {
        setNameInput(currentUser?.displayName || "");
    }, [currentUser]);

    const name = currentUser?.displayName || "Unnamed User";
    const email = currentUser?.email || "Not provided";
    const uid = currentUser?.uid || "N/A";

    const fallbackInitial =
        name?.[0]?.toUpperCase() || email?.[0]?.toUpperCase() || "U";

    const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        editing ? nameInput || "User" : name
    )}&background=0D8ABC&color=fff&rounded=true`;

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-32 ml-auto" />
                </CardContent>
            </Card>
        );
    }

    if (!currentUser) {
        return (
            <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                    You must be logged in to view your profile.
                </CardContent>
            </Card>
        );
    }

    const handleSave = async () => {
        if (!currentUser) return;
        setSaving(true);
        try {
            await updateProfile(currentUser, {
                displayName: nameInput.trim(),
            });
            showToastMessage({ type: "success", ...authSuccessMessages.profileUpdate });
            setEditing(false);
        } catch (error) {
            console.error("Profile update failed:", error);
            showToastMessage({ type: "error", ...authErrorMessages.profileUpdate });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                    <Avatar className="h-20 w-20 mx-auto sm:mx-0">
                        <AvatarImage
                            src={editing ? avatarPlaceholder : currentUser.photoURL || avatarPlaceholder}
                            alt="User Avatar"
                        />
                        <AvatarFallback className="m-4">{fallbackInitial}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left w-full">
                        <CardTitle className="text-xl font-bold m-2">
                            {editing ? (
                                <Input
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full max-w-md"
                                />
                            ) : (
                                name
                            )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground m-2">{email}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4" />
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={editing ? nameInput : name}
                            disabled={!editing}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Name"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                        </Label>
                        <Input id="email" value={email} disabled />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone
                        </Label>
                        <Input
                            type="tel"
                            id="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={!editing}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="photo" className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4" />
                            Photo URL
                        </Label>
                        <Input
                            id="photo"
                            value={currentUser.photoURL || ""}
                            disabled
                            placeholder="Photo URL"
                        />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="uid" className="flex items-center gap-2">
                            <Fingerprint className="h-4 w-4" />
                            User ID
                        </Label>
                        <Input id="uid" value={uid} disabled />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    {editing ? (
                        <>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setEditing(false);
                                    setNameInput(currentUser.displayName || "");
                                }}
                                disabled={saving}
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="gap-2"
                            >
                                <Save className="h-4 w-4" />
                                {saving ? "Saving..." : "Save"}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setEditing(true)} className="gap-2 self-end">
                            <Pencil className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfo;
