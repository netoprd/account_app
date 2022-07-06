import moment from 'moment';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { source } from '../../utils/enum';
import Backbutton from '../../components/backbutton';


export default function CreateTransaction() {
    const { register, handleSubmit, formState: { errors }, reset, watch, trigger, control, setValue } = useForm({
        mode: "onChange",
        reValidateMode: 'onChange'
    });

    const [transaction, setTransaction] = useState({
        transactionRef:"",
        transactionDate:"",
        transactionNarration:"",
        accountCode:"",
        debit:"",
        credit:"",
        source:"",
        transactionNo:""
    })

    const handleOnChange = (e) => {
        let { name, value } = e.target
        setTransaction({
            ...transaction,
            [name]: value ?? JSON.parse(value),
        })

    }

    return (
        <>
            <div className="content-wrapper mt-5">
                <div className="card mb-5">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center flex-column">
                                {/* <img src="assets/images/logo-mini-1.png" /> */}
                                {/* <span className="h6 d-none d-md-block">NETOP CONSULTING</span> */}
                            </div>
                            <span className="card-title">CREATE TRANSACTION</span>
                            <span className="mr-5 d-none d-md-block"></span>
                        </div>
                       
                        <button type="button" class="btn btn-primary btn-sm btn-icon-text text-white d-flex float-right">
                            <i className="ti-save mr-1" title="Submit"></i>
                            <span className="d-none d-md-block">SUBMIT</span>
                        </button>
                        <span className='d-flex float-right'>
                        <Backbutton/>
                        </span>
                     
                       
                        <form className="row newReceiptNote mt-5">
                            <div className="form-group col-md-4">
                                <label htmlFor="transactionRef">Transaction Ref
                                    {errors.transactionRef &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control"
                                    id="transactionRef"
                                    name="transactionRef"
                                    onChange={(e) => handleOnChange(e)}
                                    readOnly
                                    {...register("transactionRef", { required: true })}
                                    placeholder="Transaction Ref" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="transactionDate">Transaction Date</label>
                                {errors.transactionDate && (
                                    <span className="text-danger"> required</span>
                                )}
                                <input
                                    type="date"
                                    className="form-control"
                                    id="transactionDate"
                                    name="transactionDate"
                                    placeholder="Expiry Date"
                                    {...register("transactionDate", {
                                        required: true,
                                        onChange: (e) => { handleOnChange(e) }
                                    })}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="transactionNarration">Transaction Narration
                                    {errors.transactionNarration &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control"
                                    id="transactionNarration"
                                    name="transactionNarration"
                                    onChange={(e) => handleOnChange(e)}
                                    {...register("transactionNarration", { required: true })}
                                    placeholder="Transaction Narration" />
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="source">Source
                                    {errors.source &&
                                        <span className="text-danger font-weight-bold"> required</span>}
                                </label>
                                <select className="form-control"
                                    id="source"
                                    name="source"
                                    onChange={(e) => handleOnChange(e)}
                                    {...register("source", { required: true })}
                                >
                                    <option> Select Source </option>
                                    {source.map((source) => (
                                        <option key={source.id} >{source.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="accountCode">Account Code
                                    {errors.accountCode &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control"
                                    id="accountCode"
                                    name="accountCode"
                                    onChange={(e) => handleOnChange(e)}
                                    {...register("accountCode", { required: true })}
                                    placeholder="Account Code" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="debit">Debit
                                    {errors.debit &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control"
                                    id="debit"
                                    name="debit"
                                    onChange={(e) => handleOnChange(e)}
                                    {...register("debit", { required: true })}
                                    placeholder="Debit" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="credit">Credit
                                    {errors.credit &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control"
                                    id="credit"
                                    name="credit"
                                    onChange={(e) => handleOnChange(e)}
                                    {...register("credit", { required: true })}
                                    placeholder="Credit" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="transactionNo">Transaction Number
                                    {errors.transactionNo &&
                                        <span className="text-danger font-weight-bold"> required</span>
                                    }
                                </label>
                                <input type="text" className="form-control"
                                    id="transactionNo"
                                    name="transactionNo"
                                    onChange={(e) => handleOnChange(e)}
                                    {...register("transactionNo", { required: true })}
                                    placeholder="Transaction Number" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
