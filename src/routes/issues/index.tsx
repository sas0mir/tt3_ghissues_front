import SearchInput from "../../components/search-input"
//import { useEffect } from "react"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { IGHRepo, IGHUser } from "../../lib/constants";
import store from "../../store";
import { observer } from "mobx-react";
import InfoPanel from "../../components/info-panel";
import axios, { AxiosResponse } from "axios";

const IssuesPage = () => {
    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');
    const [userData, setUserData] = useState([]);
    const [repoData, setRepoData] = useState([]);

    const searchUserApi: string = `${import.meta.env.VITE_BACK_LOCATION}/app/search_user`;
    const searchRepoApi: string = `${import.meta.env.VITE_BACK_LOCATION}/app/search_repo`;

    const search = async (value: string, ) => {
        if (searchText.length > minlength && value !== searchText) {
            try {
                const params: {[key: string]: string} = {};
                param.map(p => {
                    if(p.forQueryString) params[p.name] = searchText;
                    else params[p.name] = p.value;
                })
                const data: AxiosResponse = await axios.get(api, {
                    params
                });
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

    const handleUserChange = (value: string) => {
        search(value)
    }

    const handleRepoChange = (value: string) => {
        search(value)
    }

    const handleUserSelect = (newValue: IGHUser) => {
        setUsername(newValue.login);
        store.setUser(newValue);
    };

    const handleRepoSelect = (newValue: IGHRepo) => {
        setRepo(newValue.name);
        store.setRepo(newValue);
    };

    useEffect(() => {
        console.log('STORE->', store, username, repo);
    }, [repo, username, store])

    const InfoPanelObserver = observer(InfoPanel);

    return (
        <>
        <search className="m-6 block text-center container mx-auto lg:flex justify-center items-center">
        <SearchInput title="username" value={username} onSelect={handleUserSelect} onChange={handleUserChange} data={userData}/>
            <FaSearch />
        <SearchInput title="repository" value={repo} onSelect={handleRepoSelect} onChange={handleRepoChange} data={repoData}/>
        </search>
        <InfoPanelObserver />
        </>
    )
}
export default IssuesPage