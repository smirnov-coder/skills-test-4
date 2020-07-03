# skills-test-4

## Description

Test task for applicants for the position of "Full Stack Developer .NET, C#, JavaScript".

Technologies and libraries used in the development:

- Backend
  - ASP.NET Core 3.1
  - MongoDB

- Frontend
  - Vue.js
  - Bootstrap 4.5

## Launch

The solution is based on ```vue-cli```. Unfortunately, Microsoft does not yet support ```Vue``` development out of the box, so you need to work with ```vue-cli``` manually.

First of all, you need to restore all JavaScript dependencies. To do this, go to the ```<solution folder>/SkillsTest/ClientApp``` folder and run the ```npm install``` or ```yarn install``` command.

After all dependencies are downloaded, you must manually start the ```Vue``` development server. To do this, in the same folder ```<solution folder>/SkillsTest/ClientApp```, run the ```npm run serve``` or ```yarn serve``` command.

Now you can run the backend project. I prefer to use ```Kestrel``` server, it is already configured for ```http://localhost:5000``` (```vue-cli``` has some problems with ```https```).

P.S. I apologize for my poor English.