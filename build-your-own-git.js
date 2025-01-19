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
        let commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
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
            console.log(this.branches[i].name);
            if(this.branches[i].name === branchName){
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
        this.next = next;
        this.message = message;
    }
}

class Branch{
    constructor(name, commit){
        this.name = name;
        this.commit = commit;
    }
}


// let repo = new Git("my-repo");
// repo.commit("testing");
// repo.commit("testing1");
// repo.commit("testing2");
// console.log(repo.log());

// console.log("Git.checkout() test");
// var repo = new Git("test");
// repo.commit("Initial commit");

// console.assert(repo.HEAD.name === "main"); // Should be on master branch.
// repo.checkout("testing");
// console.assert(repo.HEAD.name === "testing"); // Should be on new testing branch.
// repo.checkout("main");
// console.assert(repo.HEAD.name === "main"); // Should be on master branch.
// repo.checkout("testing");
// console.assert(repo.HEAD.name === "testing"); // Should be on testing branch again.

console.log("3. Branches test");

var repo = new Git("test");
repo.commit("Initial commit");
repo.commit("Change 1");

// Maps the array of commits into a string of commit ids.
// For [C2, C1,C3], it returns "2-1-0"
function historyToIdMapper(history) {
  var ids = history.map(function (commit) {
    return commit.id;
  });
  return ids.join("-");
}


// console.log(historyToIdMapper(repo.log()));



console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits.

repo.checkout("testing");
repo.commit("Change 3");
// console.log(historyToIdMapper(repo.log()) + "\n");

console.assert(historyToIdMapper(repo.log()) === "2-1-0"); // Should show 3 commits.

repo.checkout("main");
console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits. Master unpolluted.
// console.log(historyToIdMapper(repo.log()) + "\n");

repo.commit("Change 3");
console.assert(historyToIdMapper(repo.log()) === "3-1-0"); // Continue on master with 4th commit.