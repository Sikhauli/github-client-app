import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, CardHeader, CardBody, Divider} from "@nextui-org/react";
import { FaBookOpen } from "react-icons/fa";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { TbPackages } from "react-icons/tb";
import { IoStarSharp } from "react-icons/io5";
import { LuUser2, LuUserPlus2 } from "react-icons/lu";
import { TiPinOutline } from "react-icons/ti";
import { IoMdArrowRoundBack } from "react-icons/io";
import CardListWithPagination from '../../components/Card/index';
import { useSnackbar } from "notistack";

import {
    API,
    API_URL,
    CALLBACK_ENDPOINTS,
    getAxiosError,

} from "../../helpers/constants"

// components
import Table from "../Table"

const links = [
    { name: 'Overview', icon: <FaBookOpen />, link: '' },
    { name: 'Repository', icon: <RiGitRepositoryCommitsFill />, link: '' },
    { name: 'Projects', icon: <GrProjects size={12} />, link: '' },
    { name: 'Packages', icon: <TbPackages />, link: '' },
];

function index({ token, setLoading }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [items, setItems] = useState([]);
    const itemsPerPage = 9;
    const { enqueueSnackbar } = useSnackbar();
    const [summary, setSummary] = useState([]);


    const Cards = [
        { name: 'Repository', icon: <RiGitRepositoryCommitsFill size={40} />, number: summary?.totalRepos , bg: "bg-purple-500" },
        { name: 'Starred', icon: <IoStarSharp size={40} />, number: summary?.starredRepos?.length,  bg: "bg-orange-500" },
        { name: 'Followers', icon: <LuUser2 size={40} />, number: summary?.followers , bg: "bg-blue-500" },
        { name: 'Following', icon: <LuUserPlus2 size={40} />, number: summary?.following , bg: "bg-cyan-500" },
    ];

    const handleRepoSelection = (repo) => {
        setSelectedRepo(repo);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage < totalItems / itemsPerPage ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setLoading(true)
        axios.get(`https://api.github.com/user/repos`, {
            headers: {
                Authorization: `token ${token}`,
            },
        })
            .then((response) => {
                setItems(response.data);
                setTotalItems(response.data.length);
            })
            .catch((error) => {
                enqueueSnackbar(error, { variant: "error" });
            })
            .finally(() => {
                setLoading(false)
            });
    }, [token, currentPage, enqueueSnackbar, setLoading]);

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}repo`, {
            headers: {
                token: token,
            },
        })
            .then((response) => {
                setSummary(response.data);
            })
            .catch((error) => {
                enqueueSnackbar(error, { variant: "error" });
            })
            .finally(() => {
                setLoading(false)
            });
    }, [token, currentPage, enqueueSnackbar, setLoading]);
    
  return (
    <>
        <Card className='bg-black rounded-2xl '>
            <CardHeader>
                <div className="flex gap-4 justify-center py-2 ">
                    {links.map((link) => (
                        <div href={link.link} key={link.name} className='cursor-pointer'>
                        <div className='flex gap-2'>
                            <p className='text-sm'>{link.icon}</p>
                            <p className='text-xs'>{link.name}</p>
                        </div>
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex justify-between py-2 ">
                    {Cards.map((card) => (
                        <Card key={card.name} className='w-[13rem] flex flex-row cursor-pointer gap-4 p-3 hover:bg-gray-800'>
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
                <div className='flex justify-between my-6 px-4'>
                      <div className='gap-4'>
                        <p className='flex gap-2 capitalize '><TiPinOutline className='mt-1'/>Your repositories</p>
                          {selectedRepo && (
                              <div className='flex cursor-pointer'>
                                  <IoMdArrowRoundBack size={32} onClick={() => handleRepoSelection(null)} />
                                  <p className='mt-1' onClick={() => handleRepoSelection(null)}>Back</p>
                              </div>
                          )}
                    </div>
                      <p className='text-xl font-serif text-gray-300 my-6'>{selectedRepo?.name}</p>
                </div>
                  {selectedRepo ? (
                      <div className='my-6'>
                          <div>
                              <Table repoData={selectedRepo} token={token} setLoading={setLoading}/>
                          </div>
                      </div>
                  ) : (
                      <CardListWithPagination
                          currentItems={currentItems}
                          currentPage={currentPage}
                          totalItems={totalItems}
                          handlePrevPage={handlePrevPage}
                          handleNextPage={handleNextPage}
                          handleRepoSelection={handleRepoSelection}
                          setCurrentPage={setCurrentPage}
                          itemsPerPage={itemsPerPage}
                      />
                  )}
            </CardBody>
            <Divider />

        </Card>
    </>
  )
}

export default index


