import { Document } from 'mongoose';

export default interface Tweet extends Document {
    userId: string, // The name of the userId who posted the tweet
    username: string, // The name of the user who posted the tweet
    content: string, // The content of the tweet
    epoch: string, // The Epoch the tweet was created
    timestamp: string, // The date and time the tweet was created
};

export interface TweetBatches {
    [timeWindow: string]: Tweet[]
}

export interface TweetCounts {
    [key: string]: number
}
