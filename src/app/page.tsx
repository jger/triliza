'use client';
import React, { useEffect, useState } from 'react';
import Game from '../components/Game/Game';

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch for RNW styles if necessary
    if (!mounted) {
        return null;
    }

    return (
        <main>
            <Game />
        </main>
    );
}
