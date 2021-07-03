# CovServer back office

Platform to visualize infected people inside the enterprise as a member or a visitor.

## Installation

Just use ```git clone url``` to clone the project into your own repository

## Directory

```js
src/
// Contains all the general components used in different layouts or pages
|--components/
   |--buttons
      |--normalButton.tsx
      |--normalButton.test.tsx
   |--...
// Is a set of components
|--layouts/
   |--carroussel
      |--carroussel.tsx
      |--carroussel.test.tsx
   |--...
// Is a set of layouts and components to make a full view
|--pages/
   |--my_account_page
      |--myAccountPage.tsx
      |--myAccountPage.test.tsx
   |--...
// Connectors of the application with the outside world
|--providers/
   |--authApi.tsx
   |--authApi.test.tsx
   |--...
// Routes of the application
|--routes/
   |--applicationRoutes.tsx
   |--applicationRoutes.test.tsx
   |--...
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)