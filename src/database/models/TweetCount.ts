import { Schema, model } from 'mongoose';
import TweetCount from '../../interface/tweetCount';

export const DOCUMENT_NAME = 'TweetCount';
export const COLLECTION_NAME = 'tweetcounts';

const tweetCountSchema = new Schema(
  {
    tweetCount: {
      type: Schema.Types.Number,
      required: true,
      min: 0,
    },
  },
  {
    versionKey: false, // Don`t add additional versionKey field
  },
);

tweetCountSchema.index({ tweetCount: 1 });

export const TweetCountModel = model<TweetCount>(DOCUMENT_NAME, tweetCountSchema, COLLECTION_NAME);
