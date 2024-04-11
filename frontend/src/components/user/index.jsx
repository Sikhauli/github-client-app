import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Textarea, Chip } from "@nextui-org/react";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";

const socialMedia = [
    { name: 'Facebook', icon: <FaFacebookF />, link: 'https://www.facebook.com/' },
    { name: 'Twitter', icon: <FaSquareXTwitter />, link: 'https://twitter.com/' },
    { name: 'Instagram', icon: <FaSquareInstagram />, link: 'https://www.instagram.com/' },
    { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/' },
];

const skills = [
    'HTML5',
    'CSS3',
    'React',
    'JavaScript',
];

function User() {



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
                src="https://images.pexels.com/photos/2024901/pexels-photo-2024901.jpeg?auto=compress&cs=tinysrgb&w=400"
                width={200}
            />
        </Card>
        <div className='p-2'>
            <p className='text-lg font-semibold text-center capitalize'>sikhauli vhuthuhawe</p>
            <p className='text-gray-400 font-semibold text-center mb-2'>@vhuthuhawe</p>
            <Textarea
                isDisabled
                label="Description"
                labelPlacement="inside"
                placeholder="Enter your description"
                defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                className="max-w-xs"
            />
            <div className='py-2'>
                <div className="flex gap-4 justify-center py-2">
                    {socialMedia.map((platform) => (
                        <a href={platform.link} key={platform.name}>
                            {platform.icon}
                        </a>
                    ))}
                </div>
                <Button  className='bg-purple-700 rounded w-[11rem]' variant="shadow">Follow</Button>
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