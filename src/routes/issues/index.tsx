import SearchInput from "../../components/search-input"
import { useEffect } from "react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"

const IssuesPage = () => {
    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');

    const searchUserApi: string = `${import.meta.env.VITE_BACK_LOCATION}/app/search_user`;
    const searchRepoApi: string = `${import.meta.env.VITE_BACK_LOCATION}/app/search_repo`;

    useEffect(() => {
    }, [username])

    return (
        <>
        <search className="m-6 block text-center container mx-auto lg:flex justify-center items-center">
        <SearchInput title="username" api={searchUserApi} param="username" value={username} minlength={2} />
            <FaSearch />
        <SearchInput title="repository" api={searchRepoApi} param="repo" value={repo} minlength={1} />
        </search>
        </>
    )
}
export default IssuesPage