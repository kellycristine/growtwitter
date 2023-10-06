import { randomUUID } from 'crypto';
import { tweets_db } from "../database/database";
import { User } from './user';

export enum typeTwitter {
    Origin = 'origin',
    Reply = 'reply',
}

export class Tweet {
    private idTweet: string
    private replies: Tweet[] = []
    private likes: User[] = []
    private user: User

    constructor(private content: string, private type: typeTwitter, user: User) {
        this.user = user
        this.idTweet = randomUUID()
        tweets_db.push(this)
    }

    public getUser(): User {
        return this.user
    }

    public createTweet(content: string, type: typeTwitter, user: User): Tweet {
        const tweet = new Tweet(content, type, user)
        return tweet
    }

    public like(user: User): void {
        !this.likes.includes(user) && this.likes.push(user)
        
    }

    public getLikes(): string[] {
        return this.likes.map(user => user.getUsername())
    }

    public addReply(reply: Tweet): void {
        this.replies.push(reply)
    }

    public getReplies(): string[] {
        return this.replies.map(reply => reply.getContent())
    }

    public getContent(): string {
        return this.content
    }

    public getFormattedLikes(): string {
        const numberOfLikes = this.likes.length
        if (numberOfLikes === 0) {
            return '0 Like'
        } else if (numberOfLikes === 1) {
            return `${this.likes[0].getUsername()} Liked`
        } else {
            const remainingLikes = numberOfLikes - 1
            return `${this.likes[0].getUsername()} and ${remainingLikes} other users liked`
        }
    }

    public getFormattedReplies(): string {
        this.replies.length === 0 &&  ''

        const formattedReplies: string[] = []
        for (const reply of this.replies) {
            formattedReplies.push(`> ${reply.getUser().getUsername()}: ${reply.getContent()}`)
        }

        return formattedReplies.join('-')
    }
}
