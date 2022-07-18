import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import Backbutton from '../../components/backbutton'
import { Link } from 'react-router-dom';
import { source } from '../../utils/enum';
import { journals } from '../../utils/journaldemodata';
import { formatter2 } from '../../utils/formatter';
import dbData from '../../accdb';
import Swal from 'sweetalert2';

export default function ViewJournal() {
    const id = useParams()
    const history =  useNavigate()
    const [journal, setJournal] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const response = dbData.getjuornalbyid((id.id), callback)
        function callback(r) {
            if (r.success === 'success') {
                setJournal(r.journals)
            } else {
                alert(r)//REMOVE THE ALERT AND ADD THE TOASTER
            }
        }

    }, []);
        console.log({ journal })

        const approve = () => {
            setLoading(true)
            try {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4B49AC',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const result = dbData.approvejournal(id.id, callback);
                        function callback(r) {
                            if(r.success ===true){
                                history("/listjournal")
                                setLoading(false)
                                alert(r.successMessage)//remove all alert and add toaster:  NOTE DUE TO THE NATURE OF THE DB THE SUCCESS ALERT MIGHT COME SEVERAL TIMES. PLEASE HANDLE THE ISSUE OR LET ME KNOW IF YOU CANT    
                            }else{
                                alert(r.errorMessage)
                                setLoading(false)
                            }
                        }
                    }
                })
            }
            catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    
    return (
        <>
            <div className="content-wrapper mt-5">
                <div className="card mb-2">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-center">
                            <span className="card-title text-uppercase">VIEW JOURNAL</span>
                            <span className="mr-5 d-none d-md-block"></span>
                        </div>
                        {<div className="mt-1 d-flex float-right align-item-center">
                            <Backbutton />
                            {!journal.approvedBy && <button class="btn btn-success btn-sm btn-icon-text d-flex float-right"
                                type="submit"
                                onClick={approve}
                                disabled={loading ? true : false}>
                                <i className="ti-save mr-1" title="Submit"></i>
                                <span className="d-none d-md-block">{loading ? "APPROVING" : "APPROVE"}</span>
                            </button>
                            }
                        </div>}
                        <form className="row newReceiptNote mt-5">
                            <div className="form-group col-md-3">
                                <label htmlFor="transactionRef">Transaction Ref</label>
                                <input type="text" className="form-control form-control-sm"
                                    id="transactionRef"
                                    name="transactionRef"
                                    value={journal?.transactionRef}
                                    placeholder="Transaction Ref"
                                    disabled />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="transactionDate">Transaction Date</label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    id="transactionDate"
                                    name="transactionDate"
                                    value={moment(journal?.transactionDate).format("YYYY-MM-DD")}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="narration">Narration</label>
                                <input type="text" className="form-control form-control-sm"
                                    id="narration"
                                    name="narration"
                                    value={journal?.narration}
                                    placeholder="Narration"
                                    disabled />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="journalDescription">Journal Description</label>
                                <input type="text" className="form-control form-control-sm"
                                    id="journalDescription"
                                    name="journalDescription"
                                    placeholder="Journal Description"
                                    value={journal?.journalDescription}
                                    disabled />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="autoGenerated">Auto Generated</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="autoGenerated"
                                        name="autoGenerated"
                                        checked={journal?.autoGenerated === "true"? true:false}
                                        disabled
                                    />
                                    <label className="custom-control-label" htmlFor="autoGenerated"></label>
                                </div>
                            </div>

                        </form>
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
                                                    ACCOUNT CODE
                                                </th>
                                                <th>
                                                    DEBIT
                                                </th>
                                                <th>
                                                    CREDIT
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {journal?.journalsDetails &&
                                                journal?.journalsDetails.map((journal, index) =>
                                                    <tr className="py-0">
                                                        <td >
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {journal.transactionNarration}
                                                        </td>
                                                        <td>
                                                            {journal.accountCode}
                                                        </td>
                                                        <td>
                                                            {formatter2.format(journal.debit)}
                                                        </td>
                                                        <td>
                                                            {formatter2.format(journal.credit)}
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
