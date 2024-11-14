import { makeAutoObservable } from "mobx";
import { IGHIssue, IGHRepo, IGHUser } from "./lib/constants";

class Store {
    user: IGHUser | null = null;
    repo: IGHRepo | null = null;
    repos: IGHRepo[] = [];
    issues: IGHIssue[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: IGHUser) {
        this.user = user;
    }

    setRepo(repo: IGHRepo) {
        this.repo = repo;
    }

    setRepos(repos: IGHRepo[]) {
        this.repos = repos;
    }

    setIssues(issues: IGHIssue[]) {
        this.issues = issues;
    }
}

const store = new Store();
export default store;