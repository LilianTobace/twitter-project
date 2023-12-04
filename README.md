# BrandBastion-project

## Project Description

The project is a Minimum Viable Product (MVP) for a web application that monitors real-time tweets containing a specific hashtag. It stores the 100,000 most recent tweets in a NoSQL data store and archives older data. The application also detects anomalies in tweets and triggers alerts when anomalies are detected.

## Project Requirements and Dependencies

To run this project, you will need:

- Typescript
- Node.js
- MongoDB

## Getting Started

To set up and run the project, follow these steps:

1. Clone the repo
2. Run `npm install` to install dependencies
3. Configure MongoDB connection string
4. Run `npm start` to start the app

## How to Make Use of the Project

As the Twitter API was not fully available for consumption on free tier, the project uses its own dataset for stream and process (see end of document).
After starting, it keep executing up until all data has been processed.
If you want to process different data, you will need to add a new file to the path `.\src\database\repositories\stream`, add the name file in the index inside this path and start the project again.

## Current NoSQL data structure and future normalization for other platforms

● Define and implement NoSQL data structure and justify how you would normalize it so that
messages/comments from other platforms (Facebook, Instagram, YouTube) could be added to the same
data store

To normalize a NoSQL structure to accept data from other platforms

In order to normalize a NoSQL structure to accept data from other platforms (Facebook, Instagram, YouTube), it is necessary to make all files and functions called Tweet (ArchiveTweet.ts, TweetCount.ts, ArchiveTweetRepo.ts, etc.) generic. They would have their name changed to Post. Then there would be the Post model with a schema that contains the fields that are common to all platforms (id, user, epoch, content, timestamp, and platform).

Then there would be a model for each platform that would extend from Post (twitterModel, facebookModel, instagramModel, youtubeModel). Each new model that is added needs to adapt according to the main model (Post) and if there are any specific fields, they will be added to each schema. In this way, each schema would be decoupled without affecting the main model and the system. Use of DTOs and DAOs would be a viable option to ensure data structure and access consistency. 

In the database, there would be only one table called Post that contains data and fields from all platforms.

##

## Approximate time used to complete each issue and feature

The development of this project started on 12/01/23 and ended on 12/04/23, the time spent on each feature is only an approximate value.

- Study the project, Twitter API v2, what social media architecture is like, try to implement it and discover the difficulties of implementing Twitter API: 6h
- Build the initial project with packages and basic architecture: 3.5h
- Define database and architecture: 4.5h
- Simulate the stream: 4h
- Develop functions and connection to database: 4h
- Study the anomaly and implement: 3.5
- Connect all features and refinement: 3.5
- Tests with real dataset and fixing errors: 5h
- Build test (jest.js) and latest adjustments: 2.5

## Directory Structure
src/
controllers/ - Route handlers and business logic
database/ - Models and repositories
interfaces/ - Types and interfaces
__tests__/ - Unit and integration tests

## Possible Future Improvements

- Add authentication and authorization
- Improve error handling
- Add more tests
- Improve anomalies detector with sentiment analysis by using Amazon Comprehend (or equivalent in chosen cloud service)
- Deploy to AWS (or any cloud service)
- Save credentials and environments variables in Secret Manager (or equivalent in chosen cloud service)
- Change from mongoDB to DynamoDB (or equivalent in chosen cloud service), for more efficient and fast recent tweet storage
- Add DynamoStream (or equivalent in chosen cloud service), to capture tweets in real-time
- Use S3 database (or equivalent in chosen cloud service), to archive tweets
- SNS (or equivalent in chosen cloud service), to trigger and send alerts
- Build IaC CDK (or equivalent in chosen cloud service)
- Build CICD pipeline (GitActions) and actions for commits, prs, releases

## Other informations

Dataset based in [Kaggle](https://www.kaggle.com/datasets/smid80/coronavirus-covid19-tweets-early-april).

Understanding more about [anomalies](https://www.mdpi.com/2076-3417/12/21/11059) for Twitter Data.

Twitter API v2 could not be used because authorization for free developer account is not working as expected, making many endpoints unusable, so it was necessary to create a simulation of a "streaming" mechanism. Check more about the API v2 issues on [Twitter community](https://twittercommunity.com/t/when-authenticating-requests-to-the-twitter-api-v2-endpoints-you-must-use-keys-and-tokens-from-a-twitter-developer-app-that-is-attached-to-a-project-you-can-create-a-project-via-the-developer-portal/189699/75)