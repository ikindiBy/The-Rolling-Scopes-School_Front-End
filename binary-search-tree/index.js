

let BinarySearchTree = function () {
    this._root = null;
  }

  let Node = function (key, value) {
    this.key = key;
    this.value = value;
    this._left = null;
    this._right = null;
  }

  BinarySearchTree.prototype.root = function() {
    return (this._root) ?  this._root.value : null;
  }

  BinarySearchTree.prototype.insert = function(key, value) {
    const node = new Node (key, value);
    if (!this._root) {
      this._root = node;
    } else {
      let currentNode = this._root;
      while (currentNode) {
        if (currentNode.key > key) {
          if (currentNode._left) {
            currentNode = currentNode._left;
          } else {
            currentNode._left = node;
            break;
          }
        } else {
          if (currentNode._right) {
            currentNode = currentNode._right;
          } else {
            currentNode._right = node;
            break;
          }
        }
      } 
    }
    return this;
  };

  BinarySearchTree.prototype.delete = function(key) {
  	let deleteNode = function (node, key) {
  		if (!node) return null;
  		if (node.key === key) {
  			if (node._left === null && node._right === null) {
  				return null;
  			} else if (node._left === null) {
  				return node._right;
  			} else if (node.right === null){
  				return node._left;
  			}
  		} else if (key > node.key){
  			node._right = deleteNode(node._right, key);
  			return node;
  		} else {
  			node._left = deleteNode(node._left, key);
  			return node;
  		}
  	}
    deleteNode(this._root, key);
    return this;
  }

  BinarySearchTree.prototype.search = function(key) {
    let currentNode = this._root;
    while (currentNode) {
      if  (currentNode.key == key) {
        return currentNode.value;
      } else {
        if (currentNode.key > key) {
          currentNode = currentNode._left;
        } else {
          currentNode = currentNode._right;
        }
      }
    }
    return null;
  };

  BinarySearchTree.prototype.getMin = function(node) {
  	let current = node;
  	while (current._left) {
  		current = current._left;
  	}
  	return current;
  } 

  BinarySearchTree.prototype.contains = function(value) { 
    if (this._root == null) return false; 
    let result = false;
    let searchValue = function (value, node) {
      if (value == node.value) result = true;
    }
    this._root.walkForward(searchValue, value); 
    return result;  
  }

  BinarySearchTree.prototype.traverse = function(order) {
    let resultArray = [];
    let pushElem = function (arr, node) {
      arr.push(node.value);
    }
    if (order === true) {
      this._root.walkForward(pushElem, resultArray);
    } else {
      this._root.walkBack(pushElem, resultArray);
    }
    return resultArray;
  }

  BinarySearchTree.prototype.verify = function() {
    let preKey;
    let result = true;
    let lookTree = function (empty, node) {
      if (preKey) {
        if (preKey > node.key) {
          result = false
        }
      }
      preKey = node.key;
    }
    this._root.walkForward(lookTree);
    return result;
  }


  Node.prototype.walkForward = function(fun, secondArg) {
    let node = this;
    if (node._left != null) {node._left.walkForward(fun, secondArg)};
    fun(secondArg, node);
    if (node._right != null) {node._right.walkForward(fun, secondArg)}; 
  }

  Node.prototype.walkBack = function(fun, secondArg) {
    let node = this;
    if (node._right != null) {node._right.walkBack(fun, secondArg)};
    fun(secondArg, node);
    if (node._left != null) {node._left.walkBack(fun, secondArg)}; 
  }

module.exports = {
  //BST class
  BinarySearchTree,
  //root name
  root: '_root',
  //left and right nodes
  left: '_left',
  right: '_right',
  student: 'Alex Filitarin'
};
