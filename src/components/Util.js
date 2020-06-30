var Util = {
  cloneObject: function( object ){
    let newObject = {};
    for (let key in object){
      newObject[ key ] = object[ key ];
    }
    return newObject;
  }
};

module.exports = Util;
