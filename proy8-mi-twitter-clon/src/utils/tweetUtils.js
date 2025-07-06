export const updateTweetMetric = (tweets, tweetId, field, increment) => {
  return tweets.map((tweet) =>
    tweet.id === tweetId
      ? {
          ...tweet,
          [field]: Math.max(0, tweet[field] + (increment ? 1 : -1)),
        }
      : tweet
  );
};
