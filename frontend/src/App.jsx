import React, { useState } from 'react';

function App(){

const [workshops,setWorkshops]=useState([
{ id:101,title:'Python for Engineers',date:'25 April 2026',status:'Pending'},
{ id:102,title:'Scilab Processing',date:'02 May 2026',status:'Upcoming'},
{ id:103,title:'OpenFOAM Basics',date:'10 May 2026',status:'Pending'}
]);

const handleAccept=(id)=>{
setWorkshops(prev=>prev.map(ws=> ws.id===id?{...ws,status:'Upcoming'}:ws))
}

return(
<div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-10">

<h1 className="text-3xl font-bold mb-6">Workshop Requests</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

{workshops.map((ws)=>(
<div key={ws.id} className="bg-white p-6 rounded-xl shadow">

<div className={`px-2 py-1 text-xs mb-2 ${
ws.status==='Upcoming'
? 'bg-green-100 text-green-600'
: 'bg-yellow-100 text-yellow-600'
}`}>
{ws.status}
</div>

<h3 className="font-bold">{ws.title}</h3>
<p className="text-sm text-gray-500">📅 {ws.date}</p>

<button 
onClick={()=>handleAccept(ws.id)}
className="bg-indigo-600 text-white px-3 py-2 rounded mt-3">
Accept
</button>

</div>
))}

</div>

</div>
)
}

export default App;