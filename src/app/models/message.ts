
import { User } from 'src/app/models/user';
import { EmojiCount } from './EmojiCount';
export class Message{
    id: number;
    speaker: User;    
    content: string;
    timeStamp: string;
    replies: string;
    reactionsCount: EmojiCount[];
}