import { Document } from 'mongoose';

export default interface TweetCount extends Document {
    tweetCount: number, // The amount of tweets on database
};
