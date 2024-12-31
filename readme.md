# Boilerpalte

## Frequently-used commands:

- docker-compose down --volumes --remove-orphans --rmi all
- docker-compose up --build app-dev
- docker-compose up --build app-prod
- docker-compose build --no-cache app-dev

## Getting Started

Getting started is a simple as cloning the repository

```
git clone git@github.com:rupeq/react-boilerplate.git
```

Changing into the new directory

```
cd react-boilerplate
```

Removing the .git folder (and any additional files, folders or dependencies you may not need)

```
rm -rf .git
```

Installing dependencies

```
pnpm install
```

And running the setup script (initializes git repository and husky and installs playwright)

```
pnpm run setup
```

Congrats! You're ready to starting working on that new project!

If you'd rather run the commands above in one go, check out the command below:

```
git clone git@github.com:rupeq/react-boilerplate.git &&\
cd react-boilerplate &&\
rm -rf .git &&\
pnpm install &&\
pnpm run setup
```

**Note**: This project comes with 3 git hooks added by [husky](https://typicode.github.io/husky/). A prepare-commit-msg hook to run the [Commitizen](https://github.com/commitizen/cz-cli#readme) cli for those nice commit messages and a commit-msg hook to run [Commitlint](https://commitlint.js.org/#/) on the message itself. Commitlint will ensure the commit message follows the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) (it will if you used commitizen).

If you wish to remove any hooks, simply delete the corresponding file in the .husky directory.
