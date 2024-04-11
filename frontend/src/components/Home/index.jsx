import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Chip, Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { FaBookOpen } from "react-icons/fa";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { TbPackages } from "react-icons/tb";
import { IoStarSharp } from "react-icons/io5";
import { LuUser2, LuUserPlus2 } from "react-icons/lu";
import { TiPinOutline } from "react-icons/ti";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdStarOutline } from "react-icons/md";

// components
import Table from "../Table"


const links = [
    { name: 'Overview', icon: <FaBookOpen />, link: '' },
    { name: 'Repository', icon: <RiGitRepositoryCommitsFill />, link: '' },
    { name: 'Projects', icon: <GrProjects size={12} />, link: '' },
    { name: 'Packages', icon: <TbPackages />, link: '' },
];


const Cards = [
    { name: 'Repository', icon: <RiGitRepositoryCommitsFill size={40} />, number: 50, bg: "bg-purple-500" },
    { name: 'Stars', icon: <IoStarSharp size={40} />, number: 40, bg: "bg-orange-500" },
    { name: 'Followers', icon: <LuUser2 size={40} />, number: 308, bg: "bg-blue-500" },
    { name: 'Following', icon: <LuUserPlus2 size={40} />, number: 1298, bg: "bg-cyan-500" },
];

const repos = [
    {
        "name": "Project One",
        "desc": "Description of Project One, which is a very interesting project with lots of features.",
        "image": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
        "likes": 120,
        "forks": 60,
        "language": "Python"
    },
    {
        "name": "Project Two",
        "desc": "Description of Project Two, showcasing the power of JavaScript in web development.",
        "image": "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=400",
        "likes": 80,
        "forks": 40,
        "language": "JavaScript"
    },
    {
        "name": "Project Three",
        "desc": "Description of Project Three, a robust Java application for various purposes.",
        "image": "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=400",
        "likes": 200,
        "forks": 90,
        "language": "Java"
    },
    // {
    //     "name": "Project Four",
    //     "desc": "Description of Project Four, leveraging the power of C++ for performance-critical tasks.",
    //     "image": "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     "likes": 150,
    //     "forks": 70,
    //     "language": "C++"
    // },
    // {
    //     "name": "Project Five",
    //     "desc": "Description of Project Five, demonstrating the elegance and simplicity of Ruby programming.",
    //     "image": "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=400",
    //     "likes": 180,
    //     "forks": 80,
    //     "language": "Ruby"
    // }
]


function index() {

    const [commits, setCommits] = useState(500)

  return (
    <>
        <Card className='bg-black rounded-2xl '>
            <CardHeader>
                <div className="flex gap-4 justify-center py-2 ">
                    {links.map((link) => (
                        <p href={link.link} key={link.name} className='cursor-pointer'>
                        <p className='flex gap-2'>
                            <p className='text-sm'>{link.icon}</p>
                            <p className='text-xs'>{link.name}</p>
                        </p>
                        </p>
                    ))}
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex justify-between py-2 ">
                    {Cards.map((card) => (
                        <Card key={card.name} className='flex flex-row cursor-pointer gap-4 p-3 hover:bg-gray-800'>
                            <div className={`${card.bg} rounded-lg p-2`}>
                                {card.icon}
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='text-gray-400 font-bold'>{card.name}</p>
                                <p className='font-semibold text-xl'>{card.number}</p>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className='flex justify-between my-6'>
                    <div className='gap-4'>
                        <p className='flex gap-2 capitalize'><TiPinOutline className='mt-1'/> pinned repositories</p>
                    </div>
                    <div className='flex gap-6'>
                        <MdOutlineKeyboardArrowLeft className='cursor-pointer bg-purple-500 rounded'/>
                        <MdOutlineKeyboardArrowRight className='cursor-pointer bg-purple-500 rounded'/>
                    </div>
                </div>
                <div className='flex gap-4'>
                    {repos.map((repo) => (
                        <Card key={repo.name} className='cursor-pointer p-3 hover:bg-gray-800 w-fit'>
                            <div className='flex rounded-lg p-2 gap-2'>
                                <img src={repo.image} alt={repo.name} className='w-[5rem] '/> 
                                <div className='flex flex-col gap-2'>
                                    <p className='text-gray-400 font-bold'>{repo.name}</p>
                                    <p className='text-xs'>{repo.desc}</p>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <p className='flex gap-1'>
                                    <Chip isDisabled radius="sm" color="warning" size="sm" variant="dot">{repo.language}</Chip>
                                    <Chip isDisabled radius="sm" size="sm" startContent={<MdStarOutline size={12} />} variant="faded">{repo.likes}</Chip>
                                    <Chip isDisabled radius="sm" size="sm" startContent={<MdStarOutline size={12} />} variant="faded">{repo.forks}</Chip>
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className='my-6'>
                    <div>
                        <Table/>    
                    </div>
                </div>
            </CardBody>
            <Divider />

        </Card>
    </>
  )
}

export default index