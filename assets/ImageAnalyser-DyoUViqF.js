import{r as l,j as s,_ as h}from"./index-CfI4M7cK.js";import{G as R}from"./index-BxK1Kcup.js";const D=()=>{const[p,o]=l.useState(""),[c,u]=l.useState(null),[m,g]=l.useState(null),[x,f]=l.useState(null),[i,d]=l.useState(""),[b,n]=l.useState(!1),j="AIzaSyC18YzxeU4JNJpABeBF3y100ncHAgKKzZo",w=new R(j),v=t=>{let e=t;return e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;"),e=e.replace(/\[(https.*)\]\((https.*)\)/g,'<a style="color: skyblue" target="_blank" href="$1">$2</a>'),e=e.replace(/```(\w*)([\s\S]*?)```/g,'<code style="background-color: green; padding: 4px;">$1</code><pre style="overflow: auto; padding: 0px 8px; background-color: black"><code>$2</code></pre>'),e=e.replace(/##\s*(.*?)\s*\n/g,"<h2>$1</h2>"),e=e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/\n/g,"<br>"),e},y=w.getGenerativeModel({model:"gemini-1.5-flash-latest"}),I=async t=>{t.preventDefault(),f(null),n(!0);try{const a=(await(await y.generateContent(p)).response).text();d(a)}catch(e){console.log(e),h.error("Please try again later...")}finally{o(""),n(!1)}};async function S(t){return{inlineData:{data:await new Promise(r=>{const a=new FileReader;a.onloadend=()=>r(a.result.split(",")[1]),a.readAsDataURL(t)}),mimeType:t.type}}}const A=async t=>{t.preventDefault(),n(!0);const e=await S(c);try{const a=(await y.generateContent([p,e])).response.text();f(c),d(a)}catch(r){console.log(r),h.error("Please try again later...")}finally{u(null),o(""),n(!1)}},N=t=>{t.preventDefault(),g(null),d(""),c===null?I(t):A(t)};return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"h-full w-screen bg-transparent backdrop-blur-xl flex flex-col justify-start p-2 md:p-10 gap-4",children:[s.jsx("div",{className:"text-center md:text-3xl text-2xl font-bold border-b py-2",children:"Image Analyser by Gen AI"}),s.jsx("div",{className:"flex justify-center w-full mt-4",children:s.jsxs("form",{onSubmit:N,className:"flex flex-col w-full md:w-[50%]",children:[m&&s.jsx("img",{className:"border w-full",src:URL.createObjectURL(m),alt:"",srcset:""}),s.jsxs("div",{className:"flex w-full",children:[s.jsx("textarea",{cols:3,type:"text",name:"",id:"",onChange:t=>o(t.target.value),className:"w-full px-2 bg-black/30 focus:outline-none border border-gray-300/40"}),s.jsx("label",{for:"file",class:"labelFile",children:s.jsx("p",{style:{fontSize:12},children:"Attach Image"})}),s.jsx("input",{accept:".jpg, .png, jpeg, .webp",class:"input",name:"text",id:"file",type:"file",onChange:t=>(u(t.target.files[0]),g(t.target.files[0]))})]}),s.jsx("button",{disabled:b,type:"submit",className:"text-sm px-2 py-1.5 bg-green-500 hover:bg-green-600",children:b?"Thinking....":"Go"})]})}),i&&x&&s.jsx("img",{className:"border w-full md:w-[50%] p-2",src:URL.createObjectURL(x),alt:"",srcset:""}),i&&s.jsx("div",{className:"w-full md:w-[90%] p-4 md:p-6 rounded text-sm bg-zinc-800 border border-zinc-400/50 md:text-base md:text-start text-justify",dangerouslySetInnerHTML:{__html:v(i)}})]})})};export{D as default};