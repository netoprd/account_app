import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import Limit from '../../components/limit';
import dbData from '../../accdb';

function JournalList() {
    const [journal, setJournal] = useState([]);
    const [deletel, setDeletel] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const page = 1;
    const [limit, setLimit] = useState(15);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const response = dbData.getalljuornal(callback)
        function callback(r) {
            console.log({ r })
            if (r?.result?.length > 0) {
                setJournal(r.result)
            } else {
                setJournal([])
            }

        }
    }, []);
    console.log({ journal })

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
                    const result = dbData.deletejournal(id, setDeletel);

                    const res = dbData.getalljuornal(callback)
                    function callback(r) {
                        console.log({ r })
                        if (r?.result?.length > 0) {
                            setJournal(r.result)
                        } else {
                            setJournal([])
                        }

                    }
                    // alert(deletel.message)//remove all alert and add toaster:  NOTE DUE TO THE NATURE OF THE DB THE SUCCESS ALERT MIGHT COME SEVERAL TIMES. PLEASE HANDLE THE ISSUE OR LET ME KNOW IF YOU CANT
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
                                    <Link to='/createjournal'>
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
                                                <th>NARRATION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {journal && journal?.length > 0 && journal?.map((detail, index) =>

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
                                                            <Link to={`/viewjournal/${detail.guid}`}><i className="ti-eye btn-icon-append text-primary" title="view" /></Link>
                                                            {!detail?.approvedBy && <>
                                                                <Link to={`/editjournal/${detail.guid}`}><i className="ti-pencil btn-icon-append text-success" title="Edit" /></Link>
                                                                {/* <Link to={`/stockreceiptview/${detail?.id}`}><i className="ti-trash btn-icon-append text-danger" title="Delete" /></Link> */}
                                                                <i className="ti-trash btn-icon-append text-danger" onClick={() => deleteJournal(detail?.guid)} title="Delete" />
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
                                                        <span>{detail?.narration}</span>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    journal?.length === 0 &&
                                    <div className='row'>
                                        <strong className='mx-auto mt-5 h3'>No Journal Record</strong>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalList