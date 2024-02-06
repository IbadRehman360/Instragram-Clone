import{j as s,r as c,a as g}from"./index-O4iqtcr5.js";import{U as w}from"./UserApi-sY5N0P4G.js";import{H as k}from"./header-A29Rku9o.js";import"./axios-TBUHlTnk.js";const T=({totalUsers:e})=>s.jsxs("div",{className:"bg-white p-6 rounded-md shadow-md",children:[s.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Total Users"}),s.jsx("p",{className:"text-4xl",children:e})]}),U=({usersLast2Hours:e})=>s.jsxs("div",{className:"bg-white p-6 rounded-md shadow-md",children:[s.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Users Posted in Last 2 Hours"}),e!==void 0?s.jsx("p",{className:"text-4xl",children:e}):s.jsx("p",{children:"No data available"})]}),v=({usersWithMoreThanXFollowers:e})=>s.jsxs("div",{className:"bg-white p-6 rounded-md shadow-md",children:[s.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Users with More Than 1 Follower"}),e!==void 0?s.jsx("p",{className:"text-4xl",children:e}):s.jsx("p",{children:"No data available"})]}),L=({topLikedPost:e})=>{const l=e?e.Title:"No Top Liked Post",n=e?e.Likes.length:0;return s.jsxs("div",{className:"bg-white p-6 rounded-md shadow-md",children:[s.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Top Liked Post"}),e?s.jsxs("div",{className:"space-y-2",children:[s.jsxs("p",{className:" font-medium",children:["Title: ",l]}),s.jsxs("p",{className:"text-md  font-semibold",children:["Number of Likes: ",n]})]}):s.jsx("p",{className:"text-gray-500",children:"No top liked post available"})]})},y=({topCommentedPost:e})=>{const l=e?e.Title:"No Top Commented Post",n=e?e.Comments.length:0,r=e?e.Likes.length:0;return console.log(e),s.jsxs("div",{className:"bg-white p-6 rounded-md shadow-md",children:[s.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Top Commented Post"}),e?s.jsxs("div",{className:"space-y-2",children:[s.jsxs("p",{className:"text-lg font-medium",children:["Title: ",l]}),s.jsxs("p",{className:"font-semibold",children:["Number of Comments: ",n]}),s.jsx("span",{className:" font-semibold",children:" Likes:"})," ",r]}):s.jsx("p",{className:"text-gray-500",children:"No top commented post available"})]})},D=({topEngagingUsers:e})=>s.jsxs("div",{className:"bg-white p-6 rounded-md shadow-md",children:[s.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Top 10 Engaging Users"}),e.length>0?s.jsx("ul",{className:"list-disc pl-4",children:e.map((l,n)=>s.jsxs("li",{className:"mb-2",children:[s.jsx("span",{className:"font-semibold",children:"User ID:"})," ",l.name," |",s.jsx("span",{className:"ml-2 font-semibold",children:" Likes:"})," ",l.likes," |",s.jsx("span",{className:"ml-2 font-semibold",children:" Comments:"})," ",l.comments]},n))}):s.jsx("p",{className:"text-gray-500",children:"No engaging users available"})]}),E=()=>{const[l,n]=c.useState([]),[r,d]=c.useState(!0),[M,m]=c.useState(!1),{user:h}=g();if(c.useEffect(()=>{(async()=>{try{const o=await w.getAllUsers();n(o)}catch(o){console.error("Error Fetching User Data ",o)}finally{d(!1)}})()},[]),r)return s.jsx("div",{children:"Loading..."});console.log(l);const x=l.users.length,j=l.users.filter(t=>t.lastActiveWithin2Hours).length,p=l.users.filter(t=>t.Followers.length>1).length,N=l.posts.length>0?l.posts.reduce((t,o)=>o.Likes.length>(t.Likes?t.Likes.length:0)?o:t,l.posts[0]):null,u=l.posts.length>0?l.posts.reduce((t,o)=>o.Comments.length>(t.Comments?t.Comments.length:0)?o:t,l.posts[0]):null,b=l.posts&&l.posts.length>0?l.posts.reduce((t,o)=>(o.Likes.forEach(a=>{t[a]?t[a].likes++:t[a]={likes:1,comments:0}}),o.Comments.forEach(a=>{const i=a.PostedBy.$oid;t[i]?t[i].comments++:t[i]={likes:0,comments:1}}),t),{}):{},f=Object.entries(b).sort(([,t],[,o])=>o.likes+o.comments-(t.likes+t.comments)).slice(0,10).map(([t,o])=>{const a=l.users.find(i=>i._id===t);return{userId:t,likes:o.likes,comments:o.comments,name:a?a.Name:"Unknown User"}});return s.jsxs("div",{className:"bg-zinc-950     ",children:[s.jsx(k,{user:h,setIsOpen:m}),s.jsxs("div",{className:"px-20 ",children:[s.jsx("h1",{className:"text-3xl text-white font-semibold mb-6",children:"Dashboard"}),s.jsxs("div",{className:"grid grid-cols-2  gap-8 w-full",children:[s.jsx(T,{totalUsers:x}),s.jsx(U,{usersLast2Hours:j}),s.jsx(v,{usersWithMoreThanXFollowers:p}),s.jsx(L,{topLikedPost:N}),s.jsx(y,{topCommentedPost:u}),s.jsx(D,{topEngagingUsers:f})]})]})]})};export{E as default};