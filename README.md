# Displaying users and their vehicles

To install the project you need run

`npm install`

And then, to build just typing

`npm run build:prod`

And for development

`npm run server:dev`

####Problems with deployment was connected with Angular/material module, that depended on angular 2.* but now it depends on angular 4.*
####For migration to Angular 4.* you should just typing:
iOS/Linux

`npm install @angular/{animations,common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router}@4.0.0 typescript@latest --save`

Windows

`npm i @angular/common@next @angular/compiler@next @angular/core@next @angular/forms@next @angular/http@next @angular/platform-browser@next @angular/platform-browser-dynamic@next @angular/platform-server@next @angular/router@next typescript@latest --S -E`
 
`npm i @angular/compiler-cli@next --D -E`
