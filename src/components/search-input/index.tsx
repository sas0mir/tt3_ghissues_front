import { useState, ChangeEvent, useEffect } from "react";
import { IInputProps } from "../../lib/constants";

const SearchInput = (props: IInputProps) => {

    const [showSelector, setShowSelector] = useState(false);
    const [forcedValue, setForcedValue] = useState('');

    const {
        title,
        value,
        onChange,
        onSelect,
        data,
        controlled,
        disabled
    } = props;

    useEffect(() => {
        if (data.length) setShowSelector(true)
    }, [data])

    return (
        <div className="m-2">
            <label className="relative">
                <input required
                    type="text"
                    className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-white"
                    value={forcedValue || value}
                    disabled={disabled}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value);
                        if (!e.target.value) setShowSelector(false)
                    }}
                />
                <span className="absolute left-0 top-0 px-1 text-lg uppercase tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5 peer-valid:rounded-md">
                    {title}
                </span>
            </label>
            {showSelector && (
                <div className="absolute z-10 w-auto bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (controlled) {
                                    //pass value from within
                                    //setForcedValue(item.name);
                                }
                                setForcedValue(item.name);
                                onSelect(item);
                                setShowSelector(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchInput