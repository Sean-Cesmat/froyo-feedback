# FroyoFeedback
A full stack node application to get feedback about customers favorite flavors of frozen yogurt.

The customer will login to fill out their profile of favorite flavors. The customer will have the option to be notified via email when their favorite flavor is available and/or when their favorite flavor will be rotated out soon. They will also have the option to enter in their birthday month to receive a coupon via email.

The owner will be able to log in and see the data from all of the customer profile of flavors. There will be graphs to give a good visual with all of the numbers.

***

## Who will use this web app?

#### Customers
1. As a customer, I want to know when chocolate froyo is available without checking the website daily.
2. As a customer, I want to give more feedback because I would like my favorite to be available more often.

#### Business Owner
1. As the owner, I want to know what our most popular flavors are so that I can have it available for my customers more often.
2. As the owner, I want to be able to let customers know when their favorite flavor is available in hopes it might bring them into the shop.

***

## WIREFRAMES
#### Home Login
This wireframe shows a basic logo with a little bit of text and a login for the user. There will be a link below for a sign up modal if they don't already have an account.
![alt text](/readme-images/wireframe-home-login.jpg "Home Login Wireframe")

#### Favorites Page
In the top section has a place where the user could select their top 6 flavors. Below is a place to select any others that they enjoy but didn't make the cut of top 6. There will be a couple links on the side bar.
![alt text](/readme-images/wireframe-favorites.jpg "Favorites Wireframe")

#### Business Dashboard Page
In the top section has an area for some visual representations of the data collected (not sure exactly what that will look like yet). The bottom section will have more information about the top selected flavors it different categories ex. sorbets, no sugar added, almond based yogurt
![alt text](/readme-images/wireframe-business.jpg "Business Dashboard Wireframe")

***

## ROUTES

#### CURRENT ROUTE UNKNOWNS


| Verb   | Path                        | Action | Used For |
| ------ |:--------------------------- | :----- | :------  |
| GET    | /                           | index  | Loads the homepage with login screen
| POST   | /login                      | show   | Authenticates and redirects user to their flavor profile
| GET    | /admin                      | index  | Loads the admin login screen
| POST   | /admin                      | show   | Authenticates and redirects admin user to dashboard
| POST   | /sign-up                    | create | Creates a new user and send them to their flavor profile
| GET    | /logout                     | index  | Logs out the user and redirects to the homepage
| GET    | /profile                    | show   | Retrieves the users profile and renders it
| PUT    | /profile                    | edit   | Upon saving profile, it saves the updates to the database
| GET    | /dashboard                  | show   | Displays the statistics to the admin only
| GET    | /dashboard/flavors          | show   | Retrieves the flavors available to the flavor profiles
| POST   | /dashboard/flavors          | create | Creates a new flavor option to the customers flavor profiles
| GET    | /dashboard/flavors/:id/edit | edit   | Loads the edit page for the specific flavor by id
| PUT    | /dashboard/flavors/:id      | edit   | Edits a flavor option and updates the database
| DELETE | /dashboard/flavors/:id      | delete | Destroys a flavor option


## MODELS

#### **User Model**
##### Associations: Has one profile & Can have many flavors
| ID   | Name | Email          | Password         | User Type   |
| ---- |:----:| :-------------:| :--------------: | :---------: |
| 5    | Tom  | tom@jerry.com  | 3Jc$9m2(m38dnDi2 | admin       |

#### **Profile Model**
##### Associations: Belongs to one user
| ID   | UserId | Top Fav 1 | Top Fav 2 | Top Fav 3 | Top Fav 4 | Top Fav 5 | Top Fav 6 | Birthday | Email Notifications |
| ---- |:------:| :--------:| :--------:| :--------:| :--------:| :--------:| :--------:| :-------:| :------------------:|      
| 2    | 5      | flavor_id | flavor_id | flavor_id | flavor_id | flavor_id | flavor_id | M/Year   | True or False       |


#### **Flavor Model**
##### Associations: Flavors can have many Users
| ID   | Name       | Flavor Type | Status      |
| ---- |:----------:| :---------: | :---------: |
| 23   | Chocolate  | Low Fat     | In Rotation |

#### **Users_Flavors Model (for tracking flavor likes)**
##### Associations: Join Table (Users can have many Flavors & Flavors can have many Users)
| ID   | UserId | Flavor_id |
| ---- |:------:| :-------: |
| 23   | 5      | 45        |

#### **Favorites_Users_Flavors Model (for tracking/counting flavor favorites)**
##### Associations: Join Table (Users can have many Flavors & Flavors can have many Users)
| ID   | UserId | Flavor_id |
| ---- |:------:| :-------: |
| 23   | 5      | 45        |

## Things I need to do
  - ~~Wireframes~~
  - ~~Create Models~~
  - ~~Build Routes~~
  - ~~Add Edit/Delete Routes for flavors~~
  - ~~Add API~~
  - ~~Add Ability to store likes~~
  - ~~Add charts to dashboard~~
  - ~~Add lists of top flavors by category to dashboard~~
  - Add ability to receive emails about favorite flavors
  - Set a cronjob to scrape White Cap website for current flavors


## MODULES I'LL NEED
- express
- ejs
- pg@6.4.2
- pg-hstore
- sequelize
- body-parser
- dotenv
- bcrypt
- passport
- passport-local
- connect-flash
- express-session
- async

#### Extras
- rowdy-logger

## API USED
- http://avatars.adorable.io/

## CREDITS | THINGS I USED
- Materialize
