export interface IComment{
    from: {
        name: string,
        email: string
    };
    to: {
        name: string,
        email: string
    };
    comment: string;
    dateAndTime: Date;
}

export class Comment{
    from: string;
    to: string;
    comment: string;
    dateAndTime: Date;

    constructor(comment: Comment){
        this.from = comment.from;
        this.to = comment.to;
        this.comment = comment.comment;
        this.dateAndTime = new Date();
    }
}