import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import api from '../utils/api';


export default function Paginate({ pageCount, apiToCall, setData,doctype, limit, loc, bus, proCategory, proManufacturer, proGenre, sortBy, setPage, sortBy1 }) {


    const handlePageClick = async (selectedPage) => {
        let currentPage = selectedPage.selected + 1;
        if (sortBy) {
            if (window.location.pathname === "/placeorder") {
                const { data: { data } } = await (apiToCall(currentPage, limit, loc, bus, "", proCategory, proManufacturer, proGenre, sortBy));
                setData(data);
                window.scrollTo(0, 0)

            } else {
                if (window.location.pathname === "/addProduct") {
                    setPage(currentPage)
                }
                const { data: { data } } = await apiToCall(currentPage, limit, "", proCategory, proManufacturer, proGenre, sortBy);
                setData(data);
                window.scrollTo(0, 0)
            }

        } else if (window.location.pathname === "/admin/businesslist") {
            const { data: { data } } = await apiToCall(currentPage, limit, "", sortBy1);
            setData(data);
            window.scrollTo(0, 0)
        }else if(doctype){
            const { data: { data } } = await apiToCall(currentPage, limit, "", doctype);
            setData(data);
            window.scrollTo(0, 0)

        }
        else {
            const { data: { data } } = await apiToCall(currentPage, limit, "", loc || null, bus || null);
            setData(data);
            window.scrollTo(0, 0)
        }
    };

    return <>

        <div className='row '>
            <div className="mx-auto">
                <nav aria-label="Page navigation example" style={{ zIndex: "auto" }}>
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </nav >
            </div >
        </div >
    </>
}