import {nums} from "./module1.js";
import * as nums2 from "./module1.js";
import c, { b as b1, f1, g } from "./module2.js";
console.log(nums.a);
console.log(nums2.nums.a);
console.log(b1);
console.log(c);
console.log(f1);
console.log(g);
function dis(){
    console.log("dfgn")
}
window.dis=dis
