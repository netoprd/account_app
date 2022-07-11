import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import dbData from '../../accdb';
import Limit from '../../components/limit'
import { listJournalDef } from '../../utils/listdemodef';

export default function ListJournalDefination() {
    const [journal, setJournal] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const page = 1;
    const [limit, setLimit] = useState(15);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const response = dbData.getalljuornaldiscription(setJournal)
        // const response = listJournalDef
        // console.log(response?.data)
        // const count = response.totalCount;
        // setPageCount(Math.ceil(count / limit));
        // setJournal(response?.data)
    }, []);
console.log({journal})
    const deleteJournal = (id) => {
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
                    // const result = await api.StockAdjustment.delete(id);
                    // // notifySuccess(result.sucessMessage)
                    // if (result.sucessMessage) {
                    //     const response = await api.StockAdjustment.load(page, limit, "", documentType)
                    //     console.log(response?.data)
                    //     const count = response.data.totalCount;
                    //     setPageCount(Math.ceil(count / limit));
                    //     setBalanceAdj(response?.data?.data);
                    // }
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

  return (
    <>
                <div className="content-wrapper mt-5">
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-center page-head">
                                    <span className="card-title text-uppercase">JOURNAL LIST</span>
                                </div>
                                {<div className="row d-flex float-right">
                                    <Link to='/journaldefinition'>
                                        <button class=" mt-2 btn btn-primary btn-sm btn-icon-text text-white d-flex mx-1">
                                            <i className="ti-plus mr-1" title="Back"></i>
                                            <span className="d-none d-md-block">CREATE</span>
                                        </button>
                                    </Link>
                                </div>}
                                <div>
                                    <Limit setLimit={setLimit} />
                                </div>
                                <form className="mt-3">
                                    <div className="form-group col-md-6 mx-auto mt-3">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-sm" placeholder="Search Journal" aria-label="Recipient's username" 
                                            // onChange={e => searchAdj(e.target.value)}
                                             />
                                        </div>
                                    </div>
                                </form>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>STATUS</th>
                                                <th>ACTION</th>
                                                <th>S/N</th>
                                                <th>TRANSACTION REF</th>
                                                <th>TRANSACTION DATE</th>
                                                <th>CREATED BY</th>
                                                <th>REMARK</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(journal)?.map((detail, index) =>

                                                <tr className="text-uppercase" key={detail.id}>
                                                    <td>
                                                        {!detail?.approvedBy ?
                                                            <span class="badge bg-warning text-white p-2 font-weight-bold" >
                                                                Pending
                                                            </span>
                                                            :
                                                            <span class="badge bg-success text-white p-2 font-weight-bold" >
                                                                Approved
                                                            </span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-between">
                                                            <Link to={`/viewjournaldef/${detail.journalguid}`}><i className="ti-eye btn-icon-append text-primary" title="view" /></Link>
                                                            {!detail?.approvedBy && <>
                                                                <Link to={`/editjournaldef/${detail.journalguid}`}><i className="ti-pencil btn-icon-append text-success" title="Edit" /></Link>
                                                                {/* <Link to={`/stockreceiptview/${detail?.id}`}><i className="ti-trash btn-icon-append text-danger" title="Delete" /></Link> */}
                                                                <i className="ti-trash btn-icon-append text-danger" onClick={() => deleteJournal(detail?.id)} title="Delete" />
                                                            </>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <span>{detail?.transactionRef}</span>
                                                    </td>
                                                    <td>
                                                        <span> {moment(detail?.transactionDate).format('MMM D, YYYY')}</span>
                                                    </td>
                                                    <td>
                                                        <span>{detail?.createdBy}</span>
                                                    </td>
                                                    <td>
                                                        <span>{detail?.remark}</span>
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
