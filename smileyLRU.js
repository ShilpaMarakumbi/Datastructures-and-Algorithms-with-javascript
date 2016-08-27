window.onload=function(){
//javascript LRU Cache
//Queue node Implemented using doubly LL

function QNode(data){
	this.prev=null;
	this.next=null;
	this.data=data;
	
}

function Queue(capacity){
	this.front=null;
	this.rear=null;
	this.size=0;
}
var queue=new Queue(5);
var map={};
var capacity=5;
function cacheEntry(key){
	var node_q=new QNode(key);
	
	if(queue.front==null && queue.rear==null){
		queue.front=node_q;
		queue.rear=node_q;
		
		queue.size++;
		map[key]=node_q;
	}
	else if(map[key] == undefined){
		map[key]=node_q;
		if(queue.size==capacity){
			var temp1=queue.front;
			queue.front=node_q;
			node_q.next=temp1;
			temp1.prev=node_q;
			temp=queue.rear;
			//console.log(temp);
			queue.rear=queue.rear.prev;
			queue.rear.next=null;
			temp=null;
			queue.size++;
		}
		else if(queue.size<capacity){
			var temp=queue.front;
			
			queue.front=node_q;
			node_q.next=temp;
			temp.prev=node_q;
			
			queue.size++;
		}
	}
	else if(map[key]){
		var get_node=map[key];
		if(queue.front.data!=get_node.data)
		removeandmovefront(get_node);
		
	}
	return node_q;
}

function removeandmovefront(node){
    if(node.prev)
	node.prev.next=node.next;
	if(node.next)
	node.next.prev=node.prev;
	//node.prev=null;
	queue.front.prev=node;
	node.next=queue.front;
	node.prev=null;
	queue.front=node;
	
}

function main(){
	//getclickedId();
	var q1=cacheEntry(1);
	var q2=cacheEntry(2);
	var q3=cacheEntry(3);
	var q4=cacheEntry(1);
	var q5=cacheEntry(5);
	
	printQ();
}
document.getElementsByClassName("outerContainer")[0].addEventListener('click',function(){
		   var elements = document.getElementsByClassName("elem1");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
	if(event.target.nodeName== 'SPAN'){
		//console.log(event.target.id);
		cacheEntry(event.target.id)
	}
	printQ()
});

function printQ(){
	var fnode=queue.front;
	var count=0;
	while(fnode!=null && count<capacity){
		count++;
		console.log(fnode.data);
		
		var elem=document.getElementById(fnode.data);
		var elem1=elem.cloneNode();
			elem1.setAttribute('class', 'elem1');
		document.getElementsByClassName("recent")[0].appendChild(elem1);
		fnode=fnode.next;
	}
	
	
}

//main();


};