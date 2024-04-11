import React from 'react'
import { FaGithub } from "react-icons/fa";
import { Card, CardHeader, CardBody, CardFooter,  } from "@nextui-org/react";

// component
import Navigation from "../../components/Nav/index"
import User from "../../components/user/index"
import HomeComponent from "../../components/Home/index"

function Home() {
  return (
    <>
    <div className='w-screen h-screen p-8 overflow-y-auto'>
      <Card>
        <CardHeader className='rounded'> 
          <Navigation/>
        </CardHeader>
        <CardBody className='w-[76rem] flex flex-row gap-3'>
          <div className='flex-2'>
            <User/>
          </div>
          <div className='flex-1'>
            <HomeComponent/>
          </div>
        </CardBody>
      </Card>
     </div>
    </>
  )
}

export default Home