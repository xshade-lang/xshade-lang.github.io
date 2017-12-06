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

    push_back(data, unique) { 
        if(this.capacity > 0 && this.size === this.capacity) {
            return false;
        }

        const node = { 
            data: data,
            next: null
        }

        if(this.size === 0) {
            this.head = node;
        } else { 
            if(unique) { 
                if(contains_value(data)) {
                    return false;
                }
            }
            this.tail.next = node;
        }

        this.tail = node;

        ++(this.size);

        return true;
    }

    pop_back(data) { 
        if(this.size > 0) {
            if(this.size === 1) {
                data.data = this.head.data;

                this.head = null;
                this.tail = null;
            } else {
                let current_node = this.head;
                while(current_node.next !== this.tail) {
                    current_node = current_node.next;
                }                

                data.data = current_node.next.data;
                current_node.next = null;
                this.tail = current_node;
            }

            --(this.size);

            return (data.success = true);
        } else {
            return false;
        }
    }

    push_front(data, unique) {        
        if(this.capacity > 0 && this.size === this.capacity) {
            return false;
        }
        
        if(contains_value(data)) {
            return false;
        }
        
        const node = {
            data: data,
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

    pop_front(data) { 
        if(this.size > 0) {
            data.data = this.head.data;

            this.head = this.head.next;
            --(this.size);

            if(this.size === 0) {
                this.tail = null;
            }

            return (data.success = true);
        }

        return false;
    }

    contains_value(data) {         
        let current_node = this.head;
        if(current_node.data === data) {
            return true;
        } else {            
            while(current_node.next !== null) {
                if(current_node.next.data === data) {
                    return true;
                }

                current_node = current_node.next;
            }
        }
        
        return false;
    }

    remove_if(data) { 
        if(this.size > 0) {
            let current_node = this.head;
            if(current_node.data === data) {
                pop_front(data);
                return true;
            }

            while(current_node.next !== null) {
                if(current_node.next.data === data) {
                    if(current_node.next === this.tail) {
                        pop_back(data);
                    } else {
                        let source = current_node;
                        let rm     = current_node.next;
                        let target = rm.next;

                        data.data = rm.data;

                        source.next = target;
                        rm = null;
                        --(this.size);
                    }

                    return (data.success = true);
                }

                current_node = current_node.next;
            }
        }

        return false;
    }
};