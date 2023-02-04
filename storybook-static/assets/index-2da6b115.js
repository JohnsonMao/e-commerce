var o=Object.defineProperty;var a=(r,t)=>o(r,"name",{value:t,configurable:!0});const s=a(r=>typeof r=="object"&&r!=null&&!Array.isArray(r),"isObject"),u=a((...r)=>r.reduce((t,e)=>typeof e=="string"?t.concat(e):Array.isArray(e)?t.concat(e.filter(Boolean)):s(e)?t.concat(Object.keys(e).flatMap(n=>e[n]?n:[])):t,[]).join(" "),"classNames");export{u as c};
//# sourceMappingURL=index-2da6b115.js.map
