"use client";
import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { IoIosBody } from "react-icons/io";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import AuthPopup from "../AuthPopup/AuthPopup";

const Navbar = () => {
    const [isloggedin, setIsloggedin] = useState<boolean>(false);

    const [showpopup, setShowpopup] = useState<boolean>(false);

    const checklogin = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/checklogin", {
            method: "POST",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.ok) {
                    setIsloggedin(true);
                } else {
                    setIsloggedin(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        checklogin();
    }, [showpopup]);

    const handleLogout = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setIsloggedin(false); // Update state to reflect logout
            } else {
                // Handle logout failure
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error occurred during logout:", error);
        }
    };
    return (
        <nav>
            <Image src={logo} alt="Logo" />
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/profile">
                <IoIosBody />
            </Link>
            {isloggedin ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button
                    onClick={() => {
                        setShowpopup(true);
                    }}
                >
                    Login
                </button>
            )}
            {showpopup && <AuthPopup setShowpopup={setShowpopup} />}
        </nav>
    );
};

export default Navbar;
