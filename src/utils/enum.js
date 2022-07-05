export const stockState = {
    USEABLE: "Useable",
    DAMAGED: "Damaged",
    EXPIRED: "Expired",
    QUARANTINE: "Quarantine"
};

export const transactionType = {
    RETURN: "Return",
    RECALL: "Recall",
    RECEIPT: "Receipt"
}

export const source = [
    {
        id: "payroll_system",
        name: 'Payroll System',
    },
    {
        id: "journal",
        name: 'Journal',
    },
    {
        id: "sales_system",
        name: 'Sales System',
    },
    {
        id: "asset_mgt_system",
        name: 'Asset Management System',
    },
]