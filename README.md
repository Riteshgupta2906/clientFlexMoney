
# Yoga App

##  Links

- [Yoga App](https://yoga-btv3.onrender.com/) : User InterFace
- [Backend Github](https://github.com/Riteshgupta2906/books) : All the Api References and DataBase ER Diagram Present Here
- [Google Drive Link](https://drive.google.com/file/d/1BLSBEuYyDGu_HvosFpaoRcR6WNM5g9Xh/view) : A walkThrough video of the Interface

#### User Registration:

- Upon application startup, users encounter a Register tab.
- Required information includes name, age, batch, gender, and email.
- The client initiates a request to check if the user exists.
- If not, a new user is created, and the application transitions to the User Dashboard.
#### User Dashboard:

- Displays basic user information upon successful registration.
- Users can complete payments within the dashboard.
- Batch change functionality is supported.
- If the email already exists, users access the Dashboard with their existing data.

#### Admin Tab:
- Includes a dedicated section for administrators to log in.
- Admins use specific credentials to access the admin portal.
- Upon login, administrators gain comprehensive visibility into registered user data.
- User information is presented, encompassing details such as name, age, email, date of joining, and payment status.
##### Admin Login Id :  test@gmail.com
##### Admin Password : test@1234

## ER Diagram Screenshot

![ER Diagram Screenshot](https://i.ibb.co/rfkB6HW/ER-Diagram-of-Database.png)

## Assumption
- Users are considered different from one another based on their unique email IDs.
- Users can register and access the application without making an initial payment.
## Tech Stack

**Client:** HTML,CSS,React

**Server:** Node, Express

**DataBase:** PostgreSQL






