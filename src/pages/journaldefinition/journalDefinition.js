import moment from 'moment';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import dbData from '../../accdb';
import Backbutton from '../../components/backbutton';
import { formatter2 } from '../../utils/formatter';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';


export default function JournalDefinition() {
    const { register, handleSubmit, formState: { errors }, reset, watch, trigger, control, setValue } = useForm({
        mode: "onChange",
        reValidateMode: 'onChange'
    });
    const { register: register2, formState: { errors: errors2 }, setValue: setValue2, reset: reset2, getValues: getValues2 } = useForm({
        mode: "onChange",
        reValidateMode: 'onChange'
    });
const history = useNavigate()
    const [loading, setLoading] = useState(false);
    let [showDate, setShowDate] = useState(false);
    const [journalDefinition, setJournalDefinition] = useState({
        journalguid:uuidv4(),
        transactionRef: "",
        journalDescription: "",
        transactionDate: "",
        remark: "",
        autoGenerated: false,
        canAddMoreItems: false,
        canRemoveMoreItems: false,
        autoGenerated: false,
        dateOfMonth: ""
    })
    const [journalDefinitionDetails, setJournalDefinitionDetails] = useState([])
    const [addJournalDefinitionDetails, setAddJournalDefinitionDetails] = useState({
        accountCode: "",
        amount: 0,
        isCredited: false,
        compulsory: false,
        canChangeAccountCode: false,
        canChangeIsCredited: false,
        canChangeAmount: false,
    })

    const handleOnChange = (e) => {
        let { name, value, checked } = e.target
        if (name === "autoGenerated") {
            if (checked === true) {
                setShowDate(true)
            } else {
                setShowDate(false)
            }
        }
        if (name === "dateOfMonth") {
            value = Number(value)
            if (value > 31 || value < 1 || value === "NaN") {
                return setValue("dateOfMonth", )
            } 
        }
        setJournalDefinition({
            ...journalDefinition,
            [name]: value === 'on' ? checked : value ?? JSON.parse(value),
        })

    }
    console.log({ journalDefinition })

    const handleOnChange2 = (e) => {
        let { name, value, checked } = e.target
        if (name === "amount") {
            if (value === "") {
                setValue2("amount", value)
            }
            else {
                const num = parseFloat(value.replace(/,/g, ''));
                const numm = (formatter2.format((num)))
                setValue2("amount", numm === "NaN" ? 0 : numm)
            }
        }
        setAddJournalDefinitionDetails({
            ...addJournalDefinitionDetails,
            [name]: value === 'on' ? checked : value ?? JSON.parse(value),
        })
    }

    const addToJournalDetails = () => {
        const amo = getValues2("amount")
        const amount = parseFloat(amo ? amo.replace(/,/g, '') : 0);
        const journ = {
            sn:addJournalDefinitionDetails.sn? addJournalDefinitionDetails.sn:journalDefinitionDetails.length +1,
            parentguid:journalDefinition.journalguid,
            accountCode: addJournalDefinitionDetails.accountCode,
            amount: amount,
            isCredited: addJournalDefinitionDetails.isCredited,
            compulsory: addJournalDefinitionDetails.compulsory,
            canChangeAccountCode: addJournalDefinitionDetails.canChangeAccountCode,
            canChangeIsCredited: addJournalDefinitionDetails.canChangeIsCredited,
            canChangeAmount: addJournalDefinitionDetails.canChangeAmount,
        }
        setJournalDefinitionDetails([...journalDefinitionDetails, journ]);
        reset2()

    }

    const deleteJournal = (journalDefinition) => {
        let exists = journalDefinitionDetails.find(x => x.journalId === journalDefinition.journalId);

        if (exists) {
            const filteredJournals = journalDefinitionDetails.filter(function (item) {
                return item.accountCode !== journalDefinition.accountCode;
            })
            setJournalDefinitionDetails([...filteredJournals]);
        }
    }

    const editJournal = (journalDefinition) => {
        setValue2("transactionNarration", journalDefinition.transactionNarration)
        setValue2("accountCode", journalDefinition.accountCode)
        setValue2("credit", formatter2.format(journalDefinition.credit))
        setValue2("debit", formatter2.format(journalDefinition.debit))
        setAddJournalDefinitionDetails(journalDefinition)
        const filteredJournals = journalDefinitionDetails.filter(function (item) {
            return item.accountCode !== journalDefinition.accountCode;
        })
        setJournalDefinitionDetails([...filteredJournals]);

    }

    const submitJournal = () => {
        const payload = {
            journalguid:journalDefinition.journalguid,
            approvedOn: "",
            approvedBy: "",
            createdBy: "Stephanie",
            createdOn: new Date(),
            transactionRef: journalDefinition.transactionRef,
            transactionDate: new Date(),
            journalDescription: journalDefinition.journalDescription,
            remark: journalDefinition.remark,
            canRemoveMoreItems: journalDefinition.canRemoveMoreItems,
            canAddMoreItems: journalDefinition.canAddMoreItems,
            autoGenerated: journalDefinition.autoGenerated,
            dateOfMonth: journalDefinition.dateOfMonth,
            journalDefinitionDetails: journalDefinitionDetails
        }
        console.log({ payload })
        localStorage.setItem("journdef", JSON.stringify(payload));
        dbData.savejournalDefinition(payload, callback)
        function callback(r){
            if (r === 'success') {
                history("/listjournaldef")
                alert('Journal defination created')//remove all alert and add toaster:  NOTE DUE TO THE NATURE OF THE DB THE SUCCESS ALERT MIGHT COME SEVERAL TIMES. PLEASE HANDLE THE ISSUE OR LET ME KNOW IF YOU CANT
            }else{
                alert(r)//REMOVE THE ALERT AND ADD THE TOASTER
            }
        }

    }
    return (
        <>
            <div className="content-wrapper mt-5">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center flex-column">
                                {/* <img src="assets/images/logo-mini-1.png" /> */}
                                {/* <span className="h6 d-none d-md-block">NETOP CONSULTING</span> */}
                            </div>
                            <span className="card-title">JOURNAL DEFINITION</span>
                            <span className="mr-5 d-none d-md-block"></span>
                        </div>
                        <div className='d-flex float-right mt-2'>
                            <Backbutton />
                            <button
                                type="submit" onClick={handleSubmit(submitJournal)}
                                class="btn btn-primary btn-sm btn-icon-text text-white d-flex mx-1"
                                disabled={loading ? true : false}>
                                <i className="ti-save mr-1" title="Submit"></i>
                                <span className="d-none d-md-block"></span>
                                {loading ? "SUBMITTING " : "SUBMIT"}
                                {loading === true && <div className="spinner-border text-light spinner-grow-sm">
                                </div>}
                            </button>
                        </div>

                        <form className="row newReceiptNote mt-5">
                            <div className="form-group col-md-3">
                                <label htmlFor="transactionRef">Transaction Ref<span className="text-danger">*</span>
                                    {errors.transactionRef &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control form-control-sm"
                                    id="transactionRef"
                                    name="transactionRef"
                                    {...register("transactionRef", { required: true, onChange: (e) => { handleOnChange(e) } })}
                                    placeholder="Journal Description" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="journalDescription">Journal Description<span className="text-danger">*</span>
                                    {errors.journalDescription &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control form-control-sm"
                                    id="journalDescription"
                                    name="journalDescription"
                                    {...register("journalDescription", { required: true, onChange: (e) => { handleOnChange(e) } })}
                                    placeholder="Journal Description" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="remark">Remark<span className="text-danger">*</span>
                                    {errors.remark &&
                                        <span className="text-danger font-weight-bold">required</span>
                                    }
                                </label>
                                <input type="text" className="form-control form-control-sm"
                                    id="remark"
                                    name="remark"
                                    {...register("remark", { required: true, onChange: (e) => { handleOnChange(e) } })}
                                    placeholder="Remark" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="canAddMoreItems">Can Add More Items</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="canAddMoreItems"
                                        name="canAddMoreItems"
                                        {...register("canAddMoreItems", { onChange: (e) => handleOnChange(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="canAddMoreItems"></label>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="canRemoveMoreItems">Can Remove More Items</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="canRemoveMoreItems"
                                        name="canRemoveMoreItems"
                                        {...register("canRemoveMoreItems", { onChange: (e) => handleOnChange(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="canRemoveMoreItems"></label>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="autoGenerated">Auto Generated</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="autoGenerated"
                                        name="autoGenerated"
                                        {...register("autoGenerated", { onChange: (e) => handleOnChange(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="autoGenerated"></label>
                                </div>
                            </div>

                            {showDate && <div className="form-group col-md-3">
                                <label htmlFor="dateOfMonth">Date of Month</label>
                                {errors.dateOfMonth && (
                                    <span className="text-danger"> required</span>
                                )}
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="dateOfMonth"
                                    name="dateOfMonth"
                                    placeholder="Date of Month"
                                    {...register("dateOfMonth", {
                                        required: false,
                                        onChange: (e) => { handleOnChange(e) }
                                    })}
                                />
                            </div>}

                        </form>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                        <form className="row newReceiptNote ">
                            <div className="form-group col-md-3">
                                <label htmlFor="accountCode">Account Code
                                    {errors2.accountCode &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control form-control-sm"
                                    id="accountCode"
                                    name="accountCode"
                                    {...register2("accountCode", { required: true, onChange: (e) => { handleOnChange2(e) } })}
                                    placeholder="Account Code" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="amount">Amount
                                    {errors2.amount &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control form-control-sm"
                                    id="amount"
                                    name="amount"
                                    {...register2("amount", { required: true, onChange: (e) => { handleOnChange2(e) } })}
                                    placeholder="Amount" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="isCredited">Is Credited</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="isCredited"
                                        name="isCredited"
                                        {...register("isCredited", { onChange: (e) => handleOnChange2(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="isCredited"></label>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="canChangeAccountCode">Can Change Account Code</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="canChangeAccountCode"
                                        name="canChangeAccountCode"
                                        {...register("canChangeAccountCode", { onChange: (e) => handleOnChange2(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="canChangeAccountCode"></label>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="canChangeIsCredited">Can Change Is Credited</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="canChangeIsCredited"
                                        name="canChangeIsCredited"
                                        {...register("canChangeIsCredited", { onChange: (e) => handleOnChange2(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="canChangeIsCredited"></label>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="canChangeAmount">Can Change Amount</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="canChangeAmount"
                                        name="canChangeAmount"
                                        {...register("canChangeAmount", { onChange: (e) => handleOnChange2(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="canChangeAmount"></label>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="compulsory">Compulsory</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="compulsory"
                                        name="compulsory"
                                        {...register("compulsory", { onChange: (e) => handleOnChange2(e) })}
                                    />
                                    <label className="custom-control-label" htmlFor="compulsory"></label>
                                </div>
                            </div>


                        </form>
                        <button
                            type="submit"
                            onClick={() => addToJournalDetails()}
                            class="btn btn-primary btn-sm btn-icon-text text-white d-flex float-right"
                        // disabled={loading ? true : false}
                        >
                            <i className=" mdi mdi-plus mr-1" title="Submit"></i>
                            ADD
                        </button>

                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="">
                                <div className='table-responsive'>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>
                                                    S/N
                                                </th>
                                                <th>
                                                    ACCOUNT CODE
                                                </th>
                                                <th>
                                                    AMOUNT
                                                </th>
                                                <th>
                                                    IC
                                                </th>
                                                <th>
                                                    CCAC
                                                </th>
                                                <th>
                                                    CCIC
                                                </th>
                                                <th>
                                                    CCA
                                                </th>
                                                <th>
                                                    C
                                                </th>
                                                <th>
                                                    ACTION
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {journalDefinitionDetails &&
                                                journalDefinitionDetails.map((journal, index) =>
                                                    <tr className="py-0">
                                                        <td >
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {journal.accountCode}
                                                        </td>
                                                        <td>
                                                            {formatter2.format((journal.amount))}
                                                        </td>
                                                        <td>
                                                            {journal.isCredited ? "True" : "False"}
                                                        </td>
                                                        <td>
                                                            {journal.canAddMoreItems ? "True" : "False"}
                                                        </td>
                                                        <td>
                                                            {journal.canChangeAccountCode ? "True" : "False"}
                                                        </td>
                                                        <td>
                                                            {journal.canChangeAmount ? "True" : "False"}
                                                        </td>
                                                        <td>
                                                            {journal.compulsory ? "True" : "False"}
                                                        </td>

                                                        <td>
                                                            <div className="d-flex justify-content-between">
                                                                {<i className="ti-pencil text-warning mr-3" onClick={() => editJournal(journal)} title="Edit" />}
                                                                <i className="ti-trash text-danger" onClick={() => deleteJournal(journal)} title="Delete" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
