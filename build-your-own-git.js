class Git{
    constructor(name){
        this.name = name; // Repo name.
        this.lastCommitId = -1; // Keep track of last commit id.
        this.HEAD = null; // Reference to last Commit.
    }

    commit = (message) => {
        let commit = new Commit(++this.lastCommitId, this.HEAD, message);
        this.HEAD = commit;
        return commit;
    }

    log = () => {
        let history = []; // array of commits in reverse order.
        let commit = this.HEAD;
        while(commit != null){
            history.push(commit);
            commit = commit.next;
        }
        return history;
    }
}

class Commit{
    constructor(id, next, message){
        this.id = id;
        this.message = message;
        this.next = next;
    }
}

let repo = new Git("my-repo");
repo.commit("testing");
repo.commit("testing1");
repo.commit("testing2");
console.log(repo.log());

