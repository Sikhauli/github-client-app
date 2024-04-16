import React from 'react';
import { Card, Button, Chip, Pagination } from '@nextui-org/react'; 
import {MdStarOutline } from "react-icons/md";

const CardListWithPagination = ({
    currentItems,
    currentPage,
    totalItems,
    handlePrevPage,
    handleNextPage,
    handleRepoSelection,
    setCurrentPage,
    itemsPerPage
}) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="grid grid-cols-3 gap-4">
                {currentItems.map((repo) => (
                  <div 
                    key={repo.name} 
                    onClick={() => handleRepoSelection(repo)} 
                    className="cursor-pointer"
                  >
                    <Card className='cursor-pointer p-3 hover:bg-gray-800 w-fit'>
                        <div className='flex rounded-lg p-2 gap-2 w-[280px] h-[100px]'>
                            <div className='flex flex-col justify-between'>
                                <p className='text-gray-400 text-sm font-bold'>{repo?.name}</p>
                                <p className='text-xs'>{repo?.description || 'No Description'}</p>
                            </div>
                        </div>
                        <div className='mt-1'>
                            <div className='flex gap-1'>
                                <Chip isDisabled radius="sm" color="warning" size="sm" variant="dot">{repo.language}</Chip>
                                <Chip isDisabled radius="sm" size="sm" startContent={<MdStarOutline size={12} />} variant="faded">{repo.likes}</Chip>
                                <Chip isDisabled radius="sm" size="sm" startContent={<MdStarOutline size={12} />} variant="faded">{repo.forks}</Chip>
                            </div>
                        </div>
                    </Card>
                  </div>  
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    disabled={currentPage === 1}
                    onPress={handlePrevPage}
                    className='mr-3'
                >
                    Previous
                </Button>
                <Pagination
                    total={totalItems / itemsPerPage}
                    color="secondary"
                    page={currentPage}
                    onChange={setCurrentPage}
                    className='w-fit'
                />
                <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    disabled={currentPage >= totalItems / itemsPerPage}
                    onPress={handleNextPage}
                    className='ml-3'
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CardListWithPagination;
