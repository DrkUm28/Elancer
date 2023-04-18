# Front End Desarrollo Web ULACIT

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Docker deployment

Update `API_URL` & `API_HOST` from `docker-compose.yml:7 - 26` to the correct host `localhost` or the `server ip address`.

Troubleshooting:
- In case that the frontend image was build using one specific host and then you change it, this will require a new build.

## Git Basics

- git branch  |  lista de branches
- git checkout <branch>   |  cambiamos de branch
- git checkout -b "nuevo_branch" | Creo mi nuevo branch
- git status   | Reviso el stado de mi working tree
- git add .   | Agrego los cambios realizados en mi branch
- git commit -m "Commit"   | Creo el snapshot con el commit
- git push | Subo los cambios a remote, en caso de que le salga en mensaje del upstream solo copian el comando.
-  En github hago el pull request, y si no tiene conflictos hago `Merge`, opcionalmente puedo solicituar que revisen mi codido con la pestaña de reviewers (recuerden eliminar el branch cuando se mergea).
- git checkout develop | vuelvo al branch de origen
- git pull | actualizo los nuevos cambios
- git branch -D <branch> | Elimino de manera local mi branch.
