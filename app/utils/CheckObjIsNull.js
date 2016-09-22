export const CheckObj = (obj) => {
    if (typeof obj === "object" && !(obj instanceof Array)){  
        var hasProp = false;  
        for (var prop in obj){  
            hasProp = true;  
            break;  
        }  
        if (hasProp){  
            return true;  
        }else{  
            return false;  
        }  
    }else if(typeof obj === "object" && (obj instanceof Array)){
    	  if(obj.length === 0){
    	  	return false;
    	  }else{
    	  	return true;
    	  }
    }
};