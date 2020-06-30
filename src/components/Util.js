var ErrorChecks = {
  "BLANK":
    function( text ){ return text == ""; },
  "NAN":
    function( text ){ return isNaN(text); },
  "FLOAT":
    function( text ){ return !Number.isInteger( parseFloat(text) ); },
  "BOUND_INCLUSIVE":
    function( text, bound ){
      let value = parseFloat( text );
      return value < bound.min || value > bound.max;
    }
};

var Util = {
  cloneObject: function( object ){
    let newObject = {};
    for (let key in object){
      newObject[ key ] = object[ key ];
    }
    return newObject;
  },
  validateInput: function( text, validations ){
    for (let key in ErrorChecks){
      if ( validations[key] ){
        if ( typeof validations[key] == "boolean" && ErrorChecks[key]( text ) ||
             typeof validations[key] == "object"  && ErrorChecks[key]( text, validations[key] )){
          return key;
        }
      }
    }
    return false;
  }
};

module.exports = Util;
