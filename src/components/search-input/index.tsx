import { useState, ChangeEvent, useEffect } from "react";
import { IGHUser, IInputProps } from "../../lib/constants";
import axios, { AxiosResponse } from "axios"

const SearchInput = (props: IInputProps) => {

    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
    const {
        title,//field name
        api,//axios query url
        param,//axios query param
        minlength = 3//minimum symbols to start search
    } = props;

    useEffect(() => {
        const search = async () => {
            if (searchText.length > minlength) {
                try {
                    const data: AxiosResponse = await axios.get(api, {
                        params: {
                            [param]: searchText
                        }
                    });
                    console.log('Data->', data);
                    if(data.data.length) {
                        setData(data.data)
                        setShowSelector(true)
                    } else {
                        setData([])
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setData([]);
                    setShowSelector(false);
                }
            } else setShowSelector(false)
        }
        search();
    }, [searchText, api, param, minlength])

    const handleSelect = (selectedValue: IGHUser) => {
        setSearchText(selectedValue.login);
        setShowSelector(false);
        props.value = selectedValue;
    };

    return (
        <div className="m-2">
            <label className="relative">
                <input required
                    type="text"
                    className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-white"
                    value={searchText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                />
                <span className="absolute left-0 top-0 px-1 text-lg uppercase tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5 peer-valid:rounded-md">
                    {title}
                </span>
            </label>
            {showSelector && data.length > 0 && (
                <div className="absolute z-10 w-auto bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {data.map((item: IGHUser, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
                        >
                            {item.login}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchInput