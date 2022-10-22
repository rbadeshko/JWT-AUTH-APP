Tech Stack:  React + Typescript + Redux + Axios + Formik, raw CSS + BEM
Duration time: approx 14-15 Hours

Typescript helped me avoid a lot of type errors with get and set data in Redux store.

Redux is good state manager and very simple.

Axios is a simple library with flexible customisation of HTTP headers

I like Less and Sass but chose BEM in this project, because 
the project is not big and BEM very flexible give us
less mistake and crossing variable in css.
Chose custom design theme
App is responsible and has a breakpoints

Formik light library with validation. I create universal reusable function with Formik UniversalFormik.ts? that everyone can 
customise for custom form. Validation like separate utils also can be customised.

in User page all users everytime fetching from server, I think, that another user can change the data,
and we must have new users array.

Logout page is page of current user
Edit users can be also on user page.
Add user in Popup reusable component.

As authorisation app check token in LocalStorage and push it to directly Redux as preloadingState, 
then we can use Token from LocaleStorage or from state. 

removeUserTC, getAllUsersTC - those thunks use token from state, and I think its more secure.
I'm just showing both possibilities
Token in LocalStorege can be used for auth after reload page or something same.

All status server code, messages, endpoints and navigation path saved as constants in enum directory for good code reading

I refactored code. Make a preLoad state after reload page or user comeback: 
was: a thunks, that dispached token in store
now: preload state directly

Problems: 

Redux Thunk Type was a problem =>  read a lot of documentation
Formik Variables and Errors Type were a problem =>  read a lot of documentation







