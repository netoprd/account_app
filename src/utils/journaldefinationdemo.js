export const journalDefinition = {
    totalCount: 3,
    data: [
        {
            id:1,
            documentNo: "DOC-001",
            transactionDate: "02-11-2022",
            createdOn: "02-11-2022",
            createdBy: "Stephanie",
            journalDescription: "ok",
            source: "Payload",
            approvedBy: "",
            approvedOn: "",
            remark: "ok",
            canAddMoreItem: false,
            canRemoveMoreItem: false,
            autoGenerated: false,
            journalDefinitionDetails: [
                {
                    journalDefinitionId: 1,
                    accountCode: "DOC-001-A",
                    isCredited: true,
                    amount: 2000,
                    canChangeIsCredited: true,
                    canChangeIsAmount: true,
                    canChangeIsAmountCode: true,
                },
                {
                    journalDefinitionId: 1,
                    accountCode: "DOC-001-B",
                    isCredited: false,
                    amount: 12000,
                    canChangeIsCredited: false,
                    canChangeIsAmount: true,
                    canChangeIsAmountCode: true,
                },
                {
                    journalDefinitionId: 1,
                    accountCode: "DOC-001-C",
                    isCredited: true,
                    amount: 15000,
                    canChangeIsCredited: true,
                    canChangeIsAmount: false,
                    canChangeIsAmountCode: false,
                },
            ]
        },
        {
            id:2,
            documentNo: "DOC-002",
            transactionDate: "04-11-2022",
            createdOn: "04-11-2022",
            createdBy: "Ayomide",
            journalDescription: "ok",
            source: "Sales System",
            approvedBy: "",
            approvedOn: "",
            remark: "ok",
            canAddMoreItem: true,
            canRemoveMoreItem: false,
            autoGenerated: true,
            journalDefinitionDetails: [
                {
                    journalDefinitionId: 1,
                    accountCode: "DOC-002-A",
                    isCredited: true,
                    amount: 8000,
                    canChangeIsCredited: true,
                    canChangeIsAmount: true,
                    canChangeIsAmountCode: true,
                },
                {
                    journalDefinitionId: 1,
                    accountCode: "DOC-002-B",
                    isCredited: false,
                    amount: 62000,
                    canChangeIsCredited: false,
                    canChangeIsAmount: true,
                    canChangeIsAmountCode: true,
                },
                {
                    journalDefinitionId: 1,
                    accountCode: "DOC-002-C",
                    isCredited: true,
                    amount: 25000,
                    canChangeIsCredited: true,
                    canChangeIsAmount: false,
                    canChangeIsAmountCode: false,
                },
            ]
        }
    ]
}