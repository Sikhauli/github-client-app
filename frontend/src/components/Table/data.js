
const columns = [
    { name: "ID", uid: "id", sortable: false },
    { name: "MESSAGE", uid: "message", sortable: false },
    { name: "STATUS", uid: "status", sortable: false },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Read", uid: "read" },
    { name: "Later", uid: "later" },
    { name: "None", uid: "" },
];

      
export { columns, statusOptions };
