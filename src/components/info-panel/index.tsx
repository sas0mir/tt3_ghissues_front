import { IGHRepo, IGHUser } from "../../lib/constants";
import store from "../../store"

const InfoPanel = () => {

    const userInfo: IGHUser | null = store.user;
    const repoInfo: IGHRepo | null = store.repo;

    return (
      <div className="relative block w-auto lg:flex justify-around m-4">
        {userInfo &&
            <div className="flex p-4 align-middle text-center">
                <img src={userInfo.avatar_url} alt="avatar" className="w-8 rounded-full mr-4"/>
                <div className="flex flex-col">
                    <p className="font-mono">{`username ${userInfo.login}`}</p>
                    <p className="font-mono">{`score ${userInfo.score}`}</p>
                </div>
            </div>
        }
        {repoInfo &&
            <div className="flex flex-col p-4 align-middle text-center">
                <p className="font-bold">{`repository ${repoInfo.name}`}</p>
                <p className="font-mono">{`${repoInfo.description}`}</p>
            </div>
        }
      </div>
    )
  }
  
  export default InfoPanel