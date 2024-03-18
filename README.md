# community-library

# Description
This is a project README file for xlit-server. It provides instructions for installation and setup of the project.

# Installation and Setup
Prerequisites
Before you begin, ensure you have the following prerequisites installed:

- Node.js and npm (Node Package Manager)
- TypeScript
- PostgreSQL

# Installation Steps

1. Clone the repository:

        git clone <repository_url>

2. Navigate to the project directory:

        cd community-library

3. Install dependencies:

        npm install

4. Set up environment variables:

        create env folder also create file env under folder

        sample env file:
            
        TYPEORM_CONNECTION = postgres
        TYPEORM_HOST = localhost
        TYPEORM_USERNAME = postgres
        TYPEORM_PASSWORD = admin
        TYPEORM_DATABASE = community-library

        TYPEORM_PORT = 5432
        TYPEORM_SYNCHRONIZE = true
        TYPEORM_LOGGING = true
        APP_PORT = 3009
        JWT_SECRET=x5kZivtV3arfTcxVKy4wRxJemLP2Ik1vL8PEShIJoKYeQIEcpWl5zmFo0AZZWWz
        JWT_EXPIRES=1w
        WEB_API_KEY=mb52ea2d-4567-4956-9d19-35a7e75a2c17

# API For community-library

1. Add new user 

    URL-------->>>>  POST - {{url}}/users/add

    Output:  {
        "user": {
            "email": "swapnil@yopmail.com",
            "userName": "swapil444",
            "fullName": "Swapnil Bhalerao",
            "id": 1,
            "isActive": true,
            "createdTimestamp": "2024-03-17T07:53:00.009Z",
            "updatedTimestamp": "2024-03-17T07:53:00.009Z",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjQ5OGUxNjlhLWRlNTgtNGNjMC1iZmM5LTc5M2QzMmY5ZmQ2NiIsInRpbWVzdGFtcCI6IjE3MTA2NjE5ODMyMDEiLCJpYXQiOjE3MTA2NjE5ODMsImV4cCI6MTcxMTg3MTU4M30.Q4M2Ee78IUcggQs2vwR2njiN3_Q4pqjJteVPtMVVxvY"
        },
        "flash": true,
        "message": "Added New User",
        "responseCode": 200
    }

2. User login 

    URL------------>>>>> POST - {{url}}/users/login

    output: {
        "user": {
            "id": 1,
            "email": "swapnil@yopmail.com",
            "userName": "swapil444",
            "fullName": "Swapnil Bhalerao",
            "isActive": true,
            "createdTimestamp": "2024-03-17T07:53:00.009Z",
            "updatedTimestamp": "2024-03-17T07:53:00.009Z",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImViYjUxYzM4LWZhNzUtNDc1OC1iMDdiLTkzZDZkMzQzMmU1ZiIsInRpbWVzdGFtcCI6IjE3MTA2NjI0NjQwMDMiLCJpYXQiOjE3MTA2NjI0NjQsImV4cCI6MTcxMTg3MjA2NH0.06WudHjCWnPE1YZ9bqHvAk6r_TbRs8rtHg80IOeK6Oc"
        },
        "flash": true,
        "message": "User Login Succesfully...",
        "responseCode": 200
    }

3. Add New Book

    URL------------>>>>>>>>> POST - {{url}}/books/add

    output : {
        "responseCode": 200,
        "flash": true,
        "message": "Added New Book",
        "book": {
            "title": "Rich Dad Poor Dad",
            "author": "Robert T. Kiyosaki",
            "ISBN": "9781612680194",
            "publicationYear": "1995",
            "genre": "Personal Finance",
            "quantityAvailable": 50,
            "id": 2,
            "isDeleted": false,
            "createdTimestamp": "2024-03-17T08:37:22.145Z",
            "updatedTimestamp": "2024-03-17T08:37:22.145Z"
        }
    }

4. Get All Book

    URL------------->>>>>>>>>> Get - {{url}}/books/all?skip=0&take=10

    output: {
    "responseCode": 200,
    "flash": true,
    "message": "Added New Book",
    "count": 5,
    "book": [
        {
            "id": 5,
            "title": "The Richest Man in Babylon",
            "author": "George S. Clason",
            "ISBN": "9780451205360",
            "publicationYear": "1926",
            "genre": "Personal Finance",
            "quantityAvailable": 50,
            "isDeleted": false,
            "createdTimestamp": "2024-03-18T06:03:31.460Z",
            "updatedTimestamp": "2024-03-18T06:03:31.460Z"
        },
        {
            "id": 4,
            "title": "Think and Grow Rich",
            "author": "Napoleon Hill",
            "ISBN": "9780449214923",
            "publicationYear": "1937",
            "genre": "Personal Finance",
            "quantityAvailable": 50,
            "isDeleted": false,
            "createdTimestamp": "2024-03-18T06:02:59.125Z",
            "updatedTimestamp": "2024-03-18T06:02:59.125Z"
        },
        {
            "id": 3,
            "title": "The Intelligent Investor",
            "author": "Benjamin Graham",
            "ISBN": "9780060555665",
            "publicationYear": "1949",
            "genre": "Personal Finance",
            "quantityAvailable": 50,
            "isDeleted": false,
            "createdTimestamp": "2024-03-18T06:01:59.571Z",
            "updatedTimestamp": "2024-03-18T06:01:59.571Z"
        },
        {
            "id": 2,
            "title": "Rich Dad Poor Dad",
            "author": "Robert T. Kiyosaki",
            "ISBN": "9781612680194",
            "publicationYear": "1995",
            "genre": "Personal Finance",
            "quantityAvailable": 50,
            "isDeleted": false,
            "createdTimestamp": "2024-03-17T08:37:22.145Z",
            "updatedTimestamp": "2024-03-17T08:37:22.145Z"
        },
        {
            "id": 1,
            "title": "Rich Dad Poor Dad",
            "author": "Robert T. Kiyosaki",
            "ISBN": "9781612680194",
            "publicationYear": "1995",
            "genre": "Personal Finance",
            "quantityAvailable": 50,
            "isDeleted": false,
            "createdTimestamp": "2024-03-17T08:36:00.370Z",
            "updatedTimestamp": "2024-03-17T08:36:00.370Z"
        }
    ]
}

5. Add Borrow Book

    URL -------->>>>>> POST - {{url}}/borrows/add

    output: {
        "flash": true,
        "message": "Added New Borrows......",
        "responseCode": 200,
        "borrows": {
            "userId": 3,
            "bookId": 1,
            "borrowDateTime": "2024-03-18T06:04:49.988Z",
            "status": "borrow",
            "returnDateTime": null,
            "id": 2,
            "createdTimestamp": "2024-03-18T06:04:50.004Z",
            "updatedTimestamp": "2024-03-18T06:04:50.004Z"
        }
    }

6. Return Borrow Book

    URl---------->>>>>>>> POST -  {{url}}/borrows/return

    output: {
        "flash": true,
        "message": "Book Return succesfully......",
        "responseCode": 200,
        "borrows": {
            "id": 10,
            "userId": 1,
            "bookId": 2,
            "borrowDateTime": "2024-03-18T06:07:01.982Z",
            "returnDateTime": "2024-03-18T06:07:25.173Z",
            "status": "return",
            "createdTimestamp": "2024-03-18T06:07:01.983Z",
            "updatedTimestamp": "2024-03-18T06:07:25.176Z"
        }
    }

7. Member Borrow list

    URL-------->>>>>>>> Get - {{url}}/borrows/member/1

    Output - {
    "flash": true,
    "message": "Borrows List...",
    "responseCode": 200,
    "count": 5,
    "data": [
        {
            "id": 1,
            "userId": 1,
            "bookId": 1,
            "borrowDateTime": "2024-03-17T09:54:01.173Z",
            "returnDateTime": "2024-03-17T10:10:29.244Z",
            "status": "return",
            "createdTimestamp": "2024-03-17T09:54:01.175Z",
            "updatedTimestamp": "2024-03-17T10:10:29.247Z",
            "user": {
                "id": 1,
                "email": "swapnil@yopmail.com",
                "userName": "swapil444",
                "fullName": "Swapnil Bhalerao",
                "password": "$2b$10$Td.nxavp7Je79KCiA/4Kzenx5ve9L1O23oTbq4SXGr.jZ/2jTGtXO",
                "isActive": true,
                "isAdmin": true,
                "createdTimestamp": "2024-03-17T07:53:00.009Z",
                "updatedTimestamp": "2024-03-17T07:53:00.009Z"
            },
            "book": {
                "id": 1,
                "title": "Rich Dad Poor Dad",
                "author": "Robert T. Kiyosaki",
                "ISBN": "9781612680194",
                "publicationYear": "1995",
                "genre": "Personal Finance",
                "quantityAvailable": 50,
                "isDeleted": false,
                "createdTimestamp": "2024-03-17T08:36:00.370Z",
                "updatedTimestamp": "2024-03-17T08:36:00.370Z"
            }
        },
        {
            "id": 10,
            "userId": 1,
            "bookId": 2,
            "borrowDateTime": "2024-03-18T06:07:01.982Z",
            "returnDateTime": "2024-03-18T06:07:25.173Z",
            "status": "return",
            "createdTimestamp": "2024-03-18T06:07:01.983Z",
            "updatedTimestamp": "2024-03-18T06:07:25.176Z",
            "user": {
                "id": 1,
                "email": "swapnil@yopmail.com",
                "userName": "swapil444",
                "fullName": "Swapnil Bhalerao",
                "password": "$2b$10$Td.nxavp7Je79KCiA/4Kzenx5ve9L1O23oTbq4SXGr.jZ/2jTGtXO",
                "isActive": true,
                "isAdmin": true,
                "createdTimestamp": "2024-03-17T07:53:00.009Z",
                "updatedTimestamp": "2024-03-17T07:53:00.009Z"
            },
            "book": {
                "id": 2,
                "title": "Rich Dad Poor Dad",
                "author": "Robert T. Kiyosaki",
                "ISBN": "9781612680194",
                "publicationYear": "1995",
                "genre": "Personal Finance",
                "quantityAvailable": 50,
                "isDeleted": false,
                "createdTimestamp": "2024-03-17T08:37:22.145Z",
                "updatedTimestamp": "2024-03-17T08:37:22.145Z"
            }
        },
        {
            "id": 9,
            "userId": 1,
            "bookId": 3,
            "borrowDateTime": "2024-03-18T06:06:58.785Z",
            "returnDateTime": null,
            "status": "borrow",
            "createdTimestamp": "2024-03-18T06:06:58.786Z",
            "updatedTimestamp": "2024-03-18T06:06:58.786Z",
            "user": {
                "id": 1,
                "email": "swapnil@yopmail.com",
                "userName": "swapil444",
                "fullName": "Swapnil Bhalerao",
                "password": "$2b$10$Td.nxavp7Je79KCiA/4Kzenx5ve9L1O23oTbq4SXGr.jZ/2jTGtXO",
                "isActive": true,
                "isAdmin": true,
                "createdTimestamp": "2024-03-17T07:53:00.009Z",
                "updatedTimestamp": "2024-03-17T07:53:00.009Z"
            },
            "book": {
                "id": 3,
                "title": "The Intelligent Investor",
                "author": "Benjamin Graham",
                "ISBN": "9780060555665",
                "publicationYear": "1949",
                "genre": "Personal Finance",
                "quantityAvailable": 50,
                "isDeleted": false,
                "createdTimestamp": "2024-03-18T06:01:59.571Z",
                "updatedTimestamp": "2024-03-18T06:01:59.571Z"
            }
        },
        {
            "id": 8,
            "userId": 1,
            "bookId": 4,
            "borrowDateTime": "2024-03-18T06:06:55.405Z",
            "returnDateTime": null,
            "status": "borrow",
            "createdTimestamp": "2024-03-18T06:06:55.406Z",
            "updatedTimestamp": "2024-03-18T06:06:55.406Z",
            "user": {
                "id": 1,
                "email": "swapnil@yopmail.com",
                "userName": "swapil444",
                "fullName": "Swapnil Bhalerao",
                "password": "$2b$10$Td.nxavp7Je79KCiA/4Kzenx5ve9L1O23oTbq4SXGr.jZ/2jTGtXO",
                "isActive": true,
                "isAdmin": true,
                "createdTimestamp": "2024-03-17T07:53:00.009Z",
                "updatedTimestamp": "2024-03-17T07:53:00.009Z"
            },
            "book": {
                "id": 4,
                "title": "Think and Grow Rich",
                "author": "Napoleon Hill",
                "ISBN": "9780449214923",
                "publicationYear": "1937",
                "genre": "Personal Finance",
                "quantityAvailable": 50,
                "isDeleted": false,
                "createdTimestamp": "2024-03-18T06:02:59.125Z",
                "updatedTimestamp": "2024-03-18T06:02:59.125Z"
            }
        },
        {
            "id": 7,
            "userId": 1,
            "bookId": 5,
            "borrowDateTime": "2024-03-18T06:06:51.717Z",
            "returnDateTime": null,
            "status": "borrow",
            "createdTimestamp": "2024-03-18T06:06:51.735Z",
            "updatedTimestamp": "2024-03-18T06:06:51.735Z",
            "user": {
                "id": 1,
                "email": "swapnil@yopmail.com",
                "userName": "swapil444",
                "fullName": "Swapnil Bhalerao",
                "password": "$2b$10$Td.nxavp7Je79KCiA/4Kzenx5ve9L1O23oTbq4SXGr.jZ/2jTGtXO",
                "isActive": true,
                "isAdmin": true,
                "createdTimestamp": "2024-03-17T07:53:00.009Z",
                "updatedTimestamp": "2024-03-17T07:53:00.009Z"
            },
            "book": {
                "id": 5,
                "title": "The Richest Man in Babylon",
                "author": "George S. Clason",
                "ISBN": "9780451205360",
                "publicationYear": "1926",
                "genre": "Personal Finance",
                "quantityAvailable": 50,
                "isDeleted": false,
                "createdTimestamp": "2024-03-18T06:03:31.460Z",
                "updatedTimestamp": "2024-03-18T06:03:31.460Z"
            }
        }
    ]
}

8. Multiple Member Same book Borrow list

    URL ----->>>>> Get - {{url}}/borrows/multiple/book

    Output : {
        "responseCode": 200,
        "flash": true,
        "message": "Borrows List...",
        "books": [
            {
                "bookId": 1,
                "userCount": "2"
            },
            {
                "bookId": 2,
                "userCount": "2"
            },
            {
                "bookId": 3,
                "userCount": "2"
            },
            {
                "bookId": 4,
                "userCount": "2"
            },
            {
                "bookId": 5,
                "userCount": "2"
            }
        ]
    }




