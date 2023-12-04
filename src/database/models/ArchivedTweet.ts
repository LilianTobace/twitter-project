import { Schema, model } from 'mongoose';
import ArchivedTweet from '../../interface/archive';

export const DOCUMENT_NAME = 'ArchivedTweet';
export const COLLECTION_NAME = 'archivedtweets';

const archivedTweetSchema = new Schema(
  {
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
    user: {
      type: Schema.Types.String,
      required: false,
    },
    archivedAt: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    versionKey: false, // Don`t add additional versionKey field
  },
);

archivedTweetSchema.index({ content: 'text' });
archivedTweetSchema.index({ archivedAt: 'text' });

export const ArchivedTweetModel = model<ArchivedTweet>(DOCUMENT_NAME, archivedTweetSchema, COLLECTION_NAME);
