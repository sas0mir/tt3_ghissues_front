import SearchInput from "../../components/search-input"
//import { useEffect } from "react"
import { Suspense, useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { IGHIssue, IGHRepo, IGHUser } from "../../lib/constants";
import store from "../../store";
import { observer } from "mobx-react";
import InfoPanel from "../../components/info-panel";
import axios, { AxiosResponse } from "axios";
import Loader from "react-ts-loaders";
import Grid from "../../components/grid";
import { QueryFunctionContext, useQuery, QueryKey } from "react-query";

const IssuesPage = () => {
    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');
    const [userData, setUserData] = useState<IGHUser[]>([]);
    const [repoData, setRepoData] = useState<IGHRepo[]>([]);
    const [issuesData, setIssuesData] = useState<IGHIssue[]>([]);
    const [loadingSelectors, setLoadingSelectors] = useState(false);
    const [loadingGrid, setLoadingGrid] = useState(false);

    const handleUserChange = async (value: string) => {
        if (value.length > 2 && !loadingSelectors) {
            try {
                setLoadingSelectors(true)
                const data: AxiosResponse = await axios.get(`${import.meta.env.VITE_BACK_LOCATION}/app/search_user`, {
                    params: { username: value }
                });
                if(data.data.length) {
                    const users: IGHUser[] = [];
                    data.data.forEach((user: any) => {
                        users.push({
                            score: user.score,
                            name: user.login,
                            id: user.id,
                            avatar_url: user.avatar_url,
                        })
                    })
                    setUserData(users);
                } else {
                    setUserData([]);
                }
                setLoadingSelectors(false);
            } catch(error) {
                console.error("Error fetching user data:", error);
                setUserData([]);
                setLoadingSelectors(false);
            }
        } else {
            setUserData([]);
            setRepo('')
        }
    }

    const searchIssues = async ({querykey: [string, number, number]}): Promise<any[]> => {
        const [, perpage, page] = queryKey;
        if (loadingGrid) return issuesData || []
        try {
            setLoadingGrid(true)
            const data: AxiosResponse = await axios.get(`${import.meta.env.VITE_BACK_LOCATION}/app/search_issues`, {
                params: { 
                    owner: username,
                    repo: repo,
                    perpage,
                    page
                }
            });
            if(data.data.length) {
                const issues: IGHIssue[] = [];
                data.data.forEach((issue: any) => {
                    issues.push({
                        id: issue.id,
                        title: issue.title,
                        body: issue.body,
                        updated_at: issue.updated_at,
                    })
                })
                const newIssues = [...issuesData, ...issues];
                setIssuesData(newIssues);
                store.setIssues(newIssues);
                return newIssues
            } else {
                setIssuesData([]);
                return []
            }
            setLoadingGrid(false);
        } catch(error) {
            console.error("Error fetching issues data:", error);
            setIssuesData([]);
            setLoadingGrid(false);
            return issuesData || []
        } finally {
            setLoadingGrid(false)
        }
    }

    const handleRepoChange = (value: string) => {
        if (value.length > 1) {
            setRepoData(repoData.filter(el => el.name.includes(value)));
        } else {
            setRepoData(store.repos);
        }
    }

    const handleUserSelect = (newValue: IGHUser) => {
        setUsername(newValue.name);
        store.setUser(newValue);
    };

    const handleRepoSelect = (newValue: IGHRepo) => {
        setRepo(newValue.name);
        store.setRepo(newValue);
    };

    useEffect(() => {
        //load repos if user selected
        async function searchRepos() {
            try {
                setLoadingSelectors(true)
                const data: AxiosResponse = await axios.get(`${import.meta.env.VITE_BACK_LOCATION}/app/search_repo`, {
                    params: { username: username }
                });
                if(data.data.length) {
                    const repos: IGHRepo[] = [];
                    data.data.forEach((repo: any) => {
                        repos.push({
                            description: repo.description,
                            has_issues: repo.has_issues,
                            id: repo.id,
                            name: repo.name,
                            score: repo.score,
                        })
                    })
                    setRepoData(repos);
                    store.setRepos(repos);
                } else {
                    setRepoData([]);
                }
                setLoadingSelectors(false);
            } catch(error) {
                console.error("Error fetching repo data:", error);
                setRepoData([]);
                setLoadingSelectors(false);
            }
        }
        if (username) {
            searchRepos();
        }
    }, [username])

    useEffect(() => {
        //load issues if repo selected
        if (repo) {
            searchIssues({queryKey: ['issuesData', 30, 1]});
        }
    }, [repo])

    const InfoPanelObserver = observer(InfoPanel);

    function LazyGrid() {
        const perpage = import.meta.env.VITE_PER_PAGE;
        const { data } = useQuery<any[], [string, number, number]>({queryKey: ['issuesData', perpage, 1]}, searchIssues, { suspense: true });
        return <Grid data={data || []} getData={searchIssues}/>
    }

    return (
        <>
        <search className="m-6 block text-center container mx-auto lg:flex justify-center items-center">
        <SearchInput title="username" onSelect={handleUserSelect} onChange={handleUserChange} data={userData} disabled={loadingSelectors}/>
            {loadingSelectors ? <Loader type="dualring" color="#080808" size={40} /> : <FaSearch size={30}/>}
        <SearchInput title="repository" value={repo} onSelect={handleRepoSelect} onChange={handleRepoChange} data={repoData} disabled={loadingSelectors || !username}/>
        </search>
        <InfoPanelObserver />
        <Suspense fallback={<Loader type="dualring" color="#080808" size={80} className="absolute top-1/2 left-1/2" />}>
            <LazyGrid />
        </Suspense>
        {/* {loadingGrid && <Loader type="dualring" color="#080808" size={100} className="absolute top-1/2 left-1/2" />} */}
        {/* <Grid data={issuesData} getData={searchIssues} /> */}
        </>
    )
}
export default IssuesPage