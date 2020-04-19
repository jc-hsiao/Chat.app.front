
import { User } from 'src/app/models/user';
export class Channel{
    id: number;
    members: Iterable<User>;    
    name: string;
    admins: Iterable<User>;
}