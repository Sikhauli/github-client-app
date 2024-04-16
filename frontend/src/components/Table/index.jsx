import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
} from "@nextui-org/react";
import { capitalize } from "./utils";
import { columns, statusOptions } from "./data";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useSnackbar } from "notistack";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const statusColorMap = {
    later: "success",
    read: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "message",  "status", "actions"];

export default function App({ repoData, token, setLoading }) {

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "date",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const { enqueueSnackbar } = useSnackbar();

    const [commits, setCommits] = useState([]);
    const [commitData, setCommitData] = useState([]);

    const pages = Math.ceil(commits?.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...commits];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.message.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.id.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [commits, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch commit data from GitHub API
                const githubResponse = await axios.get(`${repoData?.commits_url?.replace('{/sha}', '')}`, {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                const commitsData = githubResponse.data.map(commit => ({
                    message: commit.commit.message,
                    date: commit.commit.author.date,
                    id: commit.sha,
                    status: "",
                }));

                // Set the commit data state
                setCommitData(commitsData);

                // Fetch commits from server if repoData 
                if (repoData) {
                    const serverResponse = await axios.get('http://localhost:5000/api/commits/all', {
                        params: {
                            name: repoData?.name
                        }
                    });
                    const mergedArray = mergeArrays(serverResponse.data, commitsData);
                    setCommits(mergedArray);
                } else {
                    setCommits(commitsData);
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar(error, { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, enqueueSnackbar, repoData, setLoading]);

    const mergeArrays = (array1, array2) => {
        return array2.reduce((acc, obj2) => {
            const obj1 = array1.find(obj1 => obj1.id === obj2.id);
            if (!obj1) {
                acc.push(obj2);
            }
            return acc;
        }, [...array1]);
    };

    // Function to update the status of a commit
    const handleUpdateStatus = React.useCallback(async (commitId, newStatus, message) => {
        try {
            const requestBody = {
                status: newStatus,
                id: commitId,
                message,
                name: repoData?.name
            };
            const response = await axios.post(`http://localhost:5000/api/commits/status`, requestBody);
            enqueueSnackbar(`Successfully updated status to ${response.data.status === 'read' ? 'Read' : 'Read Later'}`, {
                variant: "success",
            });
            return response.data;
        } catch (error) {
            console.error('Error updating commit status:', error);
            throw error;
        }
    }, [enqueueSnackbar]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {           
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600 rounded"
                        color={statusColorMap[user.status] || ''}
                        size="sm"
                        variant="dot"
                    >
                        {cellValue || 'None'}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="dark bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <IoEllipsisVerticalSharp className="text-default-400" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleUpdateStatus(user.id, 'read', user.message)}>Read</DropdownItem>
                                <DropdownItem onClick={() => handleUpdateStatus(user.id, 'later', user.message)}>Later</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={<CiSearch className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown className="dark">
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<MdOutlineKeyboardArrowDown className="text-small" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown className='dark'>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<MdOutlineKeyboardArrowDown className="text-small" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {commits?.length} commits</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        commits?.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table
            isCompact
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No data was found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
