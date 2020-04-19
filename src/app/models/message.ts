
import { User } from 'src/app/models/user';
export class Message{
    id: number;
    speaker: User;    
    content: string;
    timeStamp: string;
    replies: string;
}