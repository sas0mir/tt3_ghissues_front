import SearchInput from "../../components/search-input"
import { ChangeEvent, useEffect } from "react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import axios, { AxiosResponse } from "axios"

const IssuesPage = () => {
    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        async function searchUser(name: string) {
            if (name.length > 2) {
                const data: AxiosResponse = await axios.get(`${import.meta.env.VITE_BACK_LOCATION}/api/search_user`, {
                    params: {
                        name: name
                    }
                });
                console.log('Data->', data);
                setData(data.data)
            }
        }
        searchUser(username)
    }, [username])

    return (
        <>
        <search className="m-6 block text-center container mx-auto lg:flex justify-center items-center">
        <SearchInput title="username" handler={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} value={username} />
            <FaSearch />
        <SearchInput title="repository" handler={(e: ChangeEvent<HTMLInputElement>) => setRepo(e.target.value)} value={repo} />
        </search>
        {data.length && data.map(el => <div>{el}</div>)}
        </>
    )
}
export default IssuesPage