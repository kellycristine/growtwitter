import { User } from './class/user'
import { typeTwitter } from './class/tweet'
import {tweets_db, users_db } from './database/database'

/// Create Users
const user1 = new User('Kelly', 'kelly@example.com', 'password1')
const user2 = new User('Duda', 'duda@example.com', 'password2')
const user3 = new User('Marco', 'marco@example.com', 'password3')

// Create Tweets
const tweet1 = user1.createTweet('Content of the original tweet', typeTwitter.Origin)
const tweet2 = user1.createTweet('Content of the reply', typeTwitter.Reply)
const tweet3 = user1.createTweet('Hello', typeTwitter.Origin)
const tweet4 = user2.createTweet('Hi', typeTwitter.Origin)
const tweet5 = user3.createTweet('Hello 3', typeTwitter.Origin)

// Reply to Tweet
const reply1 = user1.replyToTweet(tweet1, 'Reply to the original tweet', user1)

// Followers and Following
user1.follow(user2)
user2.follow(user1)
user3.follow(user1)

// Likes on Tweets
user3.likeTweet(tweet1)
user2.likeTweet(tweet1)
user2.likeTweet(tweet2)

// Show Tweets
console.log('Kelly\'s Tweets:', user1.showTweets())

// Show Feed
user1.showFeed()
