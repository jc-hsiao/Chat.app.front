
import { User } from '../../src/models/user';
export class Message{
    id: number;
    speaker: User;    
    content: string;
    timeStamp: string;
    replies: string;
}