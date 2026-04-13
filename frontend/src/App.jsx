import React, { useState, useEffect } from 'react';

function App(){

const fallbackWorkshops = [
{ id:101,title:'Python for Engineers',date:'25 Apr 2026',status:'Pending'},
{ id:102,title:'Scilab Processing',date:'02 May 2026',status:'Upcoming'},
{ id:103,title:'OpenFOAM Basics',date:'10 May 2026',status:'Pending'}
];

const [workshops,setWorkshops]=useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const iitBombayPhoto = 'https://tse3.mm.bing.net/th/id/OIP.4hkb8pWOMX61NgCUJOq6bAHaDh?rs=1&pid=ImgDetMain&o=7&rm=3';

useEffect(() => {
const apiUrl = import.meta.env.VITE_API_URL || '/api/workshops/';

fetch(apiUrl)
.then(res => {
if (!res.ok) {
throw new Error(`API error: ${res.status}`);
}
return res.json();
})
.then(data => {
const normalizedData = Array.isArray(data)
? data.map((ws, index) => ({
id: ws.id ?? index + 1,
title: ws.title || ws.workshop_type_name || 'Untitled Workshop',
date: ws.date || 'TBD',
status: ws.status || 'Pending',
}))
: [];

setWorkshops(normalizedData.length ? normalizedData : fallbackWorkshops);
setError('');
})
.catch(err => {
setWorkshops(fallbackWorkshops);
setError('Live server unavailable. Showing locally available records.');

console.error(err);
})
.finally(() => setLoading(false));
}, []);

const handleAccept=(id)=>{
setWorkshops(prev=>prev.map(ws=> ws.id===id?{...ws,status:'Upcoming'}:ws))
}

const pendingCount = workshops.filter(ws => ws.status === 'Pending').length;
const acceptedCount = workshops.filter(ws => ws.status === 'Upcoming').length;

return(
<div className="min-h-screen bg-slate-100 text-slate-900">

<header className="bg-[#0b3d91] text-white border-b-4 border-[#d4af37] shadow">
<div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full border-2 border-white/80 bg-white/10 flex items-center justify-center font-bold text-xs tracking-wide">IITB</div>
<div>
<p className="text-xs tracking-widest uppercase text-white/80">Official Portal</p>
<h1 className="text-lg sm:text-xl font-semibold">FOSSEE Workshop </h1>
</div>
</div>
<div className="flex items-center gap-3">
<p className="hidden sm:block text-sm text-white/90">Department Dashboard</p>
<button className="px-4 py-2 text-sm font-semibold rounded-md border border-white/40 bg-white/10 hover:bg-white/20 transition">Profile</button>
</div>
</div>
</header>

<main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
<section className="bg-white border border-slate-300 rounded-md shadow-sm p-4 sm:p-5 mb-6">
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
<div className="lg:col-span-2 border border-slate-200 rounded-md overflow-hidden bg-slate-50">
<img
src={iitBombayPhoto}
alt="IIT Bombay campus"
className="w-full h-56 sm:h-64 object-cover"
onError={(e) => {
e.currentTarget.src = 'https://www.iitb.ac.in/sites/www.iitb.ac.in/themes/touchm/logo.png';
e.currentTarget.className = 'w-full h-56 sm:h-64 object-contain bg-white p-6';
}}
/>
<div className="px-4 py-3 border-t border-slate-200 bg-white">
<p className="text-sm font-semibold text-slate-800">IIT Bombay</p>
<p className="text-xs text-slate-600">Powai, Mumbai | National Workshop Coordination Hub</p>
</div>
</div>

<div className="space-y-3">
<div className="border border-slate-200 rounded-md bg-slate-50 p-4">
<p className="text-xs uppercase tracking-wide text-slate-500">Total Requests</p>
<p className="text-2xl font-bold text-slate-800">{workshops.length}</p>
</div>
<div className="border border-amber-200 rounded-md bg-amber-50 p-4">
<p className="text-xs uppercase tracking-wide text-amber-700">Pending</p>
<p className="text-2xl font-bold text-amber-800">{pendingCount}</p>
</div>
<div className="border border-emerald-200 rounded-md bg-emerald-50 p-4">
<p className="text-xs uppercase tracking-wide text-emerald-700">Accepted</p>
<p className="text-2xl font-bold text-emerald-800">{acceptedCount}</p>
</div>
</div>
</div>
</section>

<section className="bg-white border border-slate-300 rounded-md shadow-sm p-5 sm:p-6 mb-6">
<h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Workshop Requests</h2>
<p className="text-slate-600 text-sm sm:text-base">Review and process submitted workshop applications.</p>
</section>

{loading && <p className="text-slate-600 mb-4 font-medium">Loading workshops...</p>}
{error && <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-3 mb-4 text-sm">{error}</p>}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

{workshops.map((ws)=>(
<div key={ws.id} className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">

<div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
<p className="text-xs font-semibold text-slate-700 tracking-wide">Request ID: #{ws.id}</p>
<span className={`px-2.5 py-1 text-[11px] font-semibold rounded-sm ${
ws.status==='Upcoming'
? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
: 'bg-amber-100 text-amber-700 border border-amber-200'
}`}>
{ws.status}
 </span>
</div>

<div className="p-4">
<h3 className="text-lg font-semibold text-slate-800 mb-3">{ws.title}</h3>

<div className="text-sm border border-slate-200 rounded-sm">
<div className="grid grid-cols-3 border-b border-slate-200">
<span className="col-span-1 bg-slate-50 px-3 py-2 font-medium text-slate-700">Date</span>
<span className="col-span-2 px-3 py-2 text-slate-600">{ws.date}</span>
</div>
<div className="grid grid-cols-3">
<span className="col-span-1 bg-slate-50 px-3 py-2 font-medium text-slate-700">Status</span>
<span className="col-span-2 px-3 py-2 text-slate-600">{ws.status}</span>
</div>
</div>

<button
onClick={()=>handleAccept(ws.id)}
disabled={ws.status==='Upcoming'}
className={`w-full mt-4 py-2.5 rounded-sm font-semibold text-sm border transition ${
ws.status==='Upcoming'
? 'bg-slate-200 text-slate-600 border-slate-300 cursor-not-allowed'
: 'bg-[#0b3d91] text-white border-[#0b3d91] hover:bg-[#082f6e]'
}`}
>
{ws.status==='Upcoming' ? "Accepted" : "Accept Request"}
</button>
</div>

</div>
))}

</div>
</main>
</div>
)
}

export default App;