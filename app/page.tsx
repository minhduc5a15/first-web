'use client';

import { useEffect } from 'react';
import { LikeButton } from '@/app/components';
import { db } from '@/lib/firebase/db';
import { useStore } from '@/lib/providers/provider';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Page = () => {
    const { currentLike, liked, setCurrentLike, increment, decrement, toggleLike } = useStore((state) => state);

    const onClick = async () => {
        if (!liked) {
            await db.ref('likes').set(currentLike + 1);
            setCurrentLike(currentLike + 1);
        } else {
            await db.ref('likes').set(currentLike - 1);
            setCurrentLike(currentLike - 1);
        }
    };

    useEffect(() => {
        db.ref('likes').on('value', (snapshot) => {
            setCurrentLike(snapshot.val());
        });

        return () => {
            db.ref('likes').off();
        };
    }, [setCurrentLike]);

    return (
        <section className="bg-[#191e25] w-full h-full flex flex-col">
            <header className="w-full h-48 bg-[#11181f] flex flex-col font-poppins select-none">
                <div className="w-full h-32 flex-center">
                    <span className="default-color text-3xl font-semibold">Phạm Minh Đức</span>
                </div>
                <div className="w-full flex-1 flex justify-center items-start">
                    <span
                        title={'click to copy'}
                        className="default-color cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText('231230750');
                        }}
                    >
                        231230750
                    </span>
                </div>
            </header>
            <main className="flex-1 w-full flex-center">
                <div className="min-w-44 h-20 flex flex-row items-center rounded-md border-[#303248] border-2 shadow">
                    <div className="w-20 h-20 flex-center">
                        <LikeButton
                            className="ml-3"
                            onClick={() => {
                                toggleLike();
                                onClick();
                            }}
                            $liked={liked}
                        />
                    </div>
                    <div className="h-full flex-grow grid flex-center ">
                        <span className="font-mono text-xl">{currentLike}</span>
                    </div>
                </div>
                <Link
                    href={'https://github.com/minhduc5a15/first-web'}
                    target="_blank"
                    className="fixed bottom-8 right-8 w-8 h-8 flex-center rounded-full cursor-pointer transition"
                >
                    <span className="text-2xl w-full h-full default-color flex-center">
                        <FaGithub />
                    </span>
                </Link>
            </main>
        </section>
    );
};

export default Page;
