
import { User } from 'src/app/models/user';
import { EmojiCount } from 'src/app/models/emojiCount';

export class Message{
    id: number;
    speaker: User;    
    content: string;
    timeStamp: string;
    replies: string;
    emojiCounts: EmojiCount[];
}