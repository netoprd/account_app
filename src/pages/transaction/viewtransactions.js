import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { source } from '../../utils/enum';
import Backbutton from '../../components/backbutton';
import { useParams } from 'react-router';
import {transactions} from '../../utils/transaction-mockdata'
import { formatter2 } from '../../utils/formatter';




export default function ViewTransaction() {
    const { id }= useParams()
    const [transaction, settransaction] = useState([]);

    useEffect(() => {
        const response = transactions?.data
        const res = response.find(y => y.id === Number(id));
        settransaction(res);
    }, []);

   

   

    return (
        <>
            <div className="content-wrapper mt-5">
                <div className="card mb-5">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center flex-column">
                               
                            </div>
                            <span className="card-title">VIEW TRANSACTION</span>
                            <span className="mr-5 d-none d-md-block"></span>
                        </div>
                        <div className="d-flex float-right">
                        <Backbutton/>
                         </div>
                        <form className="row newReceiptNote mt-5">

                            <div className="form-group col-md-4">
                                <label htmlFor="transactionRef">Transaction Ref
                                </label>
                                <input type="text" className="form-control"
                                    id="transactionRef"
                                    name="transactionRef"
                                    readOnly
                                    placeholder="Transaction Ref" 
                                    value={transaction?.transactionRef}
                                    />
                                    
                            </div>


                            <div className="form-group col-md-4">
                                <label htmlFor="transactionDate">Transaction Date</label>
                                <input
                                    readOnly
                                    type="date"
                                    className="form-control"
                                    id="transactionDate"
                                    name="transactionDate"
                                    placeholder="Expiry Date"
                                    value={ transaction.transactionDate}
                                />
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="transactionNarration">Transaction Narration
                                </label>
                                <input type="text" className="form-control"
                                    id="transactionNarration"
                                    name="transactionNarration"
                                    value={transaction?.narration}
                                    readOnly />
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="transactionNarration">Source
                                </label>
                                <input type="text" className="form-control"
                                    name="source"
                                    value={transaction?.source}
                                    readOnly />
                            </div>

                           
                            <div className="form-group col-md-4">
                                <label htmlFor="accountCode">Account Code
                                </label>
                                <input type="text" className="form-control"
                                    id="accountCode"
                                    name="accountCode"
                                   readOnly
                                    placeholder="Account Code"
                                    value={transaction?.accountCode}
                                    />
                            </div>
                           
                          
                        </form>
                    </div>
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
                                                    TRANSACTION NARRATION
                                                </th>
                                               
                                                <th>
                                                    DEBIT
                                                </th>
                                                <th>
                                                    CREDIT
                                                </th>
                                                <th>
                                                   Transaction Number
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        {transaction?.transactionDetails &&
                                                transaction?.transactionDetails.map((trans, index) =>
                                                    <tr className="py-0">
                                                        <td key={index} >
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {trans?.transactionNarration}
                                                        </td>
                                                      
                                                        <td>
                                                            {formatter2.format(trans?.debit)}
                                                        </td>
                                                        <td>
                                                            {formatter2.format(trans?.credit)}
                                                        </td>
                                                        <td>{trans?.transactionNumber}</td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
