import { Schema, model } from 'mongoose';
import Tweet from '../../interface/tweet';

export const DOCUMENT_NAME = 'Tweet';
export const COLLECTION_NAME = 'tweets';

const tweetSchema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: false,
    },
    userId: {
      type: Schema.Types.String,
      required: false,
    },
    content: {
      type: Schema.Types.String,
      required: true,
      maxlength: 280,
    },
    epoch: {
      type: Schema.Types.String,
      required: true,
    },
    timestamp: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    versionKey: false, // Don`t add additional versionKey field
  },
);

tweetSchema.index({ content: 'text' });

export const TweetModel = model<Tweet>(DOCUMENT_NAME, tweetSchema, COLLECTION_NAME);
