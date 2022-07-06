import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import moment from 'moment';
import Swal from 'sweetalert2';
import Paginate from '../../components/paginate';
import Limit from '../../components/limit';
import {transactions} from '../../utils/transaction-mockdata'

export default function ListTransactions() {
    

    const [transaction, settransaction] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const page = 1;
    const [limit, setLimit] = useState(15);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const response = transactions;
        const count = response.totalCount;
        setPageCount(Math.ceil(count / limit));
       settransaction(response?.data)
    }, []);

    const deleteTransactions = (id) => {
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
                   
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return <>
            <div className="content-wrapper mt-5">
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-center page-head">
                                    <span className="card-title">PRODUCT</span>
                                </div>
                                {<div className="mt-1 d-flex float-right align-item-center">
                                    <Link to={'/createtransaction'}>
                                        <button class="btn btn-primary btn-sm btn-icon-text text-white d-flex mx-1">
                                            <i className="ti-plus mr-1" title="Back"></i>
                                            <span className="d-none d-md-block">CREATE TRANSACTIONS</span>
                                        </button>
                                    </Link>
                                </div>}
                                <form className="mt-3">
                                 
                                    {/* <span className="font-weight-bold">TOTAL: </span><span>{total}</span> */}
                                    <div className="form-group col-md-6 mx-auto mt-3">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search Product" aria-label="Recipient's username" />
                                        </div>
                                    </div>
                                </form>

                              
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>
                                                    ACTIONS
                                                </th>
                                                <th>
                                                    S/N
                                                </th>
                                                <th>
                                                    TRANSACTION REF
                                                </th>
                                                <th>
                                                   TRANSACTION DATE
                                                </th>
                                                <th>
                                                   SOURCE
                                                </th>
                                                <th>
                                                    NARRATION
                                                </th>                                               
                                               
                                              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transaction.map((trans,index)=>
                                                    <tr>
                                                        <td>
                                                           <Link to={`/viewtransactions/${trans.id}`}><i className="ti-eye btn-icon-append text-primary" style={{Cursor:"pointer"}} title="View" /></Link>  
                                                               <i className="ti-trash btn-icon-append text-danger" onClick={()=>deleteTransactions(trans.id)}   style={{Cursor:"pointer"}} title="Delete" />
                                                        </td>
                                                        <td key={index} >
                                                           {index+1}
                                                        </td>
                                                        <td>
                                                            <span className="text-capitalize"> {trans.transactionRef}</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-capitalize">  {moment(trans.transactionDate).format('MMM D, YYYY')}</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-capitalize">{trans.source}  </span>
                                                        </td>
                                                        <td>
                                                            <span className="text-capitalize">{trans.narration}</span>
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
}