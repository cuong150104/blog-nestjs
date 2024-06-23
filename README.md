# Project Title: Xây dựng website Blog tương tự Viblo

### Purpose of the project
The purpose of a web blog project similar to Viblo is to create a platform where users can share knowledge, insights, and experiences related to technology, programming, and software development, fostering a community of learning and collaboration among tech enthusiasts.



## What to prepare
Install mySQL, nestjs, reactjs,XAMP...


### Technology and tools used
- Technology and Tools Used
- Programming Software: Visual Studio Code
- Web Server: XAMPP
- Source Code Management: GitHub
- Tool for Designing Object-Oriented Design and Analysis Diagrams: diagrams.net
- Front-End Development:
-    Languages: HTML, CSS, JavaScript
-    Frameworks: React.js, SCSS
- Back-End Development:
-    Language: JavaScript
-    Framework: NestJS
- Database Design Software: MySQL
- Authentication and Authorization: JWT
## How to run
After cloning the project and opening the solution file, you will see the project folder structure like this:
![alt text](mage/image.png)
- BackEnd - FrontEnd
![alt text](mage/image-9.png)

- src
![alt text](mage/image.png)

auth:
![alt text](mage/image-1.png)

-category
![alt text](mage/image-2.png)

-comment
![alt text](mage/image-3.png)

-follower
![alt text](mage/image-4.png)

-post
![alt text](mage/image-5.png)

-user
![alt text](mage/image-6.png)

-vote : Vote up/vote down bài viết
![alt text](mage/image-7.png)


## Databases
![alt text](mage/image-10.png)
## Usecase diagram
![alt text](mage/image-12.png)

## ALGORITHM ANALYSIS
- Search and filtering algorithm


## Features
### Login function
- Admin/User enters login name and password, the system will check the database and then respond to admin/user.
- If there is no account with the corresponding login name and password, the system will report an error of incorrect login name or password.
### Search - booking function
- For clients:
   + Enter personal information, then the system will retrieve the data and display appropriate search results
   + Client can click on the desired result to see detailed information
   + Fill in personal information and press the "Book" button to reserve a room
### Management function
#### Admin Functions
- User Registration and Login:

Manage user accounts, including registration and authentication.
Approve or reject user registrations.
Reset passwords for users.
- Write Article:

Create and publish articles.
Edit or delete any article.
- View Articles:

View all published articles.
Monitor article statistics and metrics.

#### Client Functions
- User Registration and Login:

Register a new account.
Log in to an existing account.
- Write Article:

Create and publish their own articles.
Edit or delete their own articles.
- View Articles:

Browse and read all published articles.
Search for specific articles by keywords or categories.
- Comment on Articles:

Post comments on articles.
Edit or delete their own comments.
- Follow Users:

Follow other users to receive updates on their new articles.
Unfollow users as desired.
- Vote Up/Vote Down Articles:

Vote up or vote down articles.
View the voting score for articles.
## Program interface
- Testing various scenarios such as system login, data entry/view, search and statistics functions, and query/report functions.
- Evaluation of the system's performance and user feedback.

