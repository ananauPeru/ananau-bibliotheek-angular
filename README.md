# Añañau library system - frontend

This Angular application serves as an online libary management tool for [Añañau](https://ananau.org/), a nonprofit organization based in Peru. Users can register and afterwards log in with a personal account to get access to the application, search through the different items already present in the library, add items themselves and scan items using a QR code as to borrow or return them. The application also provides every user with a personal overview of his or her 'items in possession' and borrow history.

## Getting Started

This repository houses an Angular application that can communicate with a corresponding backend. The backend is an ASP.NET Core web API project and can be found [here](https://github.com/ananauPeru/ananau-bibliotheek-api)

### Prerequisites

* Node.js
* Npm package manager
* SQL Server
* Local server running ASP.NET Core web API project

### Installing

1. Fire up the backend server
2. Make sure the API URL in environment.ts and/or environment.prod.ts is pointing at the correct hostname and port
3. In the project, run the following command: 

```bash
npm install
```

4. Finally, run the application:

```bash
ng serve
```

## Built With

* [Angular](https://angular.io/) - The web framework used
* [ZXing](https://github.com/zxing/zxing) - Library used for QR code scanning
* [angular2-qrcode](https://github.com/SuperiorJT/angular2-qrcode) - Library used for QR code generation

## Contributing

This is a public repository, but please only commit to the master or other already existing branches if you have Añañau's explicit consent. Making feature branches and pull requests is - of course - allowed.

## Authors

* **Lucas Vermeulen** - *Major work* - [GitHub profile](https://github.com/lucasverm)

See also the list of [contributors](https://github.com/ananauPeru/ananau-bibliotheek-angular/graphs/contributors) who participated in this project.