const n=r=>typeof r=="object"&&r!=null&&!Array.isArray(r),o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),s=(...r)=>r.reduce((e,t)=>typeof t=="string"?e.concat(t):Array.isArray(t)?e.concat(t.filter(Boolean)):n(t)?e.concat(Object.keys(t).flatMap(a=>t[a]?a:[])):e,[]).join(" ");export{s as c,o as h};
//# sourceMappingURL=index-dfa6f321.js.map
