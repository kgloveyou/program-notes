# Git Flow
## Git 在团队中的最佳实践--如何正确使用Git Flow

https://www.cnblogs.com/wish123/p/9785101.html

## A successful Git branching model

https://nvie.com/posts/a-successful-git-branching-model/

### The main branches 

The central repo holds two main branches with an infinite lifetime:

- `master`
- `develop`

We consider `origin/master` to be the main branch where the source code of `HEAD` always reflects a *production-ready* state.

We consider `origin/develop` to be the main branch where the source code of `HEAD` always reflects a state with the latest delivered development changes for the next release. Some would call this the “integration branch”. This is where any automatic nightly builds are built from.

### Supporting branches

Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

The different types of branches we may use are:

- Feature branches
- Release branches
- Hotfix branches

#### Feature branches

May branch off from:

```
develop
```

Must merge back into:

```
develop
```

Branch naming convention:

anything except `master`, `develop`, `release-*`, or `hotfix-*`

**Creating a feature branch**

When starting work on a new feature, branch off from the `develop` branch.

```bash
$ git checkout -b myfeature develop
Switched to a new branch "myfeature"
```

**Incorporating a finished feature on develop**

Finished features may be merged into the `develop` branch to definitely add them to the upcoming release:

```bash
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)
$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).
$ git push origin develop
```

The `--no-ff` flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward.

<img src="https://nvie.com/img/merge-without-ff@2x.png" alt="https://nvie.com/img/merge-without-ff@2x.png" style="zoom:50%;" />

#### Release branches

May branch off from:

```
develop
```

Must merge back into:

```
develop` and `master
```

Branch naming convention:

```
release-*
```

The key moment to branch off a new release branch from `develop` is when develop (almost) reflects the desired state of the new release. 

##### Creating a release branch

