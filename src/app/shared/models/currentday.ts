import { Location } from './location';
import { Condition } from './condition';
import { Current } from './current';

export interface CurrentDay {
    location:Location;
    condition:Condition;
    current:Current;
}
