import React, { useState } from 'react';


export default function Limit({ setLimit, jj }) {

    const [items] = useState([
        { value: 2 },
        { value: 5 },
        { value: 10 },
        { value: 15 },
        { value: 25 },
        { value: 50 },
        { value: 100 },
    ]);

    const handleOnChange = (e) => {
        setLimit(e.target.value)
        // jj(e.target.value)
    }

    return <>
        <div className="mb-2">
            Show
            <select className="form-control form-control-sm mx-2" style={{ width: "70px", display: "inline-block", height: "30px" }}
                type="number"
                id="limit"
                name="limit"
                defaultValue={15}
                onChange={handleOnChange}
            >
                {items.map(item => (
                    <option
                        key={item.value}
                        value={item.value}
                    >
                        {item.value}
                    </option>
                ))}
            </select>
            entries
        </div>

    </>
}