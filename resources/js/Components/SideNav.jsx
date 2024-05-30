import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { FaUsers } from "react-icons/fa";
import { useClickOutside } from "@mantine/hooks";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineDashboard, MdOutlinePlayLesson } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

export default function SideNavTeachers({ user }) {
    const [opened, setOpened] = useState(false);
    const ref = useClickOutside(() => setOpened(false));

    return (
        <nav>
            <button
                onClick={() => setOpened(true)}
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
            >
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className={`bg-white fixed top-0 left-0 z-40 w-64 h-screen border-r border-gray-200 transition-transform ${
                    opened ? "" : "-translate-x-full"
                } sm:translate-x-0 md:translate-x-0`}
                aria-label="Sidebar"
                ref={ref}
            >
                <div className="border-b border-gray-200 p-5">
                    <h1 className="text-2xl font-sans font-bold">Dashboard</h1>
                </div>
                <div className="h-full px-3 py-4 overflow-y-auto flex flex-col gap-5">
                    <div className="space-y-2 font-medium">
                        <Link href="/" className="flex gap-4 items-center">
                            <IoMdHome />
                            Home
                        </Link>
                    </div>
                    {user.data.role == "teacher" ||
                        ("admin" && (
                            <div className="space-y-2 font-medium">
                                <Link
                                    href="/dashboard/students/absence/"
                                    className="flex gap-4 items-center"
                                >
                                    <MdOutlineDashboard />
                                    Daftar Absensi Murid
                                </Link>
                            </div>
                        ))}
                    {user.data.role == "student" ||
                        ("admin" && (
                            <div className="space-y-2 font-medium">
                                <Link
                                    href="/dashboard/teachers/absence/"
                                    className="flex gap-4 items-center"
                                >
                                    <MdOutlineDashboard />
                                    Daftar Absensi Guru
                                </Link>
                            </div>
                        ))}
                    <div className="space-y-2 font-medium">
                        <Link
                            href="/dashboard/teachers"
                            className="flex gap-4 items-center"
                        >
                            <FaUsers />
                            Daftar Guru
                        </Link>
                    </div>
                    <div className="space-y-2 font-medium">
                        <Link
                            href="/dashboard/students"
                            className="flex gap-4 items-center"
                        >
                            <FaUsers />
                            Daftar Murid
                        </Link>
                    </div>
                    <div className="space-y-2 font-medium">
                        <Link
                            href="/dashboard/classrooms"
                            className="flex gap-4 items-center"
                        >
                            <SiGoogleclassroom />
                            Kelas
                        </Link>
                    </div>
                    <div className="space-y-2 font-medium">
                        <Link
                            href="/dashboard/lessons"
                            className="flex gap-4 items-center"
                        >
                            <MdOutlinePlayLesson />
                            Mapel
                        </Link>
                    </div>
                </div>
            </aside>
        </nav>
    );
}
