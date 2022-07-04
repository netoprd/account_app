import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Backbutton() {

    const history = useNavigate();
    const goToPreviousPath = () => {
        history(-1)
    }

    return <>
        <button class="btn btn-dark btn-sm btn-icon-text text-white d-flex mx-1" onClick={goToPreviousPath}>
            <i className="ti-arrow-left mr-1" title="Back"></i>
            <span className="d-none d-md-block">BACK</span>
        </button>
    </>;
}
