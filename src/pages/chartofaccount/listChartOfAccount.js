import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import Paginate from '../../components/paginate';
import Limit from '../../components/limit';
import { accounts } from '../../utils/chartofaccountdemodata';
import { formatter1 } from '../../utils/formatter';
import dbData from '../../accdb';

export default function ListChartOfAccount() {

    const [chartOfAccount, setChartOfAccount] = useState([]);
    const [firstChart, setFirstChart] = useState();
    const [headerChild, setHeaderChild] = useState([]);
    const [accheaderChild, setAccheaderChild] = useState([]);
    const [accheaderChild1, setAccheaderChild1] = useState();
    const [pageCount, setPageCount] = useState(0);
    const page = 1;
    const [limit, setLimit] = useState(15);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const response = dbData.getchatofaccountbyIsHeaderandHeadacc(setFirstChart);
        dbData.getchatofaccountbyIsHeaderandHeadacc(callback);
        function callback(r) {
            setChartOfAccount(Object.values(r))
        }
    }, []);

    const filterChartAccount = (headaccount) => {
        const headChild = chartOfAccount?.filter(x => x.isHeaderAccount && x.headerAccount === headaccount);
        const accheadChild = chartOfAccount?.filter(x => !x.isHeaderAccount && x.headerAccount === headaccount);
        setHeaderChild(headChild)
        setAccheaderChild(accheadChild)
        console.log({ headChild })
        console.log({ accheadChild })
    }

    const deleteChartOfAccount = (id) => {
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
    const getAccountChildren = (code) => {
         dbData.getchatofaccountbycode(code, callback);
        function callback(r) {
            console.log({r})
            setAccheaderChild(Object.values(r))
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
                                    <span className="card-title text-uppercase">CHART OF ACCOUNT</span>
                                </div>
                                {<div className="row d-flex float-right">
                                    <Link to='/createchartofaccount'>
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
                                            <input type="text" className="form-control form-control-sm" placeholder="Search Chart of Account" aria-label="Recipient's username"
                                            // onChange={e => searchAdj(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className="accordion" id="accordionExample">
                                    {chartOfAccount && chartOfAccount?.length > 0 && chartOfAccount?.map((header, index) =>
                                        <div className="card">
                                            <div className="card-header">
                                                <h2 className="mb-0">
                                                    <button onClick={() => getAccountChildren(header.accountCode)} className="btn btn-block text-left" data-toggle="collapse" href={`#${header.accountName}`} >
                                                        {header.accountName}
                                                    </button>
                                                </h2>
                                            </div>
                                            {/* <div id={header.accountName} className="card-header collapse"> */}

                                                {accheaderChild && accheaderChild?.length > 0 && accheaderChild[0].headerAccountCode === header.accountCode && accheaderChild?.map((acc, index) =>
                                                    <div id={header.accountName} className="card-header collapse">
                                                        {
                                                            acc.isHeader === "true" ?
                                                                <h2 className="mb-0">
                                                                    <button onClick={() => getAccountChildren(acc.accountCode)} className="btn btn-block text-left" >
                                                                        {acc.accountName}
                                                                    </button>
                                                                </h2>
                                                                :
                                                                <div className="card-body">
                                                                    {acc.accountName}
                                                                </div>
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        // </div>
                                    )}
                                </div>
                                {/* <div class="accordion" id="accordionExample">
                                    {headerAccount && headerAccount?.length > 0 && headerAccount?.map((header, index) =>
                                        <div class="card">
                                            <div class="card-header py-2" id={`heading${header.accountName}`}>
                                                <h2 class="mb-0">
                                                    <button class="btn btn-link btn-block text-left d-flex justify-content-between"
                                                        onClick={() => filterChartAccount(header.accountCode)}
                                                        type="button" data-toggle="collapse" data-target={`#collapse${header.accountName}`} aria-expanded="true" aria-controls={`collapse${header.accountName}`}>
                                                        <span className="text-capitalize">{header.accountName} ({header.accountCode})</span>
                                                        <span className="text-capitalize">&#8358; {formatter1.format(header.balance)}</span>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div id={`collapse${header.accountName}`} class="collapse" aria-labelledby={`heading${header.accountName}`} data-parent="#accordionExample">
                                                <div class="card-body">
                                                    {headerChild?.length > 0 && <div class="accordion" id="accordionChild">
                                                        {headerChild && headerChild?.length > 0 && headerChild?.map((header, index) =>
                                                            <div class="card">
                                                                <div class="card-header py-2" id={`heading${header.accountName}`}>
                                                                    <h2 class="mb-0">
                                                                        <button class="btn btn-link btn-block text-left d-flex justify-content-between"
                                                                            onClick={() => filterChartAccount(header.accountCode)}
                                                                            type="button" data-toggle="collapse" data-target={`#collapse${header.accountName}`} aria-expanded="true" aria-controls={`collapse${header.accountName}`}>
                                                                            <span className="text-capitalize">{header.accountName} ({header.accountCode})</span>
                                                                            <span className="text-capitalize">&#8358; {formatter1.format(header.balance)}</span>
                                                                        </button>
                                                                    </h2>
                                                                </div>

                                                                <div id={`collapse${header.accountName}`} class="collapse" aria-labelledby={`heading${header.accountName}`} data-parent="#accordionChild">
                                                                    <div class="card-body">
                                                                        <h1>headerChild</h1>
                                                                        {accheaderChild?.length > 0 && <div className="table-responsive">
                                                                            <table className="table table-striped">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>ACTION</th>
                                                                                        <th>S/N</th>
                                                                                        <th className="text-left">CREATED ON</th>
                                                                                        <th className="text-left">ACCOUNT CODE</th>
                                                                                        <th className="text-left">ACCOUNT NAME</th>
                                                                                        <th className="text-left">ACCOUNT TYPE</th>
                                                                                        <th className="text-right">BALANCE</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {accheaderChild && accheaderChild?.length > 0 && accheaderChild?.map((detail, index) =>

                                                                                        <tr className="text-uppercase" key={detail.id}>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-center">
                                                                                                    <Link to={`/viewchartOfAccount/${detail.id}`}><i className="ti-eye btn-icon-append text-primary" title="view" /></Link>
                                                                                                    {!detail?.approvedBy && <>
                                                                                                        <Link to={`/editchartOfAccount/${detail.id}`}><i className="ti-pencil btn-icon-append text-success mx-2" title="Edit" /></Link>
                                                                                                        <i className="ti-trash btn-icon-append text-danger" onClick={() => deleteChartOfAccount(detail?.id)} title="Delete" />
                                                                                                    </>}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                {index + 1}
                                                                                            </td>
                                                                                            <td className="text-left">
                                                                                                <span> {moment(detail?.createdOn).format('MMM D, YYYY')}</span>
                                                                                            </td>
                                                                                            <td className="text-left">
                                                                                                <span>{detail?.accountCode}</span>
                                                                                            </td>
                                                                                            <td className="text-left">
                                                                                                <span>{detail?.accountName}</span>
                                                                                            </td>
                                                                                            <td className="text-left">
                                                                                                <span>{detail?.accountType}</span>
                                                                                            </td>
                                                                                            <td className="text-right">
                                                                                                <span>&#8358; {formatter1.format(detail?.balance)}</span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>}

                                                    {accheaderChild?.length > 0 && <div className="table-responsive">
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th>ACTION</th>
                                                                    <th>S/N</th>
                                                                    <th className="text-left">CREATED ON</th>
                                                                    <th className="text-left">ACCOUNT CODE</th>
                                                                    <th className="text-left">ACCOUNT NAME</th>
                                                                    <th className="text-left">ACCOUNT TYPE</th>
                                                                    <th className="text-right">BALANCE</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {accheaderChild && accheaderChild?.length > 0 && accheaderChild?.map((detail, index) =>

                                                                    <tr className="text-uppercase" key={detail.id}>
                                                                        <td>
                                                                            <div className="d-flex justify-content-center">
                                                                                <Link to={`/viewchartOfAccount/${detail.id}`}><i className="ti-eye btn-icon-append text-primary" title="view" /></Link>
                                                                                {!detail?.approvedBy && <>
                                                                                    <Link to={`/editchartOfAccount/${detail.id}`}><i className="ti-pencil btn-icon-append text-success mx-2" title="Edit" /></Link>
                                                                                    <i className="ti-trash btn-icon-append text-danger" onClick={() => deleteChartOfAccount(detail?.id)} title="Delete" />
                                                                                </>}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            {index + 1}
                                                                        </td>
                                                                        <td className="text-left">
                                                                            <span> {moment(detail?.createdOn).format('MMM D, YYYY')}</span>
                                                                        </td>
                                                                        <td className="text-left">
                                                                            <span>{detail?.accountCode}</span>
                                                                        </td>
                                                                        <td className="text-left">
                                                                            <span>{detail?.accountName}</span>
                                                                        </td>
                                                                        <td className="text-left">
                                                                            <span>{detail?.accountType}</span>
                                                                        </td>
                                                                        <td className="text-right">
                                                                            <span>&#8358; {formatter1.format(detail?.balance)}</span>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    )}


                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ACTION</th>
                                                <th>S/N</th>
                                                <th className="text-left">CREATED ON</th>
                                                <th className="text-left">ACCOUNT CODE</th>
                                                <th className="text-left">ACCOUNT NAME</th>
                                                <th className="text-left">ACCOUNT TYPE</th>
                                                <th className="text-right">BALANCE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chartOfAccount && chartOfAccount?.length > 0 && chartOfAccount?.map((detail, index) =>

                                                <tr className="text-uppercase" key={detail.id}>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Link to={`/viewchartOfAccount/${detail.id}`}><i className="ti-eye btn-icon-append text-primary" title="view" /></Link>
                                                            {!detail?.approvedBy && <>
                                                                <Link to={`/editchartOfAccount/${detail.id}`}><i className="ti-pencil btn-icon-append text-success mx-2" title="Edit" /></Link>
                                                                <i className="ti-trash btn-icon-append text-danger" onClick={() => deleteChartOfAccount(detail?.id)} title="Delete" />
                                                            </>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-left">
                                                        <span> {moment(detail?.createdOn).format('MMM D, YYYY')}</span>
                                                    </td>
                                                    <td className="text-left">
                                                        <span>{detail?.accountCode}</span>
                                                    </td>
                                                    <td className="text-left">
                                                        <span>{detail?.accountName}</span>
                                                    </td>
                                                    <td className="text-left">
                                                        <span>{detail?.accountType}</span>
                                                    </td>
                                                    <td className="text-right">
                                                        <span>&#8358; {formatter1.format(detail?.balance)}</span>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
