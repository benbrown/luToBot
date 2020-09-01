# luToBot

Simple generator that takes an LU file as input and generates a Composer-compatible bot project

Each intent in the LU file will become a trigger in the bot project's root dialog with a sample flow.

# build from typescript

```
npm run build
```

# generate a bot project

start the generator by passing in an lu file name and a project name.

for example, this command will create a project named "testProject" based on test.lu file included in the repo.

```
npm start test.lu testProject
```

# open in composer

use bot framework composer to open the resulting bot project
