import{r as t,u as b,a as f,j as e,L as w,S as y}from"./index-O4iqtcr5.js";import{s as j}from"./Auth-oRHAnmD1.js";import"./axios-TBUHlTnk.js";function I(){const[r,d]=t.useState(""),[o,c]=t.useState(""),m=b(),[n,l]=t.useState(""),i=o===""||r==="",{setUser:u,user:N}=f(),x=async s=>{s.preventDefault();try{const a=await j({emailAddress:r,password:o});if(a.status===200){const{token:p,_id:g,userData:h}=a.data;localStorage.setItem("authToken",p),localStorage.setItem("userId",g),u(h),m("/"),window.location.reload()}else l("Couldn't sign in with email address: "+r)}catch(a){console.error("Error during login:",a),l("An error occurred during login")}};return t.useEffect(()=>{document.title="Login - Instagram"},[]),e.jsxs("div",{className:"container   flex mx-auto max-w-screen-md items-center h-screen",children:[e.jsx("div",{className:"flex w-3/5",children:e.jsx("img",{src:"/images/iphone-with-profile.png",alt:"iPhone with Instagram app"})}),e.jsxs("div",{className:"flex flex-col w-2/5",children:[e.jsxs("div",{className:"flex flex-col  items-center bg-white p-4 border border-gray-primary mb-4 rounded",children:[e.jsx("h1",{className:"flex justify-center w-full",children:e.jsx("img",{src:"/images/logo.png",alt:"Instagram",className:"mt-2 w-6/12 mb-4"})}),n&&e.jsx("p",{className:"mb-4 text-xs text-red-primary",children:n}),e.jsxs("form",{onSubmit:x,method:"POST",children:[e.jsx("input",{"aria-label":"Enter your email address",type:"text",placeholder:"Email address",className:"text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2",onChange:({target:s})=>d(s.value),value:r}),e.jsx("input",{"aria-label":"Enter your password",type:"password",placeholder:"Password",className:"text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2",onChange:({target:s})=>c(s.value),value:o}),e.jsx("button",{disabled:i,type:"submit",className:`bg-blue-600 text-white w-full rounded h-10  font-semibold  tracking-wider
            ${i&&"opacity-50"}`,children:"Login"})]})]}),e.jsx("div",{className:"flex justify-center items-center flex-col w-full bg-white   p-4 rounded border border-gray-primary",children:e.jsxs("p",{className:"text-sm",children:["Don't have an account?"," ",e.jsx(w,{to:y,className:"font-bold text-blue-medium",children:"Sign up"})]})})]})]})}export{I as default};