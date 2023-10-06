import { randomUUID } from 'crypto';
import { Tweet, typeTwitter } from './tweet';
import { tweets_db, users_db } from '../database/database';

function generateRandomString(numCharacters: number): string {
    const min = Math.pow(10, numCharacters - 1)
    const max = Math.pow(10, numCharacters) - 1
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNumber.toString().padStart(numCharacters, '0')
}

export class User {
    private idUser: string
    private username: string
    private tweets: Tweet[] = []
    private following: User[] = []
    private followers: User[] = []

    constructor(private name: string, private email: string, private password: string) {
        this.idUser = randomUUID()
        this.username = '@' + name + generateRandomString(5)
        users_db.push(this)
    }

    public createTweet(content: string, type: typeTwitter): Tweet {
        const tweet = new Tweet(content, type, this) 
        this.tweets.push(tweet)
        return tweet
    }

    public follow(user: User): void {
        user !== this && !this.following.includes(user) &&
            this.following.push(user)
            user.followers.push(this)
    }

    public getFollowing(): string[] {
        return this.following.map(user => user.getUsername())
    }

    public getFollowers(): string[] {
        return this.followers.map(user => user.getUsername())
    }

    public likeTweet(tweet: Tweet): void {
        tweet.like(this)
    }

    public getUsername(): string {
        return this.username
    }

    public replyToTweet(originalTweet: Tweet, content: string, user: User): Tweet {
        const reply = new Tweet(content, typeTwitter.Reply, user)
        originalTweet.addReply(reply)
        this.tweets.push(reply)
        return reply
    }

    public showTweets(): string[] {
        const formattedTweets: string[] = []
        for (const tweet of this.tweets) {
            const formattedReplies = tweet.getFormattedReplies()
            const formattedLikes = tweet.getFormattedLikes()
            const formattedTweet = `${this.username}: ${tweet.getContent()} [${formattedLikes}] ${formattedReplies}`
            formattedTweets.push(formattedTweet)
        }
        return formattedTweets
    }

    public showFeed(): void {
        const feed: string[] = []

        for (const tweet of this.tweets) {
            feed.push(this.formatTweet(tweet))
        }

        for (const followedUser of this.following) {
            for (const tweet of followedUser.tweets) {
                feed.push(followedUser.formatTweet(tweet))
            }
        }

        console.log(feed)
    }

    private formatTweet(tweet: Tweet): string {
        const formattedReplies = tweet.getFormattedReplies()
        const formattedLikes = tweet.getFormattedLikes()
        return `${tweet.getUser().getUsername()}: ${tweet.getContent()} ${formattedReplies} [${formattedLikes}]`
    }
}
