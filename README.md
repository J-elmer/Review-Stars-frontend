# Review Stars Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3. This is the frontend application of [ReviewStars](https://github.com/J-elmer/ReviewStars) which uses the diferent microservices to run CRUD operations.

**Running the app**

*Prerequisites*

Make sure you have NodeJs and NPM installed, instructions can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Also, make sure you install [Angular](https://angular.io/guide/setup-local).

In the source directory, first run 

```
npm install
```

Then run:

```
ng serve
```

Navigate to `http://localhost:4200/` to view the application. The app will automatically reload if you change any of the source files.

**Important Note**

Make sure you run the [performer](https://github.com/J-elmer/Performer-Microservice), [concert](https://github.com/J-elmer/Concert-microservice) and [review](https://github.com/J-elmer/Review-microservice) microservices if you want the full functionality. Otherwise, you want be able to create, read, update or delete performers/concerts/reviews.

If you want to run the app in production, I suggest you check out the [ReviewStars Repository](https://github.com/J-elmer/ReviewStars). Here you can build the whole ReviewStars application in one go.
