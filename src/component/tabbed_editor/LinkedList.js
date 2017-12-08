export default class LinkedList { 
    constructor(capacity) { 
        this.head     = null;
        this.tail     = null;
        this.size     = 0;
        this.capacity = capacity;
    }

    get listSize() { 
        return this.size;
    }

    depleted() { 
        return (this.size == this.capacity);
    }

    push_back(in_node, unique) { 
        if(this.capacity > 0 && this.size === this.capacity) {
            return false;
        }

        const node = { 
            data: in_node.data,
            next: null
        }

        if(this.size === 0) {
            this.head = node;
        } else { 
            if(unique) { 
                if(contains_value(in_node)) {
                    return false;
                }
            }
            this.tail.next = node;
        }

        this.tail = node;

        ++(this.size);

        return true;
    }

    pop_back(in_node) { 
        if(this.size > 0) {
            if(this.size === 1) {
                in_node.data = this.head.data;

                this.head = null;
                this.tail = null;
            } else {
                let current_node = this.head;
                while(current_node.next !== this.tail) {
                    current_node = current_node.next;
                }                

                in_node.data = current_node.next.data;
                current_node.next = null;
                this.tail = current_node;
            }

            --(this.size);

            return (in_node.success = true);
        } else {
            return false;
        }
    }

    push_front(in_node, unique) {        
        if(this.capacity > 0 && this.size === this.capacity) {
            return false;
        }
        
        if(contains_value(in_node)) {
            return false;
        }
        
        const node = {
            data: in_node.data,
            next: null
        }

        const prev_head = node;
        this.head       = node; 
        this.head.next  = prev_head;

        ++(this.size);

        if(this.size === 1)  {
            this.tail = this.head;
        }

        return true;
    }

    pop_front(in_node) { 
        if(this.size > 0) {
            in_node.data = this.head.data;

            this.head = this.head.next;
            --(this.size);

            if(this.size === 0) {
                this.tail = null;
            }

            return (in_node.success = true);
        }

        return false;
    }

    contains_value(in_node) {         
        let current_node = this.head;
        if(current_node.data === in_node.data) {
            return true;
        } else {            
            while(current_node.next !== null) {
                if(current_node.next.data === in_node.data) {
                    return true;
                }

                current_node = current_node.next;
            }
        }
        
        return false;
    }

    remove_if(in_node) { 
        if(this.size > 0) {
            let current_node = this.head;
            if(current_node.data == in_node.data) {
                pop_front(in_node);
                return true;
            }

            while(current_node.next !== null) {
                if(current_node.next.data === in_node.data) {
                    if(current_node.next === this.tail) {
                        pop_back(in_node);
                    } else {
                        let source = current_node;
                        let rm     = current_node.next;
                        let target = rm.next;

                        in_node.data = rm.data;

                        source.next = target;
                        rm = null;
                        --(this.size);
                    }

                    in_node.success = true;
                    return true;
                }

                current_node = current_node.next;
            }
        }

        return false;
    }
};