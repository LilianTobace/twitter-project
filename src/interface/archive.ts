import { Document } from 'mongoose';

export default interface ArchivedTweet extends Document {
    content: string, // The content of the tweet
    epoch: string, // The Epoch the tweet was created
    timestamp: string, // The date and time the tweet was created
    user: string, // The name of the user who posted the tweet
    archivedAt: string, // The date and time the tweet was archived
};
