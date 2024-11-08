const SearchInput = (props) => {
    const {title, value, handler} = props;
    return (
        <div className="m-2">
            <label className="relative">
                <input required
                    type="text"
                    className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-white"
                    value={value}
                    onChange={handler}
                />
                <span className="absolute left-0 top-0 px-1 text-lg uppercase tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5 peer-valid:rounded-md">
                    {title}
                </span>
            </label>
        </div>
    )
}

export default SearchInput