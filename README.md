# STX
First of all, thanks for the assignment. I enjoyed working with vue. 
In this readme you can find some information explaining the choices, how to run the project and the live example.
The order saving API mock randomly fails. So if the first time the calls fails, try it again.

## Live
There is a working example running on: [Working example](https://musing-bhaskara-2fad7e.netlify.app). It's running on netlify. There is also a link in the about in this repo.

## Choices

### vue class component
I decided to go for the class components of vue. Most of the time I find classes more readable.

I did some reading on the vue class component later in the project and found out they are maybe gonna drop it in the new version. The information was not really clear. But for that reason, I would actually not use it until it its clear. Even tho the project is maintained by the core team.

### Split veux in modules
Seems like an easy choice. Now every module has its own file. If the project would get bigger I would split the file up in getters.ts, setters.ts, etc..

### Did not finish the items
I had the feeling that al lot of the mechanics where already shown in the previous parts. So instead of doing that, I did some of the bonus tasks:
- save & finalize
- show an error when the failed request

### Other
Did not do much with the linter. The settings are not how I prefer it. But this is how I came with the CLI. I would probably set up a linting repo so it's reusable company-wide.

Iv put in tailwindcss. Just to show how it would work. Did not configure anything for it except the postcss.config.js.

For testing, I have added two unit tests. One for the button(non class) and one for the inputDate(class). This is just to show that I'm capable of.


## Project setup
```
npm install
```

### Compiles and hot-reloads
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Unit tests
```
npm run test:unit
```