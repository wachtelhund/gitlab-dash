# TestingSsr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
# Assignment WT1 - OAuth + Consuming REST and GraphQL APIs

In modern web applications, the ability to delegate access between systems is crucial. One widely used standard for access delegation is OAuth (Open Authorization). Although the OAuth flow may appear complex at first glance, it is important to understand the roles and communication of the different stakeholders (client/consumer/service provider) involved.

## The assignment

Your task is to develop a three-legged OAuth2 access delegation system for a server-side rendered web application (the consumer) and GitLab (the service provider). The system should enable users to log in to the consumer application using their gitlab.lnu.se account (#10) and access the following information from GitLab: basic profile information (#11), the 101 most recent GitLab activities (#12), and information about groups, projects and the latest commit.

In particular, the system should allow users to view details about the first three projects in each of their first five groups, including information about the latest commit, provided that they have access to those groups (#13).

Note that you must not use any external packages or modules that have built-in OAuth support (#2).

If you're aiming for a higher grade, it's important you choose a design and structure for your code that makes it easier to develop, test, and maintain over time. (#14)

## Requirements

Please review [all requirements of the application](../../issues/) including (#1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, and #14). Pay special attention to the labels indicating if a requirement is required or optional.

As you implement tasks and add functionality, it is important to create and close issues accordingly.
