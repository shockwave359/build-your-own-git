class Git{
    constructor(name){
        this.name = name; // Repo name.
        this.lastCommitId = -1; // Keep track of last commit id.
        let main = new Branch("main", null); // Null is passed as we don't have any commits yet.
        this.HEAD = main; // Reference to last Commit.
        this.branches = []; // List to keep track of all branches.
        this.branches.push(main); // Initially only contains main.
    }

    commit = (message) => {
        let commit = new Commit(++this.lastCommitId, this.HEAD, message);
        this.HEAD.commit = commit; // Update the current branch pointer to a new commit.
        return commit;
    }

    log = () => {
        let history = []; // array of commits in reverse order.
        let commit = this.HEAD.commit; // Start from HEAD commit.
        while(commit != null){
            history.push(commit);
            commit = commit.next;
        }
        return history;
    }

    checkout = (branchName) => {
        for(let i = this.branches.length - 1; i >= 0; --i){
            if(this.branches[i] === branchName){
                console.log("Switched to existing branch: " + branchName);
                this.HEAD = this.branches[i];
                return this; // Returns the Git object instance on which the method is currently being called.
            }
        }

        // When no matching branches are found, create a new branch with branchName
        let branch = new Branch(branchName, this.HEAD.commit);
        this.branches.push(branch);
        this.HEAD = branch;
        console.log("Switched to new branch: " + branchName);
        return this;
    }
}

class Commit{
    constructor(id, next, message){
        this.id = id;
        this.message = message;
        this.next = next;
    }
}

class Branch{
    constructor(name, commit){
        this.name = name;
        this.commit = commit;
    }
}


let repo = new Git("my-repo");
repo.commit("testing");
repo.commit("testing1");
repo.commit("testing2");
console.log(repo.log());

