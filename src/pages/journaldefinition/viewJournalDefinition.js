import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Backbutton from '../../components/backbutton';
import { formatter2 } from '../../utils/formatter';
import { listJournalDef } from '../../utils/listdemodef';

export default function ViewJournalDefinition() {
    const id = useParams()
    const [journal, setJournal] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const response = listJournalDef?.data
        const res = response.find(y => y.id === Number(id.id))
        setJournal(res)
        console.log({ res })
    }, []);

    const approve = () => {

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
                                    placeholder="Journal Description"
                                    value={journal?.transactionRef}
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
                                <label htmlFor="remark">Remark</label>
                                <input type="text" className="form-control form-control-sm"
                                    id="remark"
                                    name="remark"
                                    placeholder="Remark"
                                    value={journal?.remark}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="canAddMoreItems">Can Add More Items</label>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox"
                                        className="custom-control-input"
                                        id="canAddMoreItems"
                                        name="canAddMoreItems"
                                        defaultChecked={journal?.canAddMoreItems}
                                        disabled
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
                                        defaultChecked={journal?.canRemoveMoreItems}
                                        disabled
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
                                        defaultChecked={journal?.autoGenerated}
                                        disabled
                                    />
                                    <label className="custom-control-label" htmlFor="autoGenerated"></label>
                                </div>
                            </div>

                            {journal.autoGenerated && <div className="form-group col-md-3">
                                <label htmlFor="dateOfMonth">Date of Month</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="dateOfMonth"
                                    name="dateOfMonth"
                                    placeholder="Date of Month"
                                    value={journal?.dateOfMonth}
                                    disabled
                                />
                            </div>}

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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {journal?.journalDefinitionDetails &&
                                                journal?.journalDefinitionDetails.map((journal, index) =>
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
