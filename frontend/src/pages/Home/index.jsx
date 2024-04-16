import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, useDisclosure } from "@nextui-org/react";
import { useSnackbar } from "notistack";

// component
import Navigation from "../../components/Nav/index"
import User from "../../components/user/index"
import HomeComponent from "../../components/Home/index"

function Home({ token, setLoading }) {

  const [user, setUser] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true)
    axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => {
        setUser(response.data)
        return response.data;
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: "error" });
      })
      .finally(() => {
        setLoading(false)
      });
  }, []);


  return (
    <>
    <div className='w-screen h-screen p-8 overflow-y-auto'>
      <Card>
        <CardHeader className='rounded'> 
          <Navigation/>
        </CardHeader>
        <CardBody className='w-[76rem] flex flex-row gap-3'>
          <div className='flex-2'>
              <User userData={user}/>
          </div>
          <div className='flex-1'>
              <HomeComponent setLoading={setLoading} token={token}/>
          </div>
        </CardBody>
      </Card>
     </div>
    </>
  )
}

export default Home