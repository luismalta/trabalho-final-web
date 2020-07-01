import { SaleLine } from './sale-line'
import { User } from './user'

export class Sale {
    constructor(
        public line: SaleLine[] = [],
        public user: User,
        public totalPrice: number,
        public date: Date,
        public received: Boolean,
     ){}
}
