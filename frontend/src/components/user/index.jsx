import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Textarea, Chip } from "@nextui-org/react";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";

function User({ userData }) {

    const socialMedia = [
        { name: 'Facebook', icon: <FaFacebookF />, link: 'https://www.facebook.com/' },
        { name: 'Twitter', icon: <FaSquareXTwitter />, link: 'https://twitter.com/' },
        { name: 'Instagram', icon: <FaSquareInstagram />, link: 'https://www.instagram.com/' },
        { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/' },
    ];

    const skills = [
     
    ];

  return (
    <>
      <div className='bg-transparent w-[12rem] overflow-y-auto'>
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none"
        >
            <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={userData?.avatar_url}
                width={200}
            />
        </Card>
        <div className='p-2'>
            <p className='font-semibold text-center capitalize'>{userData?.name}</p>
            <p className='text-gray-400 font-semibold text-center mb-2'>@{userData?.login}</p>
            <Textarea
                isDisabled
                label="Bio"
                labelPlacement="inside"
                placeholder="There's no bio"
                defaultValue={userData?.bio}
                className="max-w-xs text-xs"
            />
            <div className='py-2'>
                <div className="flex gap-4 justify-center py-2">
                    {socialMedia.map((platform) => (
                        <a href={platform.link} key={platform.name}>
                            {platform.icon}
                        </a>
                    ))}
                </div>
            </div>
            <p className='text-sm py-2'>Skills</p>
            <div className="grid grid-cols-3 gap-1 justify-start ">
                {skills.map((skill, index) => (
                    <Chip isDisabled radius="sm" size="sm" key={index}>
                      <p className='text-xs'>{skill}</p>
                    </Chip>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default User